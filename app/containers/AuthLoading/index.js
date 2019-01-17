import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { getProfile } from "../../actions/authActions";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrap();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrap = () => {
    if (this.props.authToken) {
      axios.defaults.headers.common["Authorization"] = `Token ${this.props.authToken}`;
      this.props.getProfile();
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

const mapActionsToProps = { getProfile };
const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AuthLoadingScreen);
