import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Container, View, Input, Item, Label, Form } from "native-base";
import { editProfile, enableProfileLoader } from "../../actions/authActions";
import { BarIndicator } from "react-native-indicators";
import styles from "./styles";

class EditProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.profile = null;
  }
  submit = async values => {
    this.props.enableProfileLoader();
    this.props.editProfile(values);
  };

  componentWillMount() {
    this.profile = this.props.userData;
  }
  renderInput = ({ input, label, data, meta: { error } }) => {
    if (error !== undefined) {
    }
    return (
      <Item>
        <Label>{label}:</Label>
        <Input {...input} placeholder={data} />
      </Item>
    );
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Container style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.formInputcontainer}>
            <Form>
              <Field
                name="first_name"
                label="First Name"
                data={this.profile.first_name}
                component={this.renderInput}
              />
              <Field
                name="last_name"
                label="Last Name"
                component={this.renderInput}
                data={this.profile.last_name}
              />
              <Field
                name="phone_number"
                label="Phone Number"
                component={this.renderInput}
                data={this.profile.phone_number}
              />
              <Field
                name="email"
                label="E-mail"
                data={this.profile.email}
                component={this.renderInput}
              />
            </Form>
            <TouchableOpacity
              disabled={submitting}
              style={styles.buttonContainer}
              onPress={handleSubmit(this.submit)}
            >
              {!this.props.editLoading ? (
                <Text style={styles.buttonText}>UPDATE</Text>
              ) : (
                <BarIndicator color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
    isLoading: state.auth.isLoading,
    userData: state.auth.userData,
    editLoading: state.auth.editLoading
  };
};

const mapActionToProps = { editProfile, enableProfileLoader };

export default reduxForm({
  form: "edit"
  //validate,
})(
  connect(
    mapStateToProps,
    mapActionToProps
  )(EditProfileScreen)
);
