import React, {Component} from 'react';
import {Dimensions, View,ActivityIndicator,StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';


const WebBrowser =({url}) => {
        let {width, height} = Dimensions.get('window');
        return (
                   <WebView
                        source={{uri: url}}
                        javaScriptEnabled={true}
                        startInLoadingState={true}
                        style={{backgroundColor:"transparent"}}
                        
                        />
                
            )

 
}

export default WebBrowser;


