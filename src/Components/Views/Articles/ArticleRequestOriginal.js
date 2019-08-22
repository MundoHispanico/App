import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Animated, Image, FlatList, Button, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { initArticles, categoryArticles, article, resetArticle} from '../../../data-store/actions/articles-actions';
import { Container, Content, Spinner } from 'native-base';
 
import HeaderDefault from '../../Menu/HeaderDefault';
import ErrorPage from '../Error/ErrorPage';
import ArticlesSwipeContainer from './ArticlesSwipeContainer';
import Article from './Article';
 
class ArticleRequestView extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : null,
    }
  }

  componentDidMount(){
  
    var params = this.getParams()
    this.defineRender(params);
  
  }

  
  getParams = () => {
    const type = this.props.navigation.getParam('type', '1');
    const article = this.props.navigation.getParam('article', 'NO-ID');
    const articlesList = this.props.navigation.getParam('articlesList', 'NO-ID');
    const slug = this.props.navigation.getParam('slug', 'NO-ID');
    const urlToGo = this.props.navigation.getParam('urlToGo', '');

    return {
      type : type,
      article : article,
      articlesList : articlesList,
      slug : slug,
      urlToGo : urlToGo
    };
  }
  defineRender = (params) =>{
    // type = 1, la peticion incluye la data del articulo y la lista de data de articulos.
    // type = 2, incluye el slug del articulo a buscar para pedirlo al servidor en caso que no esté en el store.
    // type = 3, es una peticion a un link externo, va al web browser y trae una url.

    let content;
    if(params.type == 1){
      content = (<ArticlesSwipeContainer article={params.article} articlesList={params.articlesList} navigation={this.props.navigation} />)
    }else if(params.type == 2){
        this.props.getArticlesSpecific(params.slug);
        if(this.props.article == undefined || this.props.article == null){
          content = (
            <Container style={{flex:1, alignItems:"center"}}>
              <Spinner color='red' />
            </Container>
          )
        }else if(this.props.article.status == "ok" && this.props.article.post != undefined){
          content = (<ArticlesSwipeContainer article={this.props.article.post} articlesList={null} navigation={this.props.navigation}/>)
        }else if(this.props.article.status == "error"){
          content = (<ErrorPage type={this.props.article.error} navigation={this.props.navigation}/>)
        }
    }

    this.setState(
      {content : content}
    )

  }



  render() {
    return (
      <Container style={{flex: 1}}>
        <HeaderDefault navigation={this.props.navigation} back={false}/>
            {this.state.content}
      </Container>
    );
  }
}
 
 
const mapDispatchToProps = (dispatch) => {
  return {
    getArticlesSpecific : (slug) => {
        dispatch(article(slug))
      }
    }
  }
 
const mapStateToProps = (state) => {
  return {
    article : state.articles.article,
    isLoading : state.articles.isLoadingArticle,
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