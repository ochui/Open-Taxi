import React from "react";
import { Text, Alert, Picker } from "react-native";
import {
  View,
  Button,
  Icon,
  Container,
  Header,
  Left,
  Body,
  Content,
  Title,
  Right,
  InputGroup,
  Input
} from "native-base";
import Modal from "react-native-modal";
import { RNNumberStepper } from "react-native-number-stepper";
import Rave from "../../rave-react-native/Rave";
import {
  FLUTTERWAVE_API_PUBLIC_KEY,
  FLUTTERWAVE_API_SECRET_KEY
} from "../../constants";
import styles from "./styles";

const onFailure = error => {
  Alert.alert("Transaction failed", error.message);
};

const RouteModal = ({ isModalVisible, toggleRouteModal, cost }) => {
  return (
    <Modal isVisible={isModalVisible}>
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={toggleRouteModal}>
              <Icon
                style={styles.icon}
                ios="ios-arrow-round-back"
                android="md-arrow-round-back"
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerText} />
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.farePrice}>
            <Text style={styles.fareText}>₦{cost}</Text>
          </View>
          <View style={styles.searchBox}>
            <RNNumberStepper />
          </View>
        </Content>
      </Container>
    </Modal>
  );
};

export default RouteModal;
