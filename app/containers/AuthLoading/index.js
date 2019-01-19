import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { getProfile, clearToken } from "../../actions/authActions";
import { getActiveBookings } from "../../actions/bookingActions";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.navigation.getParam("action", "CHECK") == "LOGOUT") {
      //this.props.clearToken();
      //this.props.navigation.dismiss();

      this.props.navigation.navigate("Auth");
    } else {
      this._bootstrap();
    }
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrap = () => {
    if (this.props.authToken) {
      axios.defaults.headers.common["Authorization"] = `Token ${
        this.props.authToken
      }`;
      this.props.getProfile();
      this.props.getActiveBookings();
      this.props.navigation.navigate("Location");
    } else {
      this.props.navigation.navigate("Auth");
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapActionsToProps = { getProfile, getActiveBookings, clearToken };
const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AuthLoadingScreen);
