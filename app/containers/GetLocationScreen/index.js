import React, { Component } from "react";
import { View, Text, Alert, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getCurrentLocation } from "../../actions/locationActions";
import { registerForPushNotifications } from "../../actions/pushNotificationAction";
import { getNearbyDrivers } from "../../actions/bookingActions";
import { GEOLOCATION_OPTIONS } from "../../constants";
import styles from "./styles";
import { Constants, Location, Permissions, IntentLauncherAndroid } from "expo";

const standardMessage = "Getting your location";
const longLoadingMessage = "We still working on it";
const messagePostfixes = ["", ".", "..", "..."];

class GetLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCount: 0,
      locationAcess: false
    };
  }
  componentWillMount() {
    Location.getProviderStatusAsync().then(r => {
      if (r.locationServicesEnabled) {
        this.setState({ locationAcess: true });
        this._getLocationAsync();
      } else {
        this.setState({ locationAcess: false });
      }
    });

    if (this.props.regionLoaded && this.props.hasToken) {
      setInterval(() => {
        this.props.navigation.navigate("App");
      }, 3000);
    }

    this.timerId = setInterval(() => {
      let { loadingCount } = this.state;
      this.setState({ ...this.state, loadingCount: ++loadingCount });
    }, 700);

    //register for push notification
    this.props.registerForPushNotifications();
  }

  componentDidMount() {
    //Location.watchPositionAsync(this._success, this._error, GEOLOCATION_OPTIONS);
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this._success);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.regionLoaded) {
      setInterval(() => {
        this.props.navigation.navigate("App");
      }, 3000);
    } else {
      this._getLocationAsync();
    }
  }

  _success = (pos) => {
    console.log("asdf")
    console.log(pos)
  }

  _error = (err) => {
    console.log(err)
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    this.props.getCurrentLocation();
    this.props.getNearbyDrivers(
      this.props.region.region.longitude,
      this.props.region.region.latitude
    );
  };

  openSettings = () => {
    if (Platform.OS === "android") {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
      this.setState({ locationAcess: true });
      this._getLocationAsync();
    } else {
      Linking.openURL("app-settings:");
      this.setState({ locationAcess: true });
      this._getLocationAsync();
    }
  };

  render() {
    if (this.state.locationAcess) {
      const postFixIndex = this.state.loadingCount % messagePostfixes.length;
      const messagePostfix = messagePostfixes[postFixIndex];
      const loadingTakesLonger = this.state.loadingCount >= 10;
      const message = loadingTakesLonger ? longLoadingMessage : standardMessage;
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{message + messagePostfix}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.openSettings()}
          >
            <Text style={styles.buttonText}>Enable Location Service</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    region: state.location,
    regionLoaded: state.location.regionLoaded,
    hasToken: state.auth.hasToken
  };
};

const mapActionsToProps = {
  getCurrentLocation,
  registerForPushNotifications,
  getNearbyDrivers
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GetLocationScreen);
