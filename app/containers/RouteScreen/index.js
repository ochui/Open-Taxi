import React, { Component } from "react";
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
import AppHeader from "../../components/Header";
import { getRoutes } from "../../actions/companyAction";
import RouteModal from "../../components/RouteModal";
import {
  togglePaymentModalC,
  addCarBooking
} from "../../actions/bookingActions";
import CPaymentModal from "../../components/CPaymentModal";
import { changePaymentMethod } from "../../actions/paymentActions";

class RouteScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      isPaymentModalVisible: false,
      routeId: null,
      cost: 0,
      baseCost: 0
    };
  }

  _toggleModal = (routeId = null, cost = null) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      routeId: routeId,
      cost: cost,
      baseCost: cost
    });
  };

  _togglePaymentModal = (routeId = null, cost = null) => {
    this.setState({
      isPaymentModalVisible: !this.state.isPaymentModalVisible
    });
  };

  _togglePaymentModalC = () => {
    this.props.togglePaymentModalC(this.props.paymentModalCStatus);
  };

  cell = data => {
    return (
      <Card>
        <CardTitle title={data.pick_up + " to " + data.drop_off} />
        <CardContent text={"₦" + data.cost} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#0C4866" />
          <CardButton
            onPress={() => {
              this._toggleModal((routeId = data.id), (cost = data.cost));
            }}
            title="Book"
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
          searchKey={["drop_off", "pick_up", "cost"]}
          searchBarBackgroundStyles="yellow"
          pullToRefreshCallback={() => {
            this.props.getRoutes(this.props.navigation.getParam("park", 0));
          }}
          data={this.props.routes}
          ref={c => (this.completeFlatList = c)}
          renderSeparator={null}
          renderItem={this.cell}
          onEndReached={() => console.log("reach end")}
          onEndReachedThreshold={0}
        />

        <RouteModal
          isModalVisible={this.state.isModalVisible}
          toggleRouteModal={this._toggleModal}
          cost={this.state.cost}
          paymentMethod={this.props.paymentMethod}
          onChange={n => this.setState({ cost: this.state.baseCost * n })}
          togglePaymentModal={this._togglePaymentModalC}
          changePayment={this.props.changePaymentMethod}
        />

        <CPaymentModal
          isModalCVisible={this.props.paymentModalCStatus}
          paymentMethod={this.props.paymentMethod}
          toggleCPaymentModal={this._togglePaymentModalC}
          userData={this.props.userData}
          amount={this.state.cost}
          addAction={() => {}}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    routes: state.company.routes || [],
    userData: state.auth.userData,
    paymentMethod: state.booking.paymentMethod,
    paymentModalCStatus: state.booking.paymentModalCStatus
  };
};

const mapActionToProps = {
  getRoutes,
  changePaymentMethod,
  togglePaymentModalC,
  addCarBooking
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(RouteScreen);
