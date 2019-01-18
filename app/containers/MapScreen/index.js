import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
import { MapView } from "expo";
import { Icon, View, Fab, Container } from "native-base";
import { connect } from "react-redux";
import { debounce } from "lodash";
import Toast from "react-native-easy-toast";
import { PulseIndicator } from "react-native-indicators";
import SearchBox from "../../components/SearchBox";
import SearchResults from "../../components/SearchResults";
import marker from "../../../assets/maker.png";
import BookingModal from "../../components/BookingModal";
import WaitingModal from "../../components/WaitingModal";
import PaymentModal from "../../components/PaymentModal";
import AppHeader from "../../components/Header";
import {
  getCurrentRegion,
  getInputData,
  toggleSearchResults,
  getAddressPredictions,
  getSelectedAddress,
  onMapDraged
} from "../../actions/locationActions";
import {
  changePaymentMethod,
  togglePaymentModal
} from "../../actions/paymentActions";
import {
  addBooking,
  toggleBookingModal,
  toggleWaitingModal,
  enableLoader,
  enableCLoader,
  cancelBooking
} from "../../actions/bookingActions";

import styles from "./styles";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

class MapScreen extends Component {

  static navigationOptions = {
    header: null,
    drawerIcon: () => (
      <Icon ios="ios-map" android="md-map" style={{ color: "white" }} />
    )
  };
  constructor() {
    super();
    this.state = {
      isPanding: false,
      isModalVisible: false
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false
    });
  }

  onRegionChange = region => {
    const newState = {
      region,
      isPanding: false
    };

    this.setState(newState);
  };
  gotoRegion = (lat, lng) => {
    this.map.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      2000
    );
  };

  onPanDrag = () => {
    const { isPanding } = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true
    });
  };

  _toggleModal = () => {
    if (
      this.props.selectedAddress.pickUp &&
      this.props.selectedAddress.dropOff
    ) {
      this.props.toggleBookingModal(this.props.isModalVisible);
    } else if (this.props.selectedAddress.pickUp) {
      this.refs.toast.show("Drop off location is required");
    } else if (this.props.selectedAddress.dropOff) {
      this.refs.toast.show("Pick up location is required");
    } else {
      this.refs.toast.show("Pick up and drop off location is required");
    }
  };

  _toggleWaitingModal = () => {
    this.props.toggleWaitingModal(this.props.searchingStatus);
  };

  _togglePaymentModal = () => {
    this.props.togglePaymentModal(this.props.paymentModalStatus);
  };

  _setPaymentMethod = _paymentMethod => {
    this.setState({ paymentMethod: _paymentMethod });
  };

  render() {
    const { pickUp, dropOff } = this.props.selectedAddress || {};
    const { isPanding } = this.state;
    return (
      <Container>
        <AppHeader props={this.props} />
        <View
          style={{
            flex: 1
          }}
        >
          <MapView
            style={{
              flex: 1
            }}
            ref={ref => {
              this.map = ref;
            }}
            showsUserLocation
            loadingEnabled
            showsMyLocationButton={true}
            onRegionChangeComplete={this.onRegionChange}
            onPanDrag={this.onPanDrag}
            initialRegion={this.props.initialRegion}
          >
            {pickUp && (
              <MapView.Marker
                coordinate={{
                  latitude: pickUp.location.lat,
                  longitude: pickUp.location.lng
                }}
                pinColor="green"
              />
            )}
            {dropOff && (
              <MapView.Marker
                coordinate={{
                  latitude: dropOff.location.lat,
                  longitude: dropOff.location.lng
                }}
                pinColor="blue"
              />
            )}
          </MapView>
          <SearchBox
            getInputData={this.props.getInputData}
            toggleSearchResults={this.props.toggleSearchResults}
            getAddressPredictions={this.props.getAddressPredictions}
            inputData={this.props.inputData}
          />
          {(this.props.resultType.pickUp || this.props.resultType.dropOff) && (
            <SearchResults
              predictions={this.props.predictions}
              getSelectedAddress={this.props.getSelectedAddress}
            />
          )}
          <View
            style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
            pointerEvents="none"
          >
            <Image style={styles.marker} resizeMode="contain" source={marker} />
          </View>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#fb9403" }}
            position="bottomRight"
            onPress={() => {
              if (this.props.initialRegion) {
                this.map.animateToRegion(this.props.initialRegion, 2000);
              }
            }}
          >
            <Icon type="Foundation" name="target-two" />
          </Fab>

          {this.props.activeBooking ? (
            <Fab
              active={this.state.active}
              containerStyle={{ left: "42%" }}
              style={{ backgroundColor: "#5067FF" }}
              position="bottomLeft"
              onPress={this._toggleWaitingModal}
            >
              <PulseIndicator color="white" />
            </Fab>
          ) : (
            <Fab
              active={this.state.active}
              containerStyle={{ left: "42%" }}
              style={{ backgroundColor: "#5067FF" }}
              position="bottomLeft"
              onPress={this._toggleModal}
            >
              <Icon type="FontAwesome" name="map-pin" />
            </Fab>
          )}

          <BookingModal
            isModalVisible={this.props.isModalVisible}
            props={this.props}
            toggleModal={this._toggleModal}
            changePayment={this.props.changePaymentMethod}
            addBooking={() => {
              this.props.enableLoader(), this.props.addBooking();
            }}
            isLoading={this.props.bookingProcess}
            togglePaymentModal={this._togglePaymentModal}
            fare={this.props.fare ? this.props.fare.calculatedFare : 0.0}
          />

          <WaitingModal
            isModalVisible={this.props.searchingStatus}
            toggleModal={this._toggleWaitingModal}
            props={this.props}
            activeBooking={this.props.activeBooking}
            cancelBooking={this.props.cancelBooking}
            isLoading={this.props.cancelBookingProcess}
            enableLoader={this.props.enableCLoader}
          />

          <PaymentModal
            isModalVisible={this.props.paymentModalStatus}
            paymentMethod={this.props.paymentMethod}
            togglePaymentModal={this._togglePaymentModal}
            userData={this.props.userData}
            fare={
              this.props.fare
                ? this.props.fare.calculatedFare.toString()
                : "0.0"
            }
            addBooking={() => {
              this.props.enableLoader(), this.props.addBooking();
            }}
          />
          <Toast ref="toast" />
        </View>
      </Container>
    );
  }
}

const mapActionToProps = {
  getCurrentRegion,
  getInputData,
  toggleSearchResults,
  getAddressPredictions,
  getSelectedAddress,
  onMapDraged,
  changePaymentMethod,
  addBooking,
  toggleBookingModal,
  toggleWaitingModal,
  togglePaymentModal,
  enableLoader,
  cancelBooking,
  enableCLoader
};

const mapStateToProps = state => {
  return {
    resultType: state.location.resultType,
    predictions: state.location.predictions,
    inputData: state.location.inputData,
    selectedAddress: state.location.selectedAddress,
    paymentMethod: state.booking.paymentMethod,
    isModalVisible: state.booking.isModalVisible,
    searchingStatus: state.booking.searchingForDriver,
    activeBooking: state.booking.booking.active,
    bookingProcess: state.booking.loading,
    cancelBookingProcess: state.booking.cloader,
    paymentModalStatus: state.booking.paymentModalStatus,
    fare: state.location.selectedAddress.matrix,
    initialRegion: state.location.region,
    userData: state.auth.userData
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(MapScreen);
