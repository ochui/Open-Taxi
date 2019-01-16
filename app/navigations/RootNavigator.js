import { createSwitchNavigator, createAppContainer } from "react-navigation";
import GetLocationScreen from "../containers/GetLocationScreen";
import AuthTabNavigator from "./AuthNavigator";
import { AppDrawerNavigator } from "./AppNavigator";

const RootComponent = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthTabNavigator,
      Location: GetLocationScreen,
      App: AppDrawerNavigator
    },
    {
      //initialRouteName: "AuthLoading"
    }
  )
);

export default RootComponent;
