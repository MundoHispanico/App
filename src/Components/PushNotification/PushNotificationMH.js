import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

class PushNotificationMH extends Component {
  componentDidMount(){
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  channelManage = () =>{
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  .setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', "");
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }




async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
 
    this.showAlert(notification, false);
    });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    this.showAlert(notificationOpen.notification, true);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      this.showAlert(notificationOpen.notification , true);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}



showAlert(notification, opened) {
notification
  .android.setChannelId('test-channel')
  .android.setSmallIcon('ic_launcher');
  firebase.notifications().displayNotification(notification);

  if(opened){
    let slug =notification.data.articleSlug;
    let url = notification.data.articleUrl;
    Actions.ArticleRequest({
      typeView:2,
      slug: slug,
      urlToGo: url
    })
  }


}


  render() {
    return null;
  }
}

export default PushNotificationMH;




