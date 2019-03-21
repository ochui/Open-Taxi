import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default (styles = {
  findDriverContainer: {
    flex: 1,
    backgroundColor: "#0C4866",
    justifyContent: "center",
    alignItems: "center"
  },
  tabText: {
    fontSize: 12
  },
  subTabText: {
    fontSize: 8
  },
  spinner: {
    marginBottom: 200
  },
  btn: {
    marginTop: 20
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    marginTop: 15
  },
  locationIcon: {
    color: "#fff",
    fontSize: 40,
    marginTop: 15
  },
  content: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  pickup: {
    width: width * 0.9,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 260,
    justifyContent: "center",
    alignItems: "center"
  },
  toArrow: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10
  },
  dropoff: {
    width: width * 0.9,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelBtnWrapper: {
    marginTop: 15,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelBtn: {
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
  cancelBtnText: {
    color: "#fff"
  },
  termsText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 15
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C4866"
  }
});
