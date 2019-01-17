import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  header: {
    backgroundColor: "#fb9403",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "#fff"
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
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
    width: 250
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
}));
