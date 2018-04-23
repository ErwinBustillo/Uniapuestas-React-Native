import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image } from 'react-native';
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle } from 'native-base'

export default class MisApuestas extends Component {
  static navigationOptions = {
    title: 'Mis Apuestas'
   
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
          <Text>Mis Apuestas Screen</Text>
        </Content>
      </Container>
    );
  }
}

