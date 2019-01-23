import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { getCurrentLocation } from "../../actions/locationActions";
import styles from "./styles";
import { Constants, Location, Permissions } from "expo";

const standardMessage = "Getting your location";
const longLoadingMessage = "We still working on it";
const messagePostfixes = ["", ".", "..", "..."];

class GetLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCount: 0
    };
  }
  componentWillMount() {
    Location.getProviderStatusAsync().then(r => {
      console.log(r);
      if (r.locationServicesEnabled) {
        this._getLocationAsync();
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
  }

  componentDidMount() {
    //this.props.getCurrentLocation();
    this._getLocationAsync();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.regionLoaded) {
      setInterval(() => {
        this.props.navigation.navigate("App");
      }, 3000);
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    this.props.getCurrentLocation();
  };

  render() {
    const postFixIndex = this.state.loadingCount % messagePostfixes.length;
    const messagePostfix = messagePostfixes[postFixIndex];
    const loadingTakesLonger = this.state.loadingCount >= 10;
    const message = loadingTakesLonger ? longLoadingMessage : standardMessage;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{message + messagePostfix}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    region: state.location,
    regionLoaded: state.location.regionLoaded,
    hasToken: state.auth.hasToken
  };
};

const mapActionsToProps = { getCurrentLocation };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GetLocationScreen);
