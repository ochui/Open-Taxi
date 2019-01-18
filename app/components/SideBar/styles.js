import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    margin: 16,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, .87)"
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: "center"
  },
  icon: {
    width: 24,
    height: 24
  }
}));
