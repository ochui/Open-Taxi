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

class RouteScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      routeId: null,
      cost: null
    };
  }

  _toggleModal = (routeId = null, cost = null) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      routeId: routeId,
      cost: cost
    });
  };

  cell = data => {
    return (
      <Card>
        <CardTitle title={data.pick_up + " to " + data.drop_off} />
        <CardContent text={"₦" + data.cost} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#FEB557" />
          <CardButton
            onPress={() => {
              this._toggleModal((routeId = data.id), (cost = data.cost));
            }}
            title="Book"
            color="#FEB557"
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
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    routes: state.company.routes || []
  };
};

const mapActionToProps = { getRoutes };

export default connect(
  mapStateToProps,
  mapActionToProps
)(RouteScreen);