import { Container, Content, Icon, Header, Body } from "native-base";
import {StyleSheet} from 'react-native'
import {
    DrawerNavigator,
    StackNavigator,
    DrawerItems,
    SafeAreaView
  } from "react-navigation";

import VerApuestas from "./VerApuestas"
import MisApuestas from "./MisApuestas";
import Profile from "./profile";
import LoadJSON from "./LoadJSON";

import balon from "./ball.png";

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
  
  const Drawer = DrawerNavigator(
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

  export default Drawer;
