import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthTabNavigator from "./AuthNavigator";

const RootComponent = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthTabNavigator
    },
    {
      //initialRouteName: "AuthLoading"
    }
  )
);

export default RootComponent;
