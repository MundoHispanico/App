import React, {Component} from 'react';
import {BackHandler, View, Image} from 'react-native'
import {Router, Stack, Scene, Drawer, Actions} from 'react-native-router-flux';

import MenuIMG from '../../assets/Icons/baseline_menu_white_36dp.png'

import WebArticlesBrowser from '../Views/WebBrowser/WebArticlesBrowser';
import ArticleRequest from '../Views/Articles/ArticleRequest';
import HomePage from '../Views/HomePage';
import SideMenu from '../Menu/SideMenu';

const MenuIcon = (
<View>
  <Image source={MenuIMG} style={{height:30, width:30}}/>
</View>)


class RouterDefault extends Component{
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    
  }

  backPressed = () => {
    if(Actions.currentScene == "_HomePage"){
      BackHandler.exitApp();
      return true;
    }
  }

render(){
  return (    
  <Router>
    <Stack key="root">
    <Scene key="WebArticlesBrowser" component={WebArticlesBrowser} 
                  title="Web Browser"
                  hideNavBar={true}
                  />
    <Scene key="ArticleRequest" component={ArticleRequest} 
                  title="ArticleRequest"
                  hideNavBar={true}
                  />
      <Drawer key="drawer" contentComponent={SideMenu} 
              drawerIcon={MenuIcon}
              drawerWith={300}
              initial
              hideNavBar={true}
              >
          <Scene key="HomePage" component={HomePage} title="Home"
                  title="HomePageContainer"
                  hideNavBar={true}
                   />

      </Drawer>
    </Stack>
  </Router>)
    }
  }
 

export default RouterDefault;

