import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import {store, persistor} from "./app/store";
import RootComponent from "./app/navigations/RootNavigator";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      Foundation: require("@expo/vector-icons/fonts/Foundation.ttf"),
      MaterialIcons: require("@expo/vector-icons/fonts/MaterialIcons.ttf")
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    axios.defaults.baseURL = "https://tripple-a.herokuapp.com/api/v1/";
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </Provider>
    );
  }
}
