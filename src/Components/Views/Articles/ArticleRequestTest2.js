import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Animated, Image, FlatList, Button, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { initArticles, categoryArticles, article, resetArticle} from '../../../data-store/actions/articles-actions';
import { Container, Content, Spinner } from 'native-base';

import HeaderDefault from '../../Menu/HeaderDefault';
import ErrorPage from '../Error/ErrorPage';
import ArticlesSwipeContainer from './ArticlesSwipeContainer';
import Article from './Article';
import WebArticlesBrowser from '../WebBrowser/WebArticlesBrowser';

class ArticleRequestView extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : null,
      type : null,
      urlToGo : null,
      slug : null,
      article : null,
      articlesList : null
    }
  }

  setView = (params) => {
//    this.setState(params);
    console.log(params);
    this.renderComponent(params);
  }

  renderComponent = (params) =>{
    let content;
    if(params.type == 1){
       content = (<ArticlesSwipeContainer article={params.article} articlesList={params.articlesList} navigation={this.props.navigation} setView={this.setView} />)
    }else if(params.type == 2){
     this.props.getArticlesSpecific(params.slug);
     if(this.props.article == undefined || this.props.article == null){
       content = (
       <Container style={{flex:1, alignItems:"center"}}>
          <Spinner color='red' />
        </Container>
      )
     }else if(this.props.article.status == "ok" && this.props.article.post != undefined){
       content = (<ArticlesSwipeContainer article={this.props.article.post} articlesList={null} navigation={this.props.navigation}  setView={this.setView}/>)
     }else if(this.props.article.status == "error"){
       content = (<ErrorPage type={this.props.article.error} navigation={this.props.navigation}  setView={this.setView}/>)
     }
    }else if(params.type == 3){
     content = (<WebArticlesBrowser url={params.urlToGo} navigation={this.props.navigation}  setView={this.setView}/>)
    }
    this.setState({
      content : content,
    })

  }
  GetData = () =>{
    const type = this.props.navigation.getParam('type', '1');
    // type = 1, la peticion incluye la data del articulo y la lista de data de articulos.
    // type = 2, incluye el slug del articulo a buscar para pedirlo al servidor en caso que no esté en el store.
    // type = 3, es una peticion a un link externo, va al web browser y trae una url.
    const urlToGo = this.props.navigation.getParam('urlToGo', '');
    const slug = this.props.navigation.getParam('slug', 'NO-ID');
    const article = this.props.navigation.getParam('article', 'NO-ID');
    const articlesList = this.props.navigation.getParam('articlesList', 'NO-ID');
    return {
      type : type,
      urlToGo : urlToGo,
      slug : slug,
      article : article,
      articlesList : articlesList
    }
  }
  componentDidMount(){
    console.log(JSON.stringify(this.state));

    var data = this.GetData();
    this.renderComponent(data);
    
    console.log(JSON.stringify(data));
//    this.renderComponent();
    console.log(JSON.stringify(this.state));
 
  }

  render() {
    return (
      <Container style={{flex: 1}}>
        <HeaderDefault navigation={this.props.navigation} back={true}/>
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
