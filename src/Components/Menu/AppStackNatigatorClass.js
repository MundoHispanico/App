import React, { Component } from 'react';
import WebArticlesBrowser from '../Views/WebBrowser/WebArticlesBrowser';
import ArticleRequest from '../Views/Articles/ArticleRequest';
import HomePage from '../Views/HomePage';

import { createStackNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';


class AppStackNatigatorClass extends Component {

    constructor(props){
        super(props)
   }
    
    render(){
        return (
            <AppStackNatigator/>
        );
    }
}

const AppStackNatigator = new createStackNavigator({
  DrawerNavigator : {
    screen : DrawerNavigator,
    navigationOptions: { header: null } //Prevent double header
  },
  HomePage : {screen: HomePage,
    navigationOptions: { header: null } //Prevent double header
  },
  ArticleRequest : {screen : ArticleRequest,
    navigationOptions: { header: null } //Prevent double header
  },
  WebArticlesBrowser : {screen : WebArticlesBrowser,
    navigationOptions: { header: null } //Prevent double header
  }
 
});

export default AppStackNatigatorClass;