import { createMaterialTopTabNavigator } from "react-navigation";
import SignInScreen from "../containers/SignInScreen";
import RegisterScreen from "../containers/RegisterScreen";
import { getStatusBarHeight } from "react-native-status-bar-height";

const AuthTabNavigator = createMaterialTopTabNavigator(
  {
    Signin: SignInScreen,
    Register: RegisterScreen
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: "white"
      },
      tabStyle: {
        color: "white"
      },
      style: {
        backgroundColor: "#fb9403",
        paddingTop: getStatusBarHeight(),
        height: 54 + getStatusBarHeight()
      }
    }
  }
);

export default AuthTabNavigator;
