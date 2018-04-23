import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image } from 'react-native';
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle } from 'native-base'

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile'
   
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
             <Icon name="menu" onPress={()=> this.props.navigation.navigate('DrawerOpen')} style={{ color: 'white'}}/>
          </Left>
          <Body>
            <Title>username</Title>
            <Subtitle>Points: 00</Subtitle>
          </Body>
        </Header>
        
        <Content contentContainerStyle={{
          flex:1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>Profile Screen</Text>
        </Content>
      </Container>
    );
  }
}

