import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Image, StyleSheet, View, ScrollView, Text} from 'react-native';
import Article from '../ArticlesWeb/ArticleWebView';
import Swiper from 'react-native-swiper';
import HandSwiper from '../../../assets/swiperIcons/Hand-Swipe.png';

import nextButtonIcon from '../../../assets/swiperIcons/Yellow-Swipe-Arrow-Right.png';
import prevButtonIcon from '../../../assets/swiperIcons/Yellow-Swipe-Arrow-Left.png';

const handShow  = (
<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 200, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={HandSwiper} style={{height:200, width:100}}/>
</View>)



class ArticlesSwipeContainerNewView extends Component {

  constructor(props){
    super(props)
    this.state = {
      articlesNew : <View></View>,
      index : 0
    }
  }
  componentDidMount(){
    let articlesSlugNew = this.filterWichArticlesShow(this.props.articlesList, this.props.categoryCode, this.props.tagCode);
    let index = 0;
    const article = this.props.article;
    let articlesNew = [];
    for(var i in articlesSlugNew){
      if(articlesSlugNew[i].id == article.id){
        index = i;
      }
      articlesNew.push(<Article key={i} article={articlesSlugNew[i]}/>);
    }
    this.setState({
      articlesNew : articlesNew,
      index : Number(index)
    })

  }

  filterWichArticlesShow = (articlesList, categoryCode, tagCode) => {
      let articlesSlugNew = [];
      if(categoryCode != undefined){
          for(var i in articlesList){
            if(articlesList[i].categories.indexOf(categoryCode) >= 0){
              articlesSlugNew.push(articlesList[i]);
            }
          }
      }else if(tagCode != undefined){
          for(var i in articlesList){
            if(articlesList[i].tags.indexOf(tagCode) >= 0){
              articlesSlugNew.push(articlesList[i]);
            }
          }
      }
    
      return articlesSlugNew;
    
    }
    
  nextButton = (
    <View>
      <Image source={nextButtonIcon} style={{height:30, width:30}}/>
    </View>
  );
  prevButton = (
    <View>
      <Image source={prevButtonIcon} style={{height:30, width:30}}/>
    </View>
  )

  render (){
    return (
      <View style={{flex:1}}>
      <Swiper style={styles.wrapper} 
              loadMinimal
              index={this.state.index} 
              showsButtons={true}
              showsPagination={false}
              nextButton={this.nextButton}
              prevButton={this.prevButton}
              buttonWrapperStyle={{backgroundColor: 'transparent', 
                                    flexDirection: 'row', position: 'absolute', 
                                    top: 80, left: 0, height:40, paddingHorizontal: 10, 
                                    paddingVertical: 10}}
              >
        {this.state.articlesNew}
      </Swiper>
     </View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    item : state.articles.item,
    page : state.articles.page,
    articlesList : state.articles.articlesList
    
  }
}

const ArticlesSwipeContainerNew = connect(
mapStateToProps,
)(ArticlesSwipeContainerNewView);

export default ArticlesSwipeContainerNew;


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
  },
  hand :{
    flex: 1, 
    position : "absolute", 
    justifyContent:"center", 
    alignItems:"center",
    backgroundColor:"red"
  }
});
