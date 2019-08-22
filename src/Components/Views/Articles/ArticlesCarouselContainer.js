import React, { Component } from 'react';
import HeaderDefault from '../../Menu/HeaderDefault';
import { Container} from 'native-base';

import Article from './Article';

import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';
 
const { width, height } = Dimensions.get('window');
 
export default class ArticlesCarouselContainer extends Component {
 
  constructor(props) {
    super(props);
 
    this.state = {
      size: { width, height },
    };
  }
 

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }
 
  render() {
    const article = this.props.article;

    const articlesList = this.props.articlesList;
    let articlesNew = [];
    articlesNew.push(article);
    for(var i in articlesList){
      if(articlesList[i].id != article.id){
        articlesNew.push(articlesList[i]);
      }
    }

    let articlesView = [];

    articlesNew.map((value)=>{
      articlesView.push(<Article article={value}/>);
    })
  
  
    return (
      <Container style={{height:"auto"}}>
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        <Carousel
          style={this.state.size}
          onAnimateNextPage={(p) => console.log(p)}
        >
          {articlesView}
        </Carousel>
      </View>
     </Container>
  
    );
  }
}
