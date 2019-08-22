import React, {Component} from 'react';
import {StyleSheet,AsyncStorage,  Text, View, ScrollView, Animated, Image, FlatList, Button, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { article, resetLoadingArticle} from '../../../data-store/actions/articles-actions';
import { Container, Content, Spinner } from 'native-base';
 
import HeaderDefault from '../../Menu/HeaderDefault';
import ErrorPage from '../Error/ErrorPage';
import ArticlesSwipeContainerNew from '../Articles/ArticlesSwipeContainerNew';
import Article from '../ArticlesWeb/ArticleWebView';

import WebArticlesBrowserSinheader from '../WebBrowser/WebArticlesBrowserSinheader';
import ArticleWebBrowser from '../ArticlesWeb/ArticleWebBrowser';

import Swiper from 'react-native-swiper';
import HandSwiper from '../../../assets/swiperIcons/Hand-Swipe.png';

import nextButtonIcon from '../../../assets/swiperIcons/Yellow-Swipe-Arrow-Right.png';
import prevButtonIcon from '../../../assets/swiperIcons/Yellow-Swipe-Arrow-Left.png';

class ArticleRequestView extends Component {
  constructor(props){
    super(props)
    this.state = {
      typeView : this.props.typeView,
      articleSend : this.props.articleSend,
      articlesListSend : this.props.articlesListSend,
      urlToGo : this.props.urlToGo,
      slug : this.props.slug,
      content : null,
      articlesNew : <View></View>,
      index : 0
    }
  }

  componentDidMount(){
    this.defineRender(this.props);
//  this._retrieveData();
  }

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('test');
  //     if (value !== null) {
  //       // We have data!!
  //       var resp = JSON.parse(value);
  //       alert(resp.test);
  //     }
  //    } catch (error) {
  //      // Error retrieving data
  //    }
  // }

  defineRender = (params) =>{
    // console.log(params.typeView);
    // console.log("working"); 
    // type = 1, la peticion incluye la data del articulo y la lista de data de articulos.
    // type = 2, incluye el slug del articulo a buscar para pedirlo al servidor en caso que no esté en el store.
    // type = 3, es una peticion a un link externo, va al web browser y trae una url.

    if(params.typeView == 2){
      this.props.getArticlesSpecific(params.slug);
    }
    this.setState({
      typeView : params.typeView,
    })


  }

  
 
  render() {

    let content;
    if(this.state.typeView == 1){
      console.warn("~~~~111~~~~~"+this.state.typeView,this.props.articleSend,this.props.categoryCode,this.props.tagCode,this.props.articlesListSend,this.props.authorList)
      content = (<ArticlesSwipeContainerNew article={this.props.articleSend} categoryCode={this.props.categoryCode} tagCode={this.props.tagCode} articlesList={this.props.articlesListSend} authorList={this.props.authorList} />)
      //content = (<Article article={this.props.articleSend} authorList={this.props.authorList}/>)
    }else if(this.state.typeView == 2){
      if(this.props.isLoadingArticle){

        content = (
          <Container style={{alignItems:"center"}}>
            <Spinner color='red' />
          </Container>
        )
      }else{
        
        if(this.props.statusArticle == "ok" && this.props.article != undefined){
          console.log("~~~~2222~~~~~"+this.props.article+this.props.authorList)
         // content = (<ArticlesSwipeContainerNew article={this.props.articleSend} categoryCode={this.props.categoryCode} tagCode={this.props.tagCode} articlesList={this.props.articlesListSend} authorList={this.props.authorList} />)
          content = (<Article article={this.props.article} authorList={this.props.authorList}/>)
        }else if(this.props.statusArticle == "notFound" || this.props.article == null){
          console.log("~~~~333~~~~~"+this.state.urlToGo)
          content = (<WebArticlesBrowserSinheader urlToGo={this.state.urlToGo}/>)
        }else if(this.props.statusArticle == "error"){
          console.warn("~~~~444~~~~~")
          content = (<ErrorPage type={this.props.errorRequestArticle} />)
        }
      }
    }else if(this.state.typeView == 3){
      //alert("tipo 3")
//      content = (<ArticleWebBrowser amp={false} url={this.state.urlToGo}/>)
      console.warn("~~~~555~~~~~")
      content = (<View style={{flex: 1, backgroundColor:"red"}} ><Text>aaa</Text></View>)
    }

    return (
      <Container style={{flex: 1}}>
        <HeaderDefault back={true} share={false}/>
        {content}
      </Container>
    );
  }
}
 
 
const mapDispatchToProps = (dispatch) => {
  return {
    getArticlesSpecific : (slug) => {
        dispatch(resetLoadingArticle())
        dispatch(article(slug))
      }
    }
  }
 
const mapStateToProps = (state) => {
  return {
    article : state.articles.article,
    articlesList : state.articles.articlesList,
    statusArticle : state.articles.statusArticle,
    errorRequestArticle : state.articles.errorRequestArticle,
    isLoadingArticle : state.articles.isLoadingArticle,
    slugArticle : state.articles.slugArticle,
    authorList : state.articles.authorList,
  }
}
 
const ArticleRequest = connect(
mapStateToProps,
mapDispatchToProps
)(ArticleRequestView);
 
export default ArticleRequest;
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});