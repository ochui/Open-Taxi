import React from "react";
import { Text, Alert } from "react-native";
import {
  View,
  Button,
  Icon,
  Container,
  Left,
  Right,
  Header
} from "native-base";
import { PulseIndicator, BarIndicator } from "react-native-indicators";
import Modal from "react-native-modal";
import styles from "./styles";

export const WaitingModal = ({
  isModalVisible,
  toggleModal,
  activeBooking,
  cancelBooking,
  isLoading,
  enableLoader
}) => {
  return (
    <Modal isVisible={isModalVisible}>
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
        <Right />
      </Header>
      <Container>
        <View style={styles.findDriverContainer}>
          <View style={styles.spinner}>
            <PulseIndicator color="white" size={300} />
          </View>

          <View style={styles.content}>
            <Text style={styles.text}> Contacting Nearby Drivers</Text>
            <View style={styles.pickup}>
              {activeBooking && (
                <Text>
                  {activeBooking.address.pickUp.structured_formatting.main_text}
                </Text>
              )}
            </View>
            <Icon
              type="FontAwesome"
              style={styles.toArrow}
              name="long-arrow-down"
            />
            <View style={styles.dropoff}>
              {activeBooking && (
                <Text>
                  {
                    activeBooking.address.dropOff.structured_formatting
                      .main_text
                  }
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.termsText}>
                By booking you confirm that you accept our Terms & Conditions
              </Text>

              <Button
                onPress={() => {
                  Alert.alert(
                    "Cancel Booking",
                    "Do you want to cancel booking?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {
                          return null;
                        }
                      },
                      {
                        text: "Confirm",
                        onPress: () => {
                          enableLoader(), cancelBooking(activeBooking.id);
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                }}
                style={styles.cancelBtn}
              >
                {!isLoading ? (
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                ) : (
                  <BarIndicator color="#fff" />
                )}
              </Button>
            </View>
          </View>
        </View>
      </Container>
    </Modal>
  );
};

export default WaitingModal;
