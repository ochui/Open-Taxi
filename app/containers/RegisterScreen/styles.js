import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0C4866"
    },
    loginContainer: {
      alignItems: "center",
      flexGrow: 1,
      justifyContent: "center"
    },
    logo: {
      position: "absolute",
      width: 300,
      height: 100
    },
    formInputcontainer: {
      padding: 20
    },
    input: {
      height: 40,
      backgroundColor: "rgba(225,225,225,0.2)",
      marginBottom: 10,
      padding: 10,
      color: "#000"
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
      width: 320,
      //alignSelf: "center"
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "700"
    }
  });