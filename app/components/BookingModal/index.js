import React from "react";
import { Text, TouchableOpacity, Dimensions, Picker } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  View,
  Body,
  Right,
  Title,
  Item,
  Icon,
  InputGroup,
  Button
} from "native-base";
import Modal from "react-native-modal";
import { BarIndicator } from "react-native-indicators";
import styles from "./styles";


const BookingModal = ({
  isModalVisible,
  props,
  toggleModal,
  changePayment,
  addBooking,
  isLoading,
  togglePaymentModal,
  fare
}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={toggleModal}>
              <Icon
                style={styles.icon}
                ios="ios-arrow-round-back"
                android="md-arrow-round-back"
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerText}>Fare Estimate</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.farePrice}>
            <Text style={styles.fareText}>₦{fare}</Text>
          </View>

          <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>PICK UP</Text>
              <InputGroup style={styles.inputGroup}>
                <Icon
                  type="FontAwesome"
                  name="map-pin"
                  style={{
                    padding: 10,
                    color: "red"
                  }}
                />
                {props.selectedAddress.pickUp && (
                  <Text>
                    {
                      props.selectedAddress.pickUp.structured_formatting
                        .main_text
                    }
                  </Text>
                )}
              </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
              <Text style={styles.label}>DROP OFF</Text>
              <InputGroup style={styles.inputGroup}>
                <Icon
                  type="FontAwesome"
                  name="map-pin"
                  style={{
                    padding: 10,
                    color: "green"
                  }}
                />
                {props.selectedAddress.dropOff && (
                  <Text>
                    {
                      props.selectedAddress.dropOff.structured_formatting
                        .main_text
                    }
                  </Text>
                )}
              </InputGroup>
            </View>

            <Item style={styles.secondInputWrapper}>
              <Icon
                type="FontAwesome"
                name="tachometer"
                style={{
                  padding: 10
                }}
              />
              <Text>Estimated Time</Text>
              {props.selectedAddress.matrix && (
                <Text style={{ marginLeft: 15 }}>
                  {props.selectedAddress.matrix.duration.text}
                </Text>
              )}
            </Item>
            <Item style={styles.secondInputWrapper}>
              <Icon
                type="FontAwesome"
                name="map-signs"
                style={{
                  padding: 10
                }}
              />
              <Text>Estimated Distance</Text>
              {props.selectedAddress.matrix && (
                <Text style={{ marginLeft: 15 }}>
                  {props.selectedAddress.matrix.distance.text}
                </Text>
              )}
            </Item>
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
                selectedValue={props.paymentMethod}
                style={{ height: 50, width: 100 }}
                onValueChange={itemValue => changePayment(itemValue)}
              >
                <Picker.Item label="Cash" value="cash" />
                <Picker.Item label="Card" value="card" />
                <Picker.Item label="Account" value="account" />
              </Picker>
            </Item>
          </View>

          {props.paymentMethod == "cash" ? (
            <TouchableOpacity
              onPress={addBooking}
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

export default BookingModal;
