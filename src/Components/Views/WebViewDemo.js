import React, {Component} from 'react';
import {View, WebView, StyleSheet} from 'react-native';

class WebViewDemo extends Component {

    static navigationOptions = {
        title: 'Web View demo',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    
      };
  render() {
    return (
    <View style={styles.container}>
        <WebView
            source={{ html: '<h1>Hello world</h1><p>aaaa</p>' }}
            style={{marginTop: 5}}
        />
        <WebView
            source={{uri: 'https://mundohispanico.com/dinero/a-cuanto-esta-el-cambio-del-dolar-al-peso-hoy-20-de-octubre-y-por-que/amp'}}
            style={{marginTop: 5}}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
       height: '100%',
    }
 })


export default WebViewDemo;
