import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es');
import { Actions } from 'react-native-router-flux';

import HTMLView from 'react-native-htmlview';
import ImagePreprocessor from '../../ImagePreprocessor/ImagePreprocessor'


const ArticlesListItemCard = ({article, categoryCode, tagCode}) => {
  let ArticleImage;
 
    if(article.featured_image != undefined){
      ArticleImage = (
      <CardItem cardBody>
        <View style={{height: 200, width: null, flex: 1}}>
          <ImagePreprocessor url={article.featured_image}/>
        </View>
      </CardItem>)

    }else{

    }

    const formattedDate = moment(article.date + " -0500","yyyy-MM-DD'T'hh:mm:ss Z").fromNow();
    let title = article.title.rendered.replace(/(&#8220;)|(&#8221;)|(&#8216;)|(&#8217;)|(&#8230;)/g, '"');
    title = title.replace(/(&#8211;)/g, '-');

    return (
      <Container style={{height:"auto"}}>
      <TouchableOpacity onPress={() => Actions.ArticleRequest({
            typeView : 1,
            articleSend: article,
            categoryCode:categoryCode,
            tagCode:tagCode})}>
        <Content>
          <Card>
            {ArticleImage}
            <CardItem>
              <Left>
                <Body>
                    <Text style={styles.title}>{title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>{formattedDate}</Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
        </TouchableOpacity>
      </Container>
      )
 
}

export default ArticlesListItemCard;


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
    fontSize : 23,
    
  }
});
