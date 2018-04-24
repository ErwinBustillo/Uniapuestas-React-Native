import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Container, Content, Icon, Header, Body } from "native-base";
import {
  DrawerNavigator,
  StackNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";

import balon from "./assets/ball.png";

import { Font,AppLoading } from "expo";

import VerApuestas from "./components/VerApuestas"
import MisApuestas from "./components/MisApuestas";
import Profile from "./components/profile";
import LoadJSON from "./components/LoadJSON";
import Login from "./components/Login";
import Register from "./components/Register";

console.disableYellowBox = ['Remote debugger'];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      ready:false
    };
    this.setUser = this.setUser.bind(this);
  }



  setUser = (usuario) => {
    this.setState({
      user:usuario
    });
  }
  

  render() {  
      return(
        <View>
          {
            this.state.user ?
            <DrawerNav usuario={ this.state.user } />
            :<StackNav setU={this.setUser} />
          }
        </View>
      );   

      /*if (this.state.user == null) {
        console.log("EL USUARIO ES NULO");
        return <StackNav setU={this.setUser} />;
      } else {
        console.log("USUARIO == " + this.state.user);
        return <DrawerNav usuario={ this.state.user } />;
      }*/
  }
   
}

const StackNav = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Login" 
  }
);

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image style={styles.drawerImage} source={balon} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const DrawerNav = DrawerNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    VerApuestas: {
      screen: VerApuestas
    },
    MisApuestas: {
      screen: MisApuestas
    },
    LoadJSON: {
      screen: LoadJSON
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "VerApuestas",
    drawerPosition: "left",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    headerStyle: {
      backgroundColor: "#ffeb3b"
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  drawerHeader: {
    height: 200,
    backgroundColor: "white"
  },
  drawerImage: {
    height: 150,
    width: 150,
    margin: 0,
    borderRadius: 75
  }
});
