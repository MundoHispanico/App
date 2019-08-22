import React, { Component } from 'react';
import {DrawerNavigator} from 'react-navigation';
import SideMenu from '../Menu/SideMenu';
import WebArticlesBrowser from '../Views/WebBrowser/WebArticlesBrowser';
import ArticleRequest from '../Views/Articles/ArticleRequest';
import HomePage from '../Views/HomePage';

class AppDrawerNavigatorClass extends Component {

    constructor(props){
        super(props)
   }
    
    render(){
        return (
            <AppDrawerNavigator/>
        );
    }
}



const AppDrawerNavigator = new DrawerNavigator({
    HomePage : {screen: HomePage },
    ArticleRequest : {screen : ArticleRequest},
    WebArticlesBrowser : {screen : WebArticlesBrowser}
},
{
  contentComponent: SideMenu,
})

export default AppDrawerNavigatorClass;