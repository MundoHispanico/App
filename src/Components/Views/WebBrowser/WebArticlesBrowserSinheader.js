import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import { Container } from 'native-base';

import WebBrowser from './WebBrowser';

const WebArticlesBrowserSinheader =({urlToGo}) => {
        return (
              <Container style={styles.cont}>
                    <WebBrowser url={urlToGo}/>
                </Container>
            )

}

export default WebArticlesBrowserSinheader;

const styles = StyleSheet.create({
    cont : {
      flex:1
    }
  });
