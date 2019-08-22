import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


const ArticlesListItem = ({article}) => {

  if(article.attachments[0] == undefined){
    return (
    <View style={styles.list}>
      <Text style={styles.item}>{article.title}</Text>
    </View>
    )
  }else{
    return (
      <View style={styles.list}>
        <Image
            style={{width: 80, height: 80}}
            source={{uri: article.attachments[0].url}}
          />
        <Text style={styles.item}>{article.title}</Text>
      </View>
      )
  }

}

export default ArticlesListItem;


const styles = StyleSheet.create({
  list :{
    flex:1,
    flexDirection: 'row',
    padding : 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1, 
    paddingTop:22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
