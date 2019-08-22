import React, {Component} from 'react';
import {StyleSheet, FlatList, View, Image, Text, Dimensions} from 'react-native';

import AdMobMH from '../../../AdMobMH/AdMobMH';
import { AdmobJson } from '../../../AdMobMH/AdMobConst';


var {height, width} = Dimensions.get('window');

const ArticlesListHeaderCategory = ({imageHeader, index})=> {
  let banner = AdmobJson.AppHomePageContent;
  let bannerIndex = 0;

      return (
        <View>
          <Image source={{uri:imageHeader}} style={{height:width/9, width:width}}/>
          <AdMobMH typeBanner={AdmobJson.SmartBanner.type} unitId={banner[bannerIndex].unitId}/>
        </View>
      )
}

export default ArticlesListHeaderCategory;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list :{
    flex:1,
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
