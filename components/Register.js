import React, { Component } from "react";
import { signUp, createUserInDatabase } from "../api";

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

class Register extends Component {
  
  constructor(props) {
    super(props);

    this.state = ({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

  }

  registrar = (displayName,email,password,confirmPassword)=> {

    if (displayName == '') {
      alert('Digite el username');
      return;
    }
    if (email == '') {
      alert('Digite su email');
      return;
    }
    if (password == '') {
      alert('Digite la clave');
      return;
    }
    if (confirmPassword== '') {
      alert('Digite la clave de confirmacion');
      return;
    }
    

    const usuario = ({
      displayName: displayName,
      email: email,
      password: password
    })

    if (password === confirmPassword) {
      console.log("usuario" + user);
      signUp(usuario).then(() => {
        createUserInDatabase(usuario).then((response) => {
          if (response.success) { 
            alert("registro exitoso");           
                    
          }
        });
      });
    }
    else{
      alert('Las claves no coinciden');
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Icon active name="person" />
              <Input autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(displayName)=>this.setState({displayName})} />
            </Item>
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
                    onChangeText={(password)=>this.setState({password})} />
            </Item>
            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Icon active name="key" />
              <Input autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword)=>this.setState({confirmPassword})}/>
            </Item>
          </Form>
          <Button 
            block
            onPress={() => this.registrar(this.state.displayName,this.state.email,this.state.password,this.state.confirmPassword)}
          >
            <Text>Register</Text>
          </Button>
          <Button
            transparent
            block
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>Go Back</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Register;
