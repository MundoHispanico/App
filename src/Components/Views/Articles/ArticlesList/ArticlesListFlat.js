import React, {Component} from 'react';
import { connect } from 'react-redux'
import {StyleSheet, FlatList, View} from 'react-native';
import ArticlesListItemCard from '../ArticlesListItemCard';
import ArticlesListItemCardRed from '../ArticlesListItemCardRed';
import ArticlesListItemCardHorizontal from '../ArticlesListItemCardHorizontal';

import { resetLoading, categoryArticlesNew} from '../../../../data-store/actions/articles-actions';

import AdMobMH from '../../../AdMobMH/AdMobMH';
import { AdmobJson } from '../../../AdMobMH/AdMobConst';

import  LoadMorArticlesButom from '../../../Loading/LoadMorArticlesButom';

class ArticlesListFlatView extends Component {
 
  componentDidMount(){
    console.log("ArticlesList");
  }
  
  renderArticleList = (item, index) =>{
    let bigArticles = [4,8,12,16,24,28,32,36,44,48,52,56,64,68,72,76,84,88,92,96,100];
    let redArticles = [0,20,40,60];


    let banner = AdmobJson.AppHomePageContent;
    let bannerIndex = 0;

    // TODO: pendiente asignar el orden de los banners a mostrar
    if(this.props.typeView == "Category"){
      // esto para cambiar el tipo de banner que se muestra segun si estas en el home page
      // o si estas en una categoria.
      banner = AdmobJson.AppCategoryPage
    }


    if(bigArticles.includes(index)){
      return (
        <View>
          <ArticlesListItemCard  article={item}
           categoryCode={this.props.categoryCode} tagCode={this.props.tagCode} 
               />
          <AdMobMH typeBanner={AdmobJson.SmartBanner.type} unitId={banner[bannerIndex].unitId}/>
        </View>
    );
    }else if(redArticles.includes(index)){
      bannerIndex = 0;
      return (
        <View>
          <ArticlesListItemCardRed  article={item}
           categoryCode={this.props.categoryCode} tagCode={this.props.tagCode}
               />
          <AdMobMH typeBanner={AdmobJson.SmartBanner.type} unitId={banner[bannerIndex].unitId}/>
        </View>
        )
    }else{
      return <ArticlesListItemCardHorizontal
        article={item} 
        categoryCode={this.props.categoryCode} tagCode={this.props.tagCode}/>
    } 
  }

  loadMoreFunc = () => {
    //this.props.getArticlesByCategoryLoadMore(this.props.item, this.props.page+1);
    //alert("load");

    // lineas para el flatlist Scroll infinito
    //onEndReached = { this.loadMoreFunc }
    //onEndThreshold ={10}

  }
  render() {

      return (
        <View style={{flex:1}}>
          <FlatList style={{flex:1}}
          onScrollEndDrag={() => alert("end")}
          onScrollBeginDrag={() => alert("start")}
            data={this.props.articlesSlugNew}
            renderItem={({item, index}) =>
              this.renderArticleList(item, index)
            }
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<LoadMorArticlesButom ref={component => this.buttomLoad = component} text={"Cargar más articulos"} actualPage={false} />}
          />
        </View>
      )
}
}



const mapDispatchToProps = (dispatch) => {
  return {
      getArticlesByCategoryLoadMore : (item, page) => {
        //dispatch(resetLoading());
        dispatch(categoryArticlesNew(item, page))
      }
    }
  }

const mapStateToProps = (state) => {
  return {
    item : state.articles.item,
    page : state.articles.page,
  }
}

const ArticlesListFlat = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesListFlatView);

export default ArticlesListFlat;


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
