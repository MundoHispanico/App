import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import { AdmobJson } from '../AdMobMH/AdMobConst';

class InterstitialMH extends Component {

  componentDidMount(){
    const advert = firebase.admob().interstitial(AdmobJson.AppInterstitial.unitId);

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    //request.addKeyword('foo').addKeyword('bar');

    // Load the advert with our AdRequest
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
      console.log('Advert ready to show.');
    });

    // Simulate the interstitial being shown "sometime" later during the apps lifecycle
    setTimeout(() => {
      if (advert.isLoaded()) {
        advert.show();
      } else {
        // Unable to show interstitial - not loaded yet.
      }
    }, 1000);
  }
  render() {
    return null
  }
}

export default InterstitialMH;