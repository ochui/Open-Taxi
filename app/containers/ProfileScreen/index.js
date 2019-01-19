import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Container, Content, Icon, Text, View } from "native-base";
import { Constants, ImagePicker, Permissions } from "expo";
import { connect } from "react-redux";
import { BarIndicator } from "react-native-indicators";
import { getProfile } from "../../actions/authActions";
import AppHeader from "../../components/Header";
import styles from "./styles";

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
    drawerIcon: () => (
      <Icon ios="ios-contact" android="md-contact" style={{ color: "white" }} />
    )
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      this._handleImagePicked(pickerResult);
    }
  };
  componentWillMount() {
    if (!this.props.userDataLoaded) {
      this.props.getProfile();
    }
  }

  renderInfo = () => {
    if (this.props.userDataLoaded) {
      return (
        <View style={styles.bodyContent}>
          <Text style={styles.name}>
            {this.props.userData.first_name} {this.props.userData.last_name}
          </Text>
          <Text style={styles.info}>
            Mobile Number: {this.props.userData.phone_number}
          </Text>
          <Text style={styles.info}>Email: {this.props.userData.email}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Edit")}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      <BarIndicator />;
    }
  };

  render() {
    return (
      <Container>
        <AppHeader props={this.props} />
        <Content>
          <View style={styles.header} />
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => console.log(122)}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
          </TouchableOpacity>
          <View style={styles.body}>{this.renderInfo()}</View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    userDataLoaded: state.auth.userDataLoaded
  };
};
const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProfileScreen);
