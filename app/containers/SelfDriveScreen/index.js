import React, { Component } from "react";
import { Alert } from "react-native";
import { Container } from "native-base";
import CompleteFlatList from "react-native-complete-flatlist";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-cards";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import Spinner from "react-native-loading-spinner-overlay";
import AppHeader from "../../components/Header";
import { getCars } from "../../actions/carsActions";
import {
  togglePaymentModalC,
  addCarBooking
} from "../../actions/bookingActions";
import {
  bvnVerification,
  hideVerifiedDialod,
  hideUnverifiedDialod
} from "../../actions/authActions";
import CPaymentModal from "../../components/CPaymentModal";

class SelfDriveScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      car: "none",
      amount: 0.0,
      dialogVisible: false,
      bvn: null,
      askDialog: false,
      spinner: false
    };
  }
  _togglePaymentModalC = () => {
    if (this.props.userData.bvn === null) {
      this.setState({ askDialog: true });
    } else {
      this.props.togglePaymentModalC(this.props.paymentModalCStatus);
    }
  };

  componentWillMount() {
    this.props.getCars();
  }

  showDialog = () => {
    this.setState({ askDialog: false });
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleVerify = () => {
    if (this.state.bvn == null || this.state.bvn.length < 11) {
      Alert.alert(
        "Error",
        "Invalid Bank Verification Number. BVN can not be empty or less than 11 digits"
      );
    } else {
      this.setState({ dialogVisible: false });
      this.props.bvnVerification(this.state.bvn);
    }
  };

  hideDialog = () => {
    this.setState({ askDialog: false });
  };

  cell = data => {
    return (
      <Card>
        <CardImage source={{ uri: data.image }} title={data.model} />
        <CardTitle subtitle={data.status ? "Available" : "Unavailable"} />
        <CardContent
          text={`${data.start_time}am --- ${data.end_time}am (Next day)`}
        />
        <CardContent text={`₦${data.cost}`} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#0C4866" />
          <CardButton
            onPress={() => {
              this.setState({
                id: data.id,
                car: data.model,
                amount: data.cost
              });
              this._togglePaymentModalC();
            }}
            title="Request Now"
            color="#0C4866"
          />
        </CardAction>
      </Card>
    );
  };

  render() {
    return (
      <Container>
        <AppHeader props={this.props} />
        <CompleteFlatList
          searchKey={["model", "plate_no"]}
          searchBarBackgroundStyles="yellow"
          pullToRefreshCallback={() => {
            this.props.getCars();
          }}
          data={this.props.cars}
          ref={c => (this.completeFlatList = c)}
          renderSeparator={null}
          renderItem={this.cell}
          onEndReached={() => console.log("end")}
          onEndReachedThreshold={0}
        />
        <CPaymentModal
          isModalCVisible={this.props.paymentModalCStatus}
          paymentMethod={this.props.paymentMethod}
          toggleCPaymentModal={this._togglePaymentModalC}
          userData={this.props.userData}
          amount={this.state.amount}
          addAction={() => addCarBooking(this.state.id)}
        />

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Account Verification</Dialog.Title>
          <Dialog.Input
            label="Please enter your BVN"
            placeholder="20457281937"
            onChangeText={bvn => this.setState({ bvn })}
            keyboardType="numeric"
            maxLength={11} //bvn max is 11
          />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Verify" onPress={this.handleVerify} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.askDialog}>
          <Dialog.Title>Account Verification</Dialog.Title>
          <Dialog.Description>
            We need to verify your identity in other to use these service
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => this.hideDialog()} />
          <Dialog.Button label="Ok" onPress={() => this.showDialog()} />
        </Dialog.Container>

        <Dialog.Container visible={this.props.verified}>
          <Dialog.Title>Account Verification</Dialog.Title>
          <Dialog.Description>
            Congratulation your identity has been verified, Thanks for your
            time.
          </Dialog.Description>
          <Dialog.Button
            label="Ok"
            onPress={() => this.props.hideVerifiedDialod(this.props.verified)}
          />
        </Dialog.Container>

        <Dialog.Container visible={this.props.unverified}>
          <Dialog.Title>Account Verification</Dialog.Title>
          <Dialog.Description>
            Sorry we were unable to verify your identity, Please update your
            profile to match your bvn records.
          </Dialog.Description>
          <Dialog.Button
            label="Ok"
            onPress={() =>
              this.props.hideUnverifiedDialod(this.props.unverified)
            }
          />
        </Dialog.Container>

        <Spinner
          visible={this.props.spinner}
          textContent={"Please Wait..."}
          textStyle={styles.spinnerTextStyle}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars.cars || [],
    userData: state.auth.userData,
    paymentMethod: state.booking.paymentMethod,
    isModalCVisible: state.booking.isModalCVisible,
    paymentModalCStatus: state.booking.paymentModalCStatus,
    spinner: state.booking.spinner,
    verified: state.auth.verified,
    unverified: state.auth.unverified
  };
};

const mapActionToProps = {
  getCars,
  bvnVerification,
  togglePaymentModalC,
  addCarBooking,
  hideVerifiedDialod,
  hideUnverifiedDialod
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(SelfDriveScreen);
