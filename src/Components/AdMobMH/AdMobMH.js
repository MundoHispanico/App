import React, {Component} from 'react';
import {View} from 'react-native';

import firebase from 'react-native-firebase';


const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

//request.addTestDevice();

//request.addKeyword('foobar');
//request.setGender("male");

const AdMobMH = ({typeBanner, unitId}) => {
    return (<View style={{justifyContent:"center", alignItems:"center"}}>
        <Banner
              size={typeBanner}
              unitId={unitId}
              request={request.build()}
              onAdFailedToLoad={(err) => {
                console.log('Error add' + err);
              }}
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
            />
            </View>
    );
}

export default AdMobMH;
