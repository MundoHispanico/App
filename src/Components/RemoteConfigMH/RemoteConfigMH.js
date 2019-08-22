import React, {Component} from 'react';

import firebase from 'react-native-firebase';

export default class RemoteConfigMH extends Component {
  componentDidMount(){
    if (__DEV__) {
//      firebase.config().enableDeveloperMode();
    }
    console.log("remote config montado");
    
    // Set default values
    firebase.config().setDefaults({
      hasExperimentalFeature: false,
    });

    firebase.config().fetch()
        .then(() => {
            console.log("activar fetch");
            return firebase.config().activateFetched();
        })
        .then((activated) => {
            if (!activated) console.log('Fetched data not activated');
            return firebase.config().getValue('hasExperimentalFeature');
        })
        .then((snapshot) => {
            const hasExperimentalFeature = snapshot.val();

            if(hasExperimentalFeature) {
                alert("Habilitado remote config");
            }

            // continue booting app
        })
        .catch((error) =>{
            alert(error);

        });
    
  }
  render() {
    return null;
  }
}

