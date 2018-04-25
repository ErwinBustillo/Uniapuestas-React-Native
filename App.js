import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

import { 
  StackNavigator,  
  SafeAreaView 
} from "react-navigation";

import Drawer from './components/Drawer'

import { Font,AppLoading } from "expo";

import Login from "./components/Login";
import Register from "./components/Register";

import {Root} from 'native-base'

console.disableYellowBox = ['Remote debugger'];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: null,
      ready:false
    })    
  }

  async componentDidMount(){
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
  }

  render() {  
      if (this.state.ready == false) {
        return <AppLoading />;
      }
      else{
        return(            
          <Root>
               <StackNav  /> 
          </Root>          
        ); 
      }       
  }   
}

const StackNav = StackNavigator(
  {
    Drawer:{
      screen:Drawer,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    }    
  },
  {
    headerMode: "none",
    initialRouteName: "Login" 
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
