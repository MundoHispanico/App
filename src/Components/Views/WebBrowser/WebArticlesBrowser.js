import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container } from 'native-base';

import AdMobMH from '../../AdMobMH/AdMobMH';
import { AdmobJson } from '../../AdMobMH/AdMobConst';

import HeaderDefault from '../../Menu/HeaderDefault';
import WebBrowser from './WebBrowser';

const WebArticlesBrowser =({urlToGo}) => {
        let banner = AdmobJson.SmartBanner;
        const publicidad = <AdMobMH
                                typeBanner={banner.type}
                                unitId={banner.unitId}
                                />;

        return (
              <Container style={styles.cont}>
                <HeaderDefault back={true}/>
                    {publicidad}
                    <WebBrowser url={urlToGo}/>
                </Container>
            )

}

export default WebArticlesBrowser;

const styles = StyleSheet.create({
    cont : {
      flex:1
    }
  });
