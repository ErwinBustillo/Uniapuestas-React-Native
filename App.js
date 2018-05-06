import React, { Component } from "react";


import { 
  StackNavigator  
} from "react-navigation";

import { Font,AppLoading } from "expo";
import {Root} from 'native-base'
import Drawer from './components/Drawer'
import Login from "./components/Login";
import Register from "./components/Register";

import {isAuthenticated} from "./api"

console.disableYellowBox = ['Remote debugger'];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: null,
      ready:false,
      initRoute: ""
    })    
  }

  //se revisa si existe en localstorage el usuario que se loggeo cuando la app se vuelve a cargar
  authListener(){
      isAuthenticated
      .then( u=>{
        if(u != null){
          this.setState({
            initRoute: "Drawer",
            user:u
          });
          //console.log('usuario: ' + this.state.user.email);
        }
        else{
          //console.log('no se ha loggeado');
          this.setState({
            initRoute: "Login",
            user:null
          });
          
        }
      })
  }


  
  async componentDidMount(){
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    
    this.authListener();


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
           <AppNavigation user={this.state.user}/> 
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


