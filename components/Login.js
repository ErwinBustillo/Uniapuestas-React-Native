import React, { Component } from "react";
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
import { logIn } from "../api";

class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email:'',
       password:''
    };
  };

  onSubmit = () => {
    const { email, password } = this.state;
    const user = { email, password };
    
    if(email !=null && password !=null){
        logIn(user).then((u) => {
          console.log('usuario: ' +u);
          //this.props.setU(u);
      });
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
          <Button block onPress={() => {           
            this.onSubmit();
          }}>
            <Text>Login</Text>
          </Button>
          <Button
            transparent
            block
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text>Create Account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
