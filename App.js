import React, { Component } from "react";


import { 
  StackNavigator  
} from "react-navigation";

import { Font,AppLoading } from "expo";
import {Root} from 'native-base'
import Drawer from './components/Drawer'
import Login from "./components/Login";
import Register from "./components/Register";

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
    this.setState({
      ready:true
    });
  }

  render() {  
      if (this.state.ready == false) {
        return <AppLoading/>;
      }
      else{
        return(            
           <AppNavigation usuario={this.state.user}/> 
        ); 
      }       
  }   
}

const AppNavigation = StackNavigator(
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


