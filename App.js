import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

import { 
  StackNavigator,  
  SafeAreaView,
  TabNavigator
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

  async componentWillMount(){
    console.log('Me ejecute antes del render');
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ ready: true });

  }

  render() {  
      if (!this.state.isReady) {
        return <AppLoading />;
      }
      else{
        return(            
          <View>
               <StackNav usuario={ this.state.user } /> 
          </View>  
                   
                     
        ); 
      }   
        
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
