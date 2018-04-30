import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import {
  Icon,
  Button,
  Container,
  Body,
  Header,
  Left,
  Content,
  Title,
  Subtitle
} from "native-base";


import {logOut} from "../api"
export default class VerApuestas extends Component {
  static navigationOptions = {
    title: "VerApuestas"
  };

  logout(){
    logOut().then(() =>{
      console.log('Signed Out');
      this.props.navigation.navigate("Login");
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  componentDidMount() {
    // traer los partidos 
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon
              name="menu"
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
              style={{ color: "white" }}
            />
          </Left>
          <Body>
            <Title>username</Title>
            <Subtitle>Points: 00</Subtitle>
          </Body>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }} >
          <Button block onPress={()=> this.logout()} >
            <Text>Crear apuesta</Text>
          </Button>
          <Text>Ver Apuestas Screen</Text>
          <Button block onPress={()=> this.logout()} >
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
