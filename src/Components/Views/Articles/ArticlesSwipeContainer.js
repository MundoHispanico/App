import React, {Component} from 'react';
import {Image, StyleSheet, View, ScrollView} from 'react-native';
import { Container, DeckSwiper, Content, Text} from 'native-base';
import Article from './Article';

const ArticlesSwipeContainer = ({article, articlesList}) => {

  let articlesNew = [];
  articlesNew.push(article);
  for(var i in articlesList){
    if(articlesList[i].id != article.id){
      articlesNew.push(articlesList[i]);
    }
  }
  console.log("swiper");
  return (
    <Container style={{flex:1}}>
      <DeckSwiper
            dataSource={articlesNew}
            renderItem={item =>
                <Article article={item}/>
            }
          />
   </Container>
    )

}

export default ArticlesSwipeContainer;


const styles = StyleSheet.create({
  list :{
    flex:1,
    padding : 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title : {
    fontSize : 24
  }
});
