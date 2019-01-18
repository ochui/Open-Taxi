import React from "react";
import { DrawerItems } from "react-navigation";
import {
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image
} from "react-native";
import { Icon } from "native-base";
import styles from "./styles";

const SideBar = props => (
  <ScrollView
    contentContainerStyle={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between"
    }}
  >
    <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
    <View
      style={{
        height: 150,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ height: 120, width: 120, borderRadius: 60 }}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
    </View>
      <DrawerItems {...props} />
    </SafeAreaView>
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          "Log out",
          "Do you want to logout?",
          [
            {
              text: "Cancel",
              onPress: () => {
                return null;
              }
            },
            {
              text: "Confirm",
              onPress: () => {
                props.navigation.navigate("Auth");
              }
            }
          ],
          { cancelable: false }
        )
      }
    >
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon
            ios="ios-log-out"
            android="md-log-out"
            style={{ color: "white" }}
          />
        </View>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>
  </ScrollView>
);

export default SideBar;
