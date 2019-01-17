import React from "react";
import { Icon } from "native-base";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import MapScreen from "../containers/MapScreen";
import ProfileScreen from "../containers/ProfileScreen";
import EditProfileScreen from "../containers/EditProfileScreen";
// Profile
const ProfileStackNavigator = createStackNavigator({
  Profile: ProfileScreen,
  Edit: EditProfileScreen
});

// Main
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: MapScreen,
    // Bookings: {
    //   screen: BookingLogScreen,
    //   navigationOptions: {
    //     header: null,
    //     drawerIcon: () => (
    //       <Icon
    //         ios="ios-bookmark"
    //         android="md-bookmark"
    //         style={{ color: "white" }}
    //       />
    //     )
    //   }
    // },
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
    }
  },
  {
    //contentComponent: SideBar,
    drawerBackgroundColor: "#fb9403",
    contentOptions: {
      activeBackgroundColor: "black",
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
