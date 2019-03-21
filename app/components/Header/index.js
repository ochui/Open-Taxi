import React from "react";
import { Image } from "react-native";
import { Header, Title, Button, Left, Right, View, Icon } from "native-base";
import { APP_NAME } from "../../constants";
import styles from "./styles";
const AppHeader = ({ props }) => {
  return (
    <Header
      style={styles.header}
      iosBarStyle="light-content"
      androidStatusBarColor="#0C4866"
    >
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Icon style={styles.icon} ios="ios-menu" android="md-menu" />
        </Button>
      </Left>
      <View style={styles.headerBody}>
        <Image resizeMode="contain" style={styles.logo} source={require('../../../assets/header-icon.png')}/>
      </View>
      <Right style={{ flex: 1 }}>
        <Icon
          style={styles.icon}
          ios="ios-notifications"
          android="md-notifications"
        />
      </Right>
    </Header>
  );
};

export default AppHeader;
