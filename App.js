import React, {Component} from 'react';
import { View , AsyncStorage} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/data-store/configureStore';

//import AppStackNatigatorClass from './src/Components/Menu/AppStackNatigatorClass';

import { categoryArticlesNew, getMenuItems, setIDFA } from './src/data-store/actions/articles-actions';

import { menuItems } from './src/localData/menu-items';

import RouterDefault from './src/Components/Router/RouterDefault';


import AdMobMH from './src/Components/AdMobMH/AdMobMH';
import { AdmobJson } from './src/Components/AdMobMH/AdMobConst';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

const initialState = {articles:{isLoading : true}};
const store = configureStore(initialState);

import PushNotification from './src/Components/PushNotification/PushNotificationMH';


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      menu : menuItems.menu
    }
  }
  
  componentDidMount(){

 
   
   store.dispatch(categoryArticlesNew(menuItems.menu[0]));

    if (__DEV__) {
      firebase.config().enableDeveloperMode();
      }
    store.dispatch(getMenuItems(menuItems.menu));

      // Set default values
    firebase.config().setDefaults({
      menu : JSON.stringify(menuItems.menu)
    });
    // TODO: borrar el 0 del fetch para que solo actualice cada 12 horas y no siempre.
    firebase.config().fetch()
      .then(() => {
        console.log("activar fetch");
        return firebase.config().activateFetched();
      })
      .then((activated) => {
        if (!activated) console.log('Fetched data not activated');
        return firebase.config().getValue('menu');
      })
      .then((snapshot) => {
        const menuSend = JSON.parse(snapshot.val());
        store.dispatch(getMenuItems(menuSend));
        this.storeData(snapshot.val());
      })
      .catch((error) =>{
        
      });
  

    //store.dispatch(getAuthors());

//    this.retrieveData('menu');
  }


  
  storeData = async (menu) => {
    try {
      await AsyncStorage.setItem('menu', menu);
    } catch (error) {
     // alert(error);
      // Error saving data
    }
  }

  render() {
    
    return (
        <Provider store={store}>
          <View style={{flex:1}}>
          <PushNotification/>
          <RouterDefault/>
            <AdMobMH typeBanner={AdmobJson.SmartBanner.type} 
                      unitId={AdmobJson.SmartBanner.unitId}/>
          </View>
        </Provider>
    );
  }
}
