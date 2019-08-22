import React, {Component} from 'react';
import { connect } from 'react-redux'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Button } from 'native-base';
import { resetLoading, categoryArticlesNew} from '../../data-store/actions/articles-actions';

import VerMasAqui from '../../assets/boton/Ver-Mas-Aqui.png';

class LoadMorArticlesButomView extends Component {
  render() {
    let actualPage = this.props.page;
    let page = (this.props.actualPage) ? actualPage : actualPage + 1;
    let item = this.props.item;
    if(this.props.itemSet != undefined){
      item = this.props.itemSet;
    }
    let finalView;
    if(this.props.image){
      finalView = (  
        <TouchableOpacity onPress={() => this.props.getArticlesByCategoryLoadMore(item, page)}>
          <View style={styles.verMas}>
            <Image source={VerMasAqui}/>
          </View>
        </TouchableOpacity>)

    }else{
      finalView = (  
        <TouchableOpacity onPress={() => this.props.getArticlesByCategoryLoadMore(item, page)}>
          <View style={styles.boton}>
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>)
    }
    return (
        <View style={{flex:1}}>
          {finalView}
        </View>
      )
    }
  }

  const loadMoreView = () => {
    return this.props.getArticlesByCategoryLoadMore(this.props.item, this.props.page)
  }

const mapDispatchToProps = (dispatch) => {
  return {
      getArticlesByCategoryLoadMore : (item, page) => {
        dispatch(resetLoading());
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

const LoadMorArticlesButom = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadMorArticlesButomView);

export const loadMore = connect(
  mapStateToProps,
  mapDispatchToProps
)(loadMoreView);

export default LoadMorArticlesButom;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text :{
    color:'#fff',
    textAlign:'center',
    fontSize: 20,

    },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  verMas:{
    justifyContent:"center",
    alignItems: 'center',
    marginBottom:40,


  },
  boton: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    marginBottom:40,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'red',
    borderRadius:100,
    borderWidth: 1
  }
});