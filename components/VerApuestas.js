import React, { Component } from "react";
import { View, Text, StyleSheet, Image,Modal,TouchableHighlight } from "react-native";
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle,Card,CardItem,Input,Form,Item } from 'native-base'

import Dialog from "react-native-dialog";

import {logOut,readMatches, createBet, updateUserCounterInMatches } from "../api"
export default class VerApuestas extends Component {
  static navigationOptions = {
    title: "VerApuestas"
  };

  constructor(props) {
    super(props)
  
    this.state = ({
       matches:null,
       teamA:0, 
       teamB:0,
       modalVisible: false, 
       temporalMatch: null,
    })
  }

  createbet(match_uid, home_score, away_score) {
    const bet = {
      matchUid: match_uid,
      homeScore: home_score,
      away_score: away_score
    }
    createBet(bet);
    updateUserCounterInMatches(match_uid, home_score, away_score);
  }
  
  


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    //console.log ("USUARIO PARAMS");
    //console.log(user);
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
             <View>
                <Dialog.Container visible={this.state.modalVisible}>
                  {
                    this.state.temporalMatch ? 
                    <Dialog.Title>{this.state.temporalMatch.away_team.name} VS {this.state.temporalMatch.home_team.name} </Dialog.Title>
                     : <Text></Text>
                  }                 
                   
                  <Input autoCorrect={false}
                    placeholder="0"
                    autoCapitalize="none"                    
                    onChangeText={(teamA)=>this.setState({teamA})}  />
                  <Input autoCorrect={false}
                    placeholder="0"
                    autoCapitalize="none"                    
                    onChangeText={(teamB)=>this.setState({teamB})}  />  
                                                      
                  <Dialog.Button label="Cancel" onPress={()=>{
                      this.setModalVisible(false);
                      this.setState({
                        temporalMatch:null,
                      });
                  }}/>
                  <Dialog.Button label="Apostar" onPress={()=>{
                      this.setModalVisible(false);
                      this.setState({
                        temporalMatch:null,
                      });
                      alert('Apuesta Realizada');
                  }}/>
                </Dialog.Container>
              </View>
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
                    this.setState({
                      temporalMatch:item
                    });
                    this.setModalVisible(true);
                  }}>
                      <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", color: 'blue'}}> Definir</Text>
                  </CardItem>
                }
                              
            </Card>
            
           
          }>
          </Card>
      
        </Content>
      </Container>
    );
  }
}
