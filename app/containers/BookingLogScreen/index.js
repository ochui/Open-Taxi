import React, { Component } from "react";
import { Container, View } from "native-base";
import AppHeader from "../../components/Header";
import Timeline from "react-native-timeline-listview";
import { connect } from "react-redux";
import styles from "./styles";

class BookingLogScreen extends Component {
  render() {
    return (
      <Container>
        <AppHeader props={this.props} />
        <View style={styles.container}>
          <Timeline
            style={styles.list}
            data={this.props.pastBookings}
            showTime={false}
            innerCircle={"dot"}
            circleSize={20}
            circleColor="black"
            lineColor="black"
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              padding: 5,
              borderRadius: 13
            }}
            descriptionStyle={{ color: "gray" }}
            options={{
              style: { paddingTop: 5 }
            }}
          />
        </View>
      </Container>
    );
  }
}

mapStateToProps = state => {
  return {
    pastBookings: state.booking.pastBookings || []
  };
};

export default connect(
  mapStateToProps,
  null
)(BookingLogScreen);
