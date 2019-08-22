import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import HTMLView from 'react-native-htmlview';

class ArticleExcerpt extends Component {
  constructor(props){
    super(props)
    this.state = {
      excerpt : null
    }
  }
  componentDidMount(){
    let Html = this.filtrarHtml0(this.props.content);
    this.setState({
      excerpt : Html
    })
 
  }
  filtrarHtml0 = (content) => {
    // separo por parrafos y renderizo con HTMLS view cada uno
  let newContent = content.replace(/(<p><\/p>)|(\n)/g, "");
  //newContent = newContent.split(/(<\/p>)/g);

  let contentFinal = (<HTMLView 
                          value={newContent}
                          stylesheet={styles}
                          onLinkPress={(urlToGo) => this.goToLink(urlToGo)}
                          renderNode={this.renderNode}
                          />)

  return contentFinal;
  
  }


  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'iframe') {
      return null;
      /*
      alert("iframe entro");
      const a = node.attribs;
      const iframeHtml = `<iframe src="${a.src}"></iframe>`;
      return (
        <View key={index} style={{width: Number(a.width), height: Number(a.height)}}>
          <WebView source={{html: iframeHtml}} />
        </View>
      );
      */
    }
   // else if (node.name == 'script') {
     // return null;
    //}
  }

  render(){
    return <View>
              {this.state.excerpt}
            </View>
  }
}

export default ArticleExcerpt;



var styles = StyleSheet.create({
  a: {
    fontSize:23,
    fontWeight: '300',
    color: 'grey',
  },
  p: {
    fontSize:20,
    fontWeight: '500',
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
