import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle,Card,CardItem } from 'native-base'


import {logOut,readMatches, createBet, isAuthenticated, loadUserData } from "../api"
export default class VerApuestas extends Component {
  static navigationOptions = {
    title: "VerApuestas"
  };

  constructor(props) {
    super(props)
  
    this.state = ({
       matches:null,
       teamA:0, 
       teamB:0
    })
  }

  createbet(match_uid, home_score, away_score) {
    const bet = {
      matchUid: match_uid,
      homeScore: home_score,
      away_score: away_score
    }
    createBet(bet).then((ok) => console.log(ok));
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
      //console.log(snapshot.val()); 
      this.setState({matches:snapshot.val()});   
     });
  }
  
  render() {
    const { params } = this.props.navigation.state;
    const user = params.user
    console.log ("USUARIO PARAMS");
    console.log(user);
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
            <Title>{user.displayName}</Title>
            <Subtitle>points : {user.points}</Subtitle>
          </Body>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1          
          }}
          >
          
          <Card dataArray={this.state.matches} renderRow={(item)=>
            <Card >
                <CardItem header bordered>
                    <Text style={{fontSize:40, fontFamily: 'Roboto', fontStyle: "bold"}}>{item.away_team.name} Vs {item.home_team.name}</Text>
                </CardItem>
                <CardItem cardBody >
                    <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}>Dia {item.date}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}> Grupo {item.group}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}> Gana Equipo A : 0 Usuarios</Text>
                </CardItem>
                <CardItem cardBody>
                    <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}> Empate : 0 Usuarios</Text>
                </CardItem>
                <CardItem cardBody  >
                    <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}> Gana Equipo B : 0 Usuarios</Text>
                </CardItem>
                
                {
                  user.role == "user" ?
                  <CardItem footer bordered button onPress={() => {
                    alert("Apostar");
                    this.createbet(item.id, 3, 1);
                  }}>
                      <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", color: 'blue'}}> Apostar</Text>
                  </CardItem>
                  : <CardItem footer bordered button onPress={() => {
                    alert("Definir");
                    
                  }}>
                      <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", color: 'blue'}}> Definir</Text>
                  </CardItem>
                }
                              
            </Card>
            
           
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
