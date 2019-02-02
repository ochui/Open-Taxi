import React, { Component } from "react";
import {
  View,
  Image,
  Alert,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Text } from "native-base";
import { BarIndicator } from "react-native-indicators";
import watch from "redux-watch";
import isEqual from "is-equal";
import axios from "axios";
import {
  login,
  tokenRequest,
  checkToken,
  clearError,
  getProfile
} from "../../actions/authActions";
import { getActiveBookings } from "../../actions/bookingActions";
import { store } from "../../store";
import styles from "./styles";

class SignInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  submit = async values => {
    this.props.tokenRequest();
    this.props.login(values);
  };

  componentWillMount() {
    let w = watch(store.getState, "auth", isEqual);
    this.unsubscribe = store.subscribe(
      w((newVal, oldVal, objectPath) => {
        if (newVal.token) {
          axios.defaults.headers.common["Authorization"] = `Token ${
            newVal.token
          }`;
          this.props.getProfile();
          this.props.getActiveBookings();
          this.props.navigation.navigate("Location");
        } else if (!newVal.isLoading && newVal.error) {
          Alert.alert("Error", "Unable to login with provided credentials.");
        }
      })
    );
  }

  componentWillUnmount() {
    this.unsubscribe = null;
  }
  renderInput = ({
    placeholder,
    returnKeyType,
    keyboardType,
    autoCorrect,
    secureTextEntry,
    disabled,
    input: { onSubmitEditing, ref, ...restInput },
    meta: { error }
  }) => {
    if (error !== undefined) {
    }
    return (
      <TextInput
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor="rgba(225,225,225,0.7)"
        autoCorrect={autoCorrect}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        style={styles.input}
        ref={ref}
        {...restInput}
      />
    );
  };
  render() {
    const { handleSubmit, submitting, isLoading } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../../../assets/icon.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formInputcontainer}>
            <StatusBar barStyle="light-content" />
            <Field
              secureTextEntry={false}
              placeholder="Phone Number"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="phone-pad"
              returnKeyType="next"
              autoCorrect={false}
              name="username"
              component={this.renderInput}
              disabled={isLoading}
            />
            <Field
              secureTextEntry
              returnKeyType="go"
              ref={input => (this.passwordInput = input)}
              placeholder="Password"
              name="password"
              component={this.renderInput}
              disabled={isLoading}
            />
            <TouchableOpacity
              disabled={submitting}
              style={styles.buttonContainer}
              onPress={handleSubmit(this.submit)}
            >
              {!isLoading ? (
                <Text style={styles.buttonText}>LOGIN</Text>
              ) : (
                <BarIndicator color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
    isLoading: state.auth.isLoading,
    hasToken: state.auth.hasToken,
    error: state.auth.error
  };
};
const mapActionToProps = {
  login,
  tokenRequest,
  checkToken,
  clearError,
  getProfile,
  getActiveBookings
};

export default reduxForm({
  form: "signin"
  //validate,
})(
  connect(
    mapStateToProps,
    mapActionToProps
  )(SignInScreen)
);
