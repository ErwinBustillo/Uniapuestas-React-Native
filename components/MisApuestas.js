import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image } from 'react-native';
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle,Card,CardItem } from 'native-base'


import {readBets,readMatch} from '../api';

const bets = [];

export default class MisApuestas extends Component {

  constructor(props) {
    super(props)
  
    this.state = ({
       bets:null,
       teamA:0,
       teamB:0
    })
  }
  static navigationOptions = {
    title: 'Mis Apuestas'
  };
  componentDidMount(){

    let apuestas = []
    readBets().once('value').then((snapshot)=>{
      //console.log("APUESTAS");
      
      let apus = []
      apus.push(snapshot.val());
      //console.log(apus);
      
      
      apus.map( (a)=>{
        //console.log(a);
        let obj = [];
        for (var i in a ){
             obj.push(a[i]);
        }
        for (var o of obj){
          readMatch(o.matchUid).once('value', s =>{
            console.log("PARTIDO");
            console.log(s.val());
            apuestas.push(s.val());
            
          });
        }
      });      
     });
    console.log("APUESTAS:");
    console.log(apuestas);
    this.setState({
       bets: apuestas,
    });
  }

 
  render() {
    const { params } = this.props.navigation.state;
    const user = params.user
    //console.log ("USUARIO PARAMS");
    //console.log(user);
    console.log("BETS");
    console.log(this.state.bets);
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
          flex:1
         
        }}>
          {/* <Card dataArray={this.state.bets} renderRow={(item)=>
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
                
                  <CardItem footer bordered button onPress={() => {
                    alert("Editar");
                    
                  }}>
                      <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", color: 'blue'}}> Editar</Text>
                  </CardItem>
                              
            </Card>
                       
          }>
          </Card> */}
        </Content>
      </Container>
    );
  }
}

