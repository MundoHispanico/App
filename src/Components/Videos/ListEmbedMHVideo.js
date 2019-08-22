import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const ListEmbedMHVideo = ({jsonVideo}) => {

  const createURL = (id, video) => {
    return `https://mundohispanico.com/brid/brid.php?id=${jsonVideo.id}&video=${jsonVideo.video}&partner_id=11583`;
 }

let url = createURL(jsonVideo);
console.warn("ListEmbedMHVideo");
return (
      <View style={styles.list}>
      <WebView style={styles.webView}
        javaScriptEnabled={true}
        scalesPageToFit={false}
        source={{uri: url}}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        
        />
      </View>)
}

export default ListEmbedMHVideo;

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  list :{
    height:9 * width / 16,
    width:width
  },
  webView :{
    backgroundColor : 'transparent'
  }
});
