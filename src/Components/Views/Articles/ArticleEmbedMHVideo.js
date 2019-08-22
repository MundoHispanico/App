import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';


const ArticleEmbedMHVideo = ({embed}) => {

  const text1 = "<h1>Prueba</h1>"
  const text = `<html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head>
  <meta charset="utf-8">
  <title></title>
<script type="text/javascript" src="//services.brid.tv/player/build/brid.min.js"></script><script src="https://services.brid.tv/player/build/plugins/adunit.js" async="" class="bridload" charset="utf-8"></script>
</head>
<body>
<div class="brid-wrapper"><iframe src="https://mundohispanico.com/brid/brid.php?id=14404&amp;video=305393&amp;partner_id=11583"  width="320" height="300" frameborder="0"></iframe></div>
</body></html>`;

{/* <WebView style={styles.webView}
originWhitelist={['*']}
 javaScriptEnabled={true} //enabling JavaScript
 source={{uri: 'https://mundohispanico.staging.wpengine.com/bridtest.html'}}
 /> */}

  const createURL = (embed) => {
    let JSONp1 = embed.split("{");
    let JSONSINLLAVE = JSONp1[1].split("}");
    var json = JSON.parse("{"+JSONSINLLAVE[0]+"}")
    return `https://mundohispanico.com/brid/brid.php?id=${json.id}&video=${json.video}&partner_id=11583`;
 }

let url = createURL(embed);

return (
      <View style={styles.list}>
      <WebView style={styles.webView}
      allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}  
        stopLoading={true}
        javaScriptEnabled={true}
        scalesPageToFit={false}
        source={{uri: url}}
        />
      </View>)
}

export default ArticleEmbedMHVideo;


const styles = StyleSheet.create({
  list :{
    // height:320,
    width:320
  },
  webView :{ 
    backgroundColor : 'transparent'
  }
});
