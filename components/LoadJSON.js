import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image } from 'react-native';
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle } from 'native-base'

import axios from 'axios'

export default class LoadJSON extends Component {
  static navigationOptions = {
    title: 'Load JSON'
    
  };
  render() {
    const { params } = this.props.navigation.state;
    const user = params.user
    //console.log ("USUARIO PARAMS");
    //console.log(user);
    return (
      <Container>
        <Header>
          <Left>
             <Icon name="menu" onPress={()=> this.props.navigation.navigate('DrawerOpen')} style={{ color: 'white'}}/>
          </Left>
          <Body>
            <Title>{user.displayName}</Title>
            <Subtitle>Points: {user.points}</Subtitle>
          </Body>
        </Header>
        <Content contentContainerStyle={{
          flex:1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text>Load JSON Screen</Text>
        {
          user.role == "user" ?
          <Text>Operacion No permitida</Text>
          :<Button block>
            <Text>Load JSON</Text>
          </Button>
        }         
          
        </Content>
      </Container>
    );
  }
}

