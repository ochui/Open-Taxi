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
import { getCompanies, getRoutes } from "../../actions/companyAction";

class CompanyScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.getCompanies();
  }

  cell = data => {
    return (
      <Card>
        <CardImage
          source={{ uri: "http://bit.ly/2GfzooV" }}
          title={data.name}
        />
        <CardTitle subtitle="23 Route" />
        <CardContent text={data.address} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#FEB557" />
          <CardButton
            onPress={() => {
              this.props.getRoutes(data.id);
              this.props.navigation.navigate("Routes", { park: data.id });
            }}
            title="Explore"
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
          searchKey={["name", "address"]}
          searchBarBackgroundStyles="yellow"
          highlightColor="#fb9403"
          pullToRefreshCallback={() => {
            this.props.getCompanies();
          }}
          data={this.props.companies}
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
    companies: state.company.companies || []
  };
};

const mapActionToProps = { getCompanies, getRoutes };

export default connect(
  mapStateToProps,
  mapActionToProps
)(CompanyScreen);
