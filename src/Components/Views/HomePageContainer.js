import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Animated, Image, FlatList, Button, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { initArticles, categoryArticles } from '../../data-store/actions/articles-actions';
import { Container, Spinner } from 'native-base';

import ArticlesList from './Articles/ArticlesList';
import HeaderDefault from '../Menu/HeaderDefault';
import ErrorPage from './Error/ErrorPage';


class HomePageView extends Component {

  componentDidMount(){
    if(this.props.slug == undefined || this.props.slug == null){
      this.props.getArticles();
    }else{
      this.props.getArticlesByCategory(this.props.slug);
    }
    console.log("Home Page");
  }
  render() {
    let content;
    if(this.props.isLoading){
      console.log("cargando");
      content = (
          <Container style={{flex:1, alignItems:"center"}}>
            <Spinner color='red' />
          </Container>
      )
    }else if(this.props.articlesList.status == "ok" && this.props.articlesList.posts != undefined){
      console.log("mostrar lista");
      content = (<ArticlesList articlesList={this.props.articlesList.posts} navigation={this.props.navigation}/>)
    }else if(this.props.articles.status == "error"){
      content = (<ErrorPage type={this.props.articlesList.error} navigation={this.props.navigation}/>)
    }

    return (
      <Container style={{flex: 1}}>
        <ScrollView style={styles.container}>
            {content}
        </ScrollView>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      getArticles : () => {
          dispatch(initArticles())
      },
      getArticlesByCategory : (slug) => {
        dispatch(categoryArticles(slug))
      }
    }
  }

const mapStateToProps = (state) => {
  return {
    articlesList : state.articles.articlesList,
    isLoading : state.articles.isLoading
  }
}

const HomePage = connect(
mapStateToProps,
mapDispatchToProps
)(HomePageView);

export default HomePage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
