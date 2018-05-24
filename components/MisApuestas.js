import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image } from 'react-native';
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle,Card,CardItem,Input } from 'native-base'

import Dialog from "react-native-dialog";

import {readBets,readMatch,updateBet} from '../api';

var apuestas = []
export default class MisApuestas extends Component {

  constructor(props) {
    super(props)
  
    this.state = ({
       bets:null,
       teamA:0,
       teamB:0,
       temporalMatch:null,
       modalVisible:false
    })
  }
  static navigationOptions = {
    title: 'Mis Apuestas'
  };
  componentDidMount(){

    readBets().once('value').then((snapshot)=>{
    
      this.setState({
        bets:snapshot.val()
      });
      /*
      apus.map( (a)=>{
        //console.log(a);
        let obj = [];
        for (var i in a ){
             obj.push(a[i]);
        }
        for (var o of obj){
          readMatch(o.matchUid).once('value', s =>{
            //console.log("PARTIDO");
            //console.log(s.val());
            apuestas.push(...s.val());
            
          });
        }
        console.log("APUESTAS:");
        console.log(apuestas);
      });
      */  
     });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render() {
    const { params } = this.props.navigation.state;
    const user = params.user
    
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
          
          <View>
            <Dialog.Container visible={this.state.modalVisible}>
              {
                this.state.temporalMatch ? 
                <Dialog.Title>Editar Apuesta </Dialog.Title>
                : <Text></Text>
              }                 
              <Input autoCorrect={false}
                placeholder="home team score"
                autoCapitalize="none"                    
                onChangeText={(teamA)=>this.setState({teamA})}  />
              <Input autoCorrect={false}
                placeholder="away team score"
                autoCapitalize="none"                    
                onChangeText={(teamB)=>this.setState({teamB})}  />  
                                                  
              <Dialog.Button label="Cancel" onPress={()=>{
                  this.setModalVisible(false);
                  this.setState({
                    temporalMatch:null,
                    teamA: 0,
                    teamB: 0
                  });
              }}/>
              <Dialog.Button label="Editar" onPress={()=>{
                  
                  console.log("CLAVE BET ");
                  console.log(this.temporalMatch.id);
                  //this.updateBet(this.temporalMatch.id,parseInt(this.state.teamA),parseInt(this.state.teamB));
                  alert('Apuesta Actualizada');
                  this.setModalVisible(false);
                  this.setState({
                    temporalMatch:null,
                    teamA: 0,
                    teamB: 0
                  });
              }}/>
            </Dialog.Container>
          </View>
          {
            this.state.bets != null ?

              <Card dataArray={this.state.bets} renderRow={(item)=>
                
                <Card >
                    <CardItem header bordered>
                        <Text style={{fontSize:40, fontFamily: 'Roboto', fontStyle: "bold"}}>Apuesta {item.matchUid}</Text>
                    </CardItem>
                    <CardItem cardBody >
                        <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}>Home score:{item.home_score}</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", paddingLeft:10}}>Away score:{item.away_score}</Text>
                    </CardItem>
                    <CardItem footer bordered button onPress={() => {
                        this.setModalVisible(true);
                        this.setState({
                          temporalMatch:item,
                        });
                    }}>
                        <Text style={{fontSize:20, fontFamily: 'Roboto', fontStyle: "bold", color: 'blue'}}> Editar</Text>
                    </CardItem>
                </Card>
              }>
              </Card>
              : <Text>No Tienes apuestas aun</Text>
          }
        </Content>
      </Container>
    );
  }
}

