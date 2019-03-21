import React from "react";
import { Text, Alert, TouchableOpacity, Picker } from "react-native";
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
  Item
} from "native-base";
import Modal from "react-native-modal";
import { RNNumberStepper } from "react-native-number-stepper";
import styles from "./styles";

const RouteModal = ({
  isModalVisible,
  toggleRouteModal,
  cost,
  onChange,
  paymentMethod,
  togglePaymentModal,
  isLoading,
  changePayment
}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <Container>
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#0C4866"
        >
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
          <View style={styles.ask}>
            <Text>How many sit do you want?</Text>
          </View>
          <View style={styles.buttonBox}>
            <RNNumberStepper
              buttonsBackgroundColor="#fb9403"
              minValue={1}
              value={1}
              labelBackgroundColor="#fb9403"
              width={130}
              onChange={nValue => onChange(nValue)}
            />
          </View>

          <Item style={styles.secondInputWrapper}>
            <Icon
              type="MaterialIcons"
              name="payment"
              style={{
                padding: 10
              }}
            />
            <Text>Payment Method</Text>
            <Picker
              selectedValue={paymentMethod}
              style={{ height: 50, width: 100 }}
              onValueChange={itemValue => changePayment(itemValue)}
            >
              <Picker.Item label="Cash" value="cash" />
              <Picker.Item label="Card" value="card" />
              <Picker.Item label="Account" value="account" />
            </Picker>
          </Item>

          {paymentMethod == "cash" ? (
            <TouchableOpacity
              onPress={() => {}}
              style={styles.buttonContainer}
              disabled={isLoading}
            >
              {!isLoading ? (
                <Text style={styles.buttonText}>Confirm Booking</Text>
              ) : (
                <BarIndicator color="#fff" />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={togglePaymentModal}
              style={styles.buttonContainer}
              disabled={isLoading}
            >
              {!isLoading ? (
                <Text style={styles.buttonText}>Pay Now</Text>
              ) : (
                <BarIndicator color="#fff" />
              )}
            </TouchableOpacity>
          )}
        </Content>
      </Container>
    </Modal>
  );
};

export default RouteModal;
