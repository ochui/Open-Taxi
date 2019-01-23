import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import UUID from "pure-uuid";
import humanparser from "humanparser";
import watch from "redux-watch";
import isEqual from "is-equal";
import { tokenRequest, register } from "../../actions/authActions";
import { BarIndicator } from "react-native-indicators";
import styles from "./styles";

class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    let w = watch(store.getState, "auth", isEqual);
    this.unsubscribe = store.subscribe(
      w((newVal, oldVal, objectPath) => {
        if (newVal.token) {
          this.props.navigation.navigate("Location");
        } else if (!newVal.isLoading && newVal.error) {
          Alert.alert("Request failed", "Please check your credentials");
        }
      })
    );
  }

  componentWillUnmount() {
    this.unsubscribe = null;
  }
  submit = async values => {
    const uuid = new UUID(4);
    if (values == {} || values == "" || values.fullname == undefined) {
      Alert.alert("Error", "Please check your credentials");
      return null;
    }

    const { firstName, lastName } = humanparser.parseName(values.fullname);
    const userData = {
      username: uuid.format(),
      password: values.password,
      phone_number: values.phone_number,
      email: values.email,
      first_name: firstName,
      last_name: lastName
    };

    this.props.tokenRequest();
    this.props.register(userData);
  };

  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }

  renderInput = ({
    placeholder,
    returnKeyType,
    keyboardType,
    label,
    type,
    autoCorrect,
    secureTextEntry,
    disabled,
    input: { onSubmitEditing, ref, ...restInput },
    meta: { touched, error, warning }
  }) => {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
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
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      isLoading
    } = this.props;
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
              placeholder="Full Name"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              returnKeyType="next"
              autoCorrect={false}
              name="fullname"
              component={this.renderInput}
              disabled={isLoading}
            />
            <Field
              secureTextEntry={false}
              placeholder="Mobile Number"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="number"
              returnKeyType="next"
              autoCorrect={false}
              name="phone_number"
              component={this.renderInput}
              disabled={isLoading}
            />
            <Field
              secureTextEntry={false}
              placeholder="email"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              returnKeyType="next"
              autoCorrect={false}
              name="email"
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
              disabled={isLoading}
              style={styles.buttonContainer}
              onPress={handleSubmit(this.submit)}
            >
              {!isLoading ? (
                <Text style={styles.buttonText}>REGISTER</Text>
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
    authToken: state.auth.authToken,
    isLoading: state.auth.isLoading
  };
};
const mapActionToProps = { register, tokenRequest };

export default reduxForm({
  form: "register"
  //validate,
})(
  connect(
    mapStateToProps,
    mapActionToProps
  )(RegisterScreen)
);
