import React, {Component} from 'react';
import {StyleSheet, Platform, Share, TouchableOpacity, Image, View} from 'react-native';
import { Container, Fab } from 'native-base';
import ShareIMG from '../../../assets/Icons/baseline_share_white_36dp.png'







import ArticleWebBrowser from './ArticleWebBrowser';

class ArticleWebView extends Component {

 constructor(props){
    super(props)
    this.state = {
      articlesNew : <View></View>,
      index : 0
    }
  }
  componentDidMount(){
    

  }

 


  shareArticle = (url, message) => {
    Share.share({
      ...Platform.select({
        ios: {
          message: message,
          url: url,
        },
        android: {
          message: message + ' \n' + url
        }
      }),
      title: "Mundo Hispánico"
    }, {
      // Android only:
      dialogTitle: 'Mundo Hispánico',
      // iOS only:
    })
  }


  

 

  render(){
    console.log("~~~~111~~~~~"+this.props.article.link)

    let title = this.props.article.title.rendered.replace(/(&#8220;)|(&#8221;)|(&#8216;)|(&#8217;)|(&#8230;)/g, '"');
    title = title.replace(/(&#8211;)/g, '-');

    return (
      <Container>
     
        <ArticleWebBrowser url={this.props.article.link} amp={true}/>
      
          <Fab
              active={true}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#C52D27'}}
              position="bottomRight"
              onPress={() => this.shareArticle(this.props.article.link, title)}
              >
              <View>
                <Image source={ShareIMG} style={{height:30, width:30}}/>
              </View>
            </Fab>
         
      </Container>

    )
  }
}

export default ArticleWebView;

var styles = StyleSheet.create({
  a: {
    fontSize:23,
    fontWeight: '300',
    color: 'grey',
  }
})
