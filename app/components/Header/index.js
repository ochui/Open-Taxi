import React from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

import styles from './styles'
const AppHeader = ({props}) => {
  return (
    <Header
      style={styles.header}
      iosBarStyle="light-content"
      androidStatusBarColor="#fb9403">
      <Left>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Icon style={styles.icon} ios="ios-menu" android="md-menu" />
        </Button>
      </Left>
      <Body style={styles.headerBody}>
        <Title style={styles.headerText}>Tripple A</Title>
      </Body>
      <Right>
        <Icon
          style={styles.icon}
          ios="ios-notifications"
          android="md-notifications"
        />
      </Right>
    </Header>
  );
};

export default AppHeader;
