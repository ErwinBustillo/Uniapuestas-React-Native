import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image } from 'react-native';
import { Icon, Button, Container,Body, Header,Left, Content,Title,Subtitle } from 'native-base'
import {logOut} from '../api';
import avatar from '../assets/man.png';
export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile'
   
  };

  logout(){
    logOut().then(() =>{
      console.log('Signed Out');
      this.props.navigation.navigate("Login");
    }, function(error) {
      console.error('Sign Out Error', error);
    });
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
            <Title>{user.diplayName}</Title>
            <Subtitle>Points: {user.points}</Subtitle>
          </Body>
        </Header>
        
        <Content contentContainerStyle={{
          flex:1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <Image source={avatar} style={{width: 150, height: 150}}/>
          <Button block onPress={()=> this.logout()} >
            <Text style={{color: 'white'}}>LOG OUT</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

