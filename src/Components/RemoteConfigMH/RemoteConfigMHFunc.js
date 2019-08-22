import firebase from 'react-native-firebase';
import { menuItems} from '../../localData/menu-items';

export const RemoteConfigFunc = () => {

    if (__DEV__) {
        firebase.config().enableDeveloperMode();
    }
    console.log("remote config montado");
    
    // Set default values
    firebase.config().setDefaults({
        hasExperimentalFeature: false,
        menu : JSON.stringify(menuItems.menu)
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
            alert(JSON.stringify(hasExperimentalFeature));

            if(hasExperimentalFeature) {
                alert("Habilitado remote config");
            }

            // continue booting app
        })
        .catch((error) =>{
            alert(error);

        });
}

export const RemoteConfigFuncMenu = () => {

    if (__DEV__) {
        firebase.config().enableDeveloperMode();
    }
    console.log("remote config montado");
    
    // Set default values
    firebase.config().setDefaults({
        hasExperimentalFeature: false,
        menu : JSON.stringify(menuItems.menu)
    });

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
            const menu = snapshot.val();
            alert(JSON.stringify(menu));
        })
        .catch((error) =>{
            alert(error);

        });
}
