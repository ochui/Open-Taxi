import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export default (styles = {
  searchBox: {
    top: 0,
    position: "absolute",
    width: width
  },
  inputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
    opacity: 0.8
  },
  secondInputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 0,
    backgroundColor: "#fff",
    opacity: 0.8
  },
  inputSearch: {
    fontSize: 14
  },
  label: {
    fontSize: 10,
    fontStyle: "italic",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0
  }
});
