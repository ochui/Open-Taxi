import React from "react";
import { Text, Alert } from "react-native";
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
  Right
} from "native-base";
import Modal from "react-native-modal";
import Rave from "../../rave-react-native/Rave";
import {
  FLUTTERWAVE_API_PUBLIC_KEY,
  FLUTTERWAVE_API_SECRET_KEY
} from "../../constants";
import styles from "./styles";

const onFailure = error => {
  Alert.alert("Transaction failed", error.message);
};

const CPaymentModal = ({
  isModalCVisible,
  toggleCPaymentModal,
  paymentMethod,
  amount,
  addAction,
  userData
}) => {
  return (
    <Modal isVisible={isModalCVisible}>
      <Container>
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#0C4866"
        >
          <Left>
            <Button transparent onPress={toggleCPaymentModal}>
              <Icon
                style={styles.icon}
                ios="ios-arrow-round-back"
                android="md-arrow-round-back"
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerText}>Amount</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.farePrice}>
            <Text style={styles.fareText}>₦{amount}</Text>
          </View>
          <Rave
            amount={amount.toString()}
            country="NG"
            currency="NGN"
            email={userData.email}
            firstname={userData.first_name}
            lastname={userData.last_name}
            publickey={FLUTTERWAVE_API_PUBLIC_KEY}
            secretkey={FLUTTERWAVE_API_SECRET_KEY}
            paymenttype={paymentMethod} // or set to both for card and account transactions
            page={paymentMethod}
            meta={[]}
            production={false}
            onSuccess={res => addAction(res)}
            onFailure={e => onFailure(e)}
          />
        </Content>
      </Container>
    </Modal>
  );
};

export default CPaymentModal;
