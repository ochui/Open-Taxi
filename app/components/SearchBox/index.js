import React from "react";
import { Input, View, Item, Icon } from "native-base";
import styles from "./styles";

const SearchBox = ({
  getInputData,
  toggleSearchResults,
  getAddressPredictions,
  inputData
}) => {
  function handleInput(key, val) {
    getInputData({
      key,
      value: val
    });
    getAddressPredictions();
  }
  return (
    <View style={styles.searchBox}>
      <Item style={styles.inputWrapper}>
        <Icon
          type="FontAwesome"
          name="map-pin"
          style={{
            padding: 10,
            color: "green"
          }}
        />
        <Input
          style={styles.inputSearch}
          placeholder="Choose pick-up location"
          onChangeText={handleInput.bind(this, "pickUp")}
          onFocus={() => toggleSearchResults("pickUp")}
          value={inputData.pickUp}
        />
      </Item>
      <Item style={styles.secondInputWrapper}>
        <Icon
          type="FontAwesome"
          name="map-pin"
          style={{
            padding: 10,
            color: "red"
          }}
        />
        <Input
          style={styles.inputSearch}
          placeholder="Choose drop-off location"
          onChangeText={handleInput.bind(this, "dropOff")}
          onFocus={() => toggleSearchResults("dropOff")}
          value={inputData.dropOff}
        />
      </Item>
    </View>
  );
};

export default SearchBox;
