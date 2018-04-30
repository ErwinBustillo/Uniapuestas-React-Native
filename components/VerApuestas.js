import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle,Card,CardItem } from 'native-base'


import {logOut,readMatches} from "../api"
export default class VerApuestas extends Component {
  static navigationOptions = {
    title: "VerApuestas"
  };

  constructor(props) {
    super(props)
  
    this.state = ({
       matches:null
    })
  }
  
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

    readMatches().once('value').then((snapshot)=>{
      console.log(snapshot.val()); 
      this.setState({matches:snapshot.val()});   
     });
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
          }}
          >
          <Card dataArray={this.state.matches} renderRow={(item)=>
            <CardItem header button onPress={() => alert("This is Card Header")}>
              <Text>{item.away_team.name}</Text>
            </CardItem>
          }>
          </Card>
          <Button block onPress={()=> this.logout()} >
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
