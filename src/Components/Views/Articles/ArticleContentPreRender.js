import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { urlMundoHispanicoJson } from '../../../localData/urlMundoHispanico';

class ArticleContentPreRender extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : null
    }
  }
  componentDidMount(){
    this.setState({
      content : this.props.content
    })
  }
    goToLink = (urlToGo) => {
      console.log("go to link");
      if(urlToGo.contains(urlMundoHispanicoJson)){
        alert(urlToGo);
        var removeUrl = urlToGo.split(urlMundoHispanicoJson);
        alert(JSON.stringify(removeUrl));
        var slugs = removeUrl[0].split("/");
        alert(JSON.stringify(slugs));
        var slug = slugs[slugs.length-1];
        alert(slug);
        Actions.ArticleRequest({
          typeView:2,
          slug: slug        
        })
        
      }else{
        Actions.WebArticlesBrowser({
          urlToGo: urlToGo        
        })
      }
  }


  render(){
    return <View>{this.state.content}</View>
  }
}

export default ArticleContentPreRender;



var styles = StyleSheet.create({
  a: {
    fontSize:23,
    fontWeight: '300',
    color: 'grey',
  },
  p: {
    fontSize:20,
    fontWeight: '300',
    color: '#000000',
  },
  blockquote: {
    fontSize:25,
    fontWeight: '500',
    color: '#000000',
    padding:20,
    borderLeftWidth: 15,
    borderColor: '#C52D27'
  },
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
    fontSize : 40
  },
  author : {
    fontSize : 15
  }
})
