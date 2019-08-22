import React, {Component} from 'react';
import { connect } from 'react-redux'
import {StyleSheet, View} from 'react-native';
import LoadMorArticlesButom from '../../../Loading/LoadMorArticlesButom';

import ArticlesListFlat from './ArticlesListFlat';
import ArticlesListCustom from './ArticlesListCustom';

import { Actions } from 'react-native-router-flux';

class ArticlesListView extends Component {
 
  componentDidMount(){
    console.log("ArticlesList");
  }
  

  filterWichArticlesShow = (articlesList, categoryCode, tagCode) => {

    let articlesSlugNew = [];
    if(categoryCode != undefined){
        for(var i in articlesList){
          if(articlesList[i].categories.indexOf(categoryCode) >= 0){
            console.log(JSON.stringify(articlesList[i].categories));
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
  render() {

    if(this.props.articlesList != undefined){
      let articlesSlugNew = this.filterWichArticlesShow(this.props.articlesList, this.props.categoryCode, this.props.tagCode);

      if(this.props.item.customView !== undefined){
        return <ArticlesListCustom articlesSlugNew={articlesSlugNew}
        categoryCode={this.props.categoryCode} tagCode={this.props.tagCode}/>
      }

      return <ArticlesListFlat articlesSlugNew={articlesSlugNew}
              categoryCode={this.props.categoryCode} tagCode={this.props.tagCode}/>
    }else {
      return <LoadMorArticlesButom text={"Cargar de nuevo"} actualPage={true}/>

    }
  }
}

const mapStateToProps = (state) => {
  return {
    item : state.articles.item,
    page : state.articles.page,
    articlesList : state.articles.articlesList
    
  }
}

const ArticlesList = connect(
mapStateToProps,
)(ArticlesListView);


export default ArticlesList;
