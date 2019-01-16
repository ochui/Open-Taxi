import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  marker: {
    height: 48,
    width: 48
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
    zIndex: 2,
    height: 48,
    width: 48
  },
  isPanding: {
    marginTop: -60
  }
}));
