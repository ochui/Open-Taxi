import React from "react";
import { Icon } from "native-base";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import SideBar from "../components/SideBar";
import MapScreen from "../containers/MapScreen";
import ProfileScreen from "../containers/ProfileScreen";
import EditProfileScreen from "../containers/EditProfileScreen";
import BookingLogScreen from "../containers/BookingLogScreen";
import CompanyScreen from "../containers/CompanyScreen";
import RouteScreen from "../containers/RouteScreen";
import SelfDriveScreen from "../containers/SelfDriveScreen";
// Profile
const ProfileStackNavigator = createStackNavigator({
  Profile: ProfileScreen,
  Edit: EditProfileScreen
});

// Park(Company)
const ParkStackNavigator = createStackNavigator({
  Parks: CompanyScreen,
  Routes: RouteScreen
});

// Main
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: MapScreen,
    Bookings: {
      screen: BookingLogScreen,
      navigationOptions: {
        header: null,
        drawerIcon: () => (
          <Icon
            ios="ios-bookmark"
            android="md-bookmark"
            style={{ color: "white" }}
          />
        )
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        header: null,
        drawerIcon: () => (
          <Icon
            ios="ios-contact"
            android="md-contact"
            style={{ color: "white" }}
          />
        )
      }
    },
    Park: {
      screen: ParkStackNavigator,
      navigationOptions: {
        header: null,
        drawerIcon: () => (
          <Icon
            ios="ios-car"
            android="md-car"
            style={{ color: "white" }}
          />
        )
      }
    },
    SelfDrive: {
      screen: SelfDriveScreen,
      navigationOptions: {
        header: null,
        drawerLabel: 'Self Drive',
        drawerIcon: () => (
          <Icon
            ios="ios-car"
            android="md-car"
            style={{ color: "white" }}
          />
        )
      }
    }
  },
  {
    contentComponent: SideBar,
    drawerBackgroundColor: "#0C4866",
    contentOptions: {
      activeBackgroundColor: "#0F3F55",
      activeTintColor: "white",
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

export { AppDrawerNavigator };
