import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Transformation} from 'react-native';
import { Container, Header, Content, Card, Text,Left, Body, Right} from 'native-base';
import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es');
import { Actions } from 'react-native-router-flux';
import ImagePreprocessor from '../../ImagePreprocessor/ImagePreprocessor'
import HTMLView from 'react-native-htmlview';

const ArticlesListItemCardHorizontal = ({article, categoryCode, tagCode}) => {
  let ArticleImage;
 

  if(article == undefined){
    return (
      <Container style={styles.Cont}>
        <Content>
          <Card style={styles.CardFlex}>
              <Left style={{flex:1}}>
                <View style={{height: 90, width: 90, flex: 1, backgroundColor:"#FFDFDF"}}>
                </View>
              </Left>
              <Body style={{ flex:2}}>
                  <View style={{height: 20, width: 200, backgroundColor:"#FFDFDF", padding:10}}></View>
              </Body>
          </Card>
        </Content>
      </Container>)
  }else{
    if(article.featured_image != undefined){
      ArticleImage = (
        <Left style={{flex:1}}>
        <View style={{height: 100, width: 100}}>
          <ImagePreprocessor url={article.featured_image}/>
          </View>
        </Left>)

    }

    const formattedDate = moment(article.date + " -0500","yyyy-MM-DD'T'hh:mm:ss Z").fromNow();
    let title = article.title.rendered.replace(/(&#8220;)|(&#8221;)|(&#8216;)|(&#8217;)|(&#8230;)/g, '"');
    title = title.replace(/(&#8211;)/g, '-');

    return (
      <Container style={styles.Cont}>
      <TouchableOpacity onPress={() => Actions.ArticleRequest({
            typeView : 1,
            articleSend: article,
            categoryCode:categoryCode,
            tagCode:tagCode})}>
        <Content>
          <Card style={styles.CardFlex}>
              {ArticleImage}
              <Body style={{ flex:2}}>
                  <Text style={styles.title}>{title}</Text>
                  <Text>{formattedDate}</Text>
              </Body>
          </Card>
        </Content>
        </TouchableOpacity>
      </Container>
    )
  }

}

export default ArticlesListItemCardHorizontal;


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
    fontSize : 18,
    
  },
  colText :{
    height: 100,
    width: "auto",
    padding :5
  },
  colImgage:{
    height: 100,
    width: "auto"
  },
  Cont:{
    height:"auto"
  },
  CardFlex : {
    flex:3,
    flexDirection: 'row'
  }
});
