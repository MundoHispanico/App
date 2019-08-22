import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';


const ArticleEmbebInstagram = ({url}) => {

const createURL = (embed) => {
  let JSONp1 = embed.split('data-instgrm-permalink="');
  let JSONSINLLAVE = JSONp1[1].split('"');
  var json = JSONSINLLAVE[0]
  return JSONSINLLAVE[0];
}

//let url = createURL(embed);


return (
      <View style={styles.list}>
      <WebView style={styles.webView}
        javaScriptEnabled={true}
        scalesPageToFit={false}
        source={{uri: url}}
        />
      </View>)
}

export default ArticleEmbebInstagram;


const styles = StyleSheet.create({
  list :{
    height:420,
    width:320
  },
  webView :{ 
    backgroundColor : 'transparent'
  }
});
