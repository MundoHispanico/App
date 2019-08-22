import React, {Component} from 'react';
import { connect } from 'react-redux'

import {Image, StyleSheet, View, ScrollView, Platform, Share, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab } from 'native-base';

import ArticleContent from './ArticleContent';
import ArticleExcerpt from './ArticleExcerpt';

import AdMobMH from '../../AdMobMH/AdMobMH';
import { AdmobJson } from '../../AdMobMH/AdMobConst';

import Taboola from '../../Taboola/Taboola';

import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

class ArticleView extends Component {
  constructor(props){
    super(props)
    this.state = {
      excerpt : null,
      content : null
    }
  }
  componentDidMount(){
    let excerpt = <ArticleExcerpt content={this.props.article.excerpt.rendered}/>
    let content = <ArticleContent content={this.props.article.content.rendered}/>
    this.setState({
      excerpt : excerpt,
      content : content
    })

  }

  componentWillUnmount(){
    // this.setState({
    //   content : null
    // })

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

  getAuthorName = (authorId, authorList) => {
    //alert(authorId);
    let authors = authorList.authors;
    let authorName;
    for(var i in authors){
      if(authors[i].id == authorId){
        authorName = authors[i].name
      }
    }
    
    return authorName;
  }
  render(){

    const formattedDate = moment(this.props.article.date + " -0500","yyyy-MM-DD'T'hh:mm:ss Z")
    .format('LLL');

    let title = this.props.article.title.rendered.replace(/(&#8220;)|(&#8221;)|(&#8216;)|(&#8217;)|(&#8230;)/g, '"');
    title = title.replace(/(&#8211;)/g, '-');

    let ArticleImage;
    if(this.props.article.featured_image){
      ArticleImage = (
          <CardItem cardBody>
            <Image source={{uri: this.props.article.featured_image}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>)
    }

    let banner = AdmobJson.AppArticlePage;
    let bannerIndex = 0;

    // TODO: autor se esta mostrando el codigo y no el nombre, ver como obtenerlo, bajarlos y mostrarlo
    return (
      <Container>
      <ScrollView>
        <Content>
          <Card>
            {ArticleImage}
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.title}>{title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
                <Body>
                  <Text style={styles.author}>By {this.getAuthorName(this.props.article.author, this.props.authorList )}</Text>
                  <Text style={styles.author}>{formattedDate}</Text>
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                  {this.state.excerpt}
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                  <AdMobMH 
                  unitId={banner[bannerIndex].unitId}
                    />
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                  {this.state.content}
                </Body>
            </CardItem>

          </Card>
        </Content>
        {/* <Taboola appPageId={this.props.article.id} 
                    urlPageWeb={this.props.article.link} 
                    advertisingId={this.props.IDFA}/> */}
        </ScrollView>
        <Fab
            active={true}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#C52D27' }}
            position="bottomRight"
            onPress={() => this.shareArticle(this.props.article.link, title)}
            >
            <Icon name="share" />
          </Fab>
      </Container>
  )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    }
  }

const mapStateToProps = (state) => {
  return {
    IDFA : state.articles.IDFA
    
  }
}

const Article = connect(
mapStateToProps,
mapDispatchToProps
)(ArticleView);

export default Article;

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
    fontSize : 32
  },
  author : {
    fontSize : 15
  }
})
