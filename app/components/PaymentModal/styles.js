import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default (styles = {
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fb9403"
  },
  farePrice: {
    width: 130,
    height: 70,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "#fb9403",
    marginTop: 40
  },
  name: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  info: {
    fontSize: 16,
    color: "#fb9403",
    marginTop: 10
  },
  buttonContainer: {
    backgroundColor: "#000",
    paddingVertical: 15,
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    alignSelf: "center"
  },
  fareText: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    fontSize: 22,
    color: "#fff",
    fontWeight: "600"
  },
  searchBox: {
    top: 0,
    width: width
  },
  inputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
    opacity: 0.8,
    borderBottomWidth: 0
  },
  secondInputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 0,
    backgroundColor: "#fff",
    opacity: 0.8,
    borderBottomWidth: 0
  },
  inputSearch: {
    fontSize: 14
  },
  label: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0
  },
  inputGroup: {
    borderBottomWidth: 0
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
