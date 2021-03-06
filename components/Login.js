import React, { Component } from "react";
import {Image} from 'react-native'
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Text
} from "native-base";
import { logIn, loadUserData } from "../api";
import chips from '../assets/chips.png'
class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = ({
       email:'',
       password:''
    })  
  };

  login =(email,password)=>{
    if (email == '') {
      alert('Digite su email');
      return;
    }
    if (password == '') {
      alert('Digite la clave');
      return;
    }   

    logIn(email,password).then((u) => {  

        //console.log('usuario: ' +u.email);   
        //console.log('id:' + u.uid);
        //console.log('username:' + u.displayName);
        loadUserData(u.uid).once('value').then((snapshot)=>{
            console.log(snapshot.val());
            this.props.navigation.navigate('Drawer',{
              user: snapshot.val(),
            }); 
        });
    }).catch((err)=>{
      console.log(err.message);
      alert('Error de credenciales');
    })       
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image source={chips} style={{width: 100, height: 100}}/>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Icon active name="mail" />
              <Input autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(email)=>this.setState({email})}/>
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Icon active name="key" />
              <Input autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}  />
            </Item>
          </Form>
          <Button block onPress={()=> this.login(this.state.email,this.state.password)} >
            <Text>Login</Text>
          </Button>
          <Button
            transparent
            block
            onPress={() => navigate("Register")}
          >
            <Text>Create Account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
