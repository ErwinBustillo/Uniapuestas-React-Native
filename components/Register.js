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
  
  constructor() {
    super();

    this.state = ({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  onSubmit = () => {

    const {displayName,email,password} = this.state

    const user = {displayName,email,password}

    if (this.state.password === this.state.confirmPassword) {
      console.log('user' + user);
      signUp(user).then(() => {
        createUserInDatabase(user).then((response) => {
          if (response.success) {            
            this.props.navigation.goBack();        
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
            onPress={(e)=> {
              this.onSubmit();
            }}
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
