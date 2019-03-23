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
import { getCars } from "../../actions/carsActions";

class SelfDriveScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.getCars();
  }

  cell = data => {
    return (
      <Card>
        <CardImage
          source={{ uri: data.image }}
          title={data.model}
        />
        <CardTitle subtitle={data.status ? "Available" : "Unavailable"} />
        <CardContent text={`${data.start_time}am --- ${data.end_time}am (Next day)`} />
        <CardContent text={`₦${data.cost}`} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#0C4866" />
          <CardButton onPress={() => {console.log('123')}} title="Request Now" color="#0C4866" />
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
          onEndReached={() => console.log("reach end")}
          onEndReachedThreshold={0}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars.cars || []
  };
};

const mapActionToProps = { getCars };

export default connect(
  mapStateToProps,
  mapActionToProps
)(SelfDriveScreen);
