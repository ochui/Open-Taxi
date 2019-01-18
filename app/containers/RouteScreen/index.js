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

class RouteScreen extends Component {
  static navigationOptions = {
    header: null
  };

  cell = data => {
    return (
      <Card>
        <CardTitle title={data.pick_up + " to " + data.drop_off} />
        <CardContent text={"₦" + data.cost} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#FEB557" />
          <CardButton onPress={() => {}} title="Book" color="#FEB557" />
        </CardAction>
      </Card>
    );
  };

  render() {
    return (
      <Container>
        <AppHeader props={this.props} />
        <CompleteFlatList
          searchKey={["pick_up", "drop_off"]}
          searchBarBackgroundStyles="yellow"
          highlightColor="#fb9403"
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
