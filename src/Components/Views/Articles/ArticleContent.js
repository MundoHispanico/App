import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Spinner } from 'native-base';
import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import AdMobMH from '../../AdMobMH/AdMobMH';
import { AdmobJson } from '../../AdMobMH/AdMobConst';

import ArticleEmbedMHVideo from './ArticleEmbedMHVideo'
import ArticleEmbebInstagram from '../Embed/ArticleEmbebInstagram'

import { Actions } from 'react-native-router-flux';

import { urlMundoHispanicoJson } from '../../../localData/urlMundoHispanico';



class ArticleContent extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : null
    }
  }
  componentDidMount(){
    //let Html = <Text>a</Text>;//this.filtrarHtml1(this.props.article.content.rendered);
      //let Html = this.filtrarHtml1(this.props.content);
    //  this.setState({
    //    content : Html
    //  })

    setTimeout(function(con){ 
      let Html = this.filtrarHtml1(this.props.content);
      this.setState({
          content : Html
        })  
      }.bind(this), 1000);


  }

filtrarHtml4 = (content) => {
    // separo por parrafos y renderizo con HTMLS view cada uno
  let newContent = content.match(/(<amp-brid-player>(.*?)<\/amp-brid-player>)|(<blockquote>(.*?)<\/blockquote>)|(<p>(.*?)<\/p>)/g);
  //let newContent = content.match(/<blockquote.*>(.*?)<\/blockquote>/g);
  alert(JSON.stringify(newContent));

  let showAdds = [5,10,15,20,25,30,35];

  let banner = AdmobJson.AppArticlePage;
  let bannerIndex = 0;


  let contentFinal = [];
  newContent.map((value, index)=>{
    value = value;
  if(showAdds.includes(index)){
    contentFinal.push(<AdMobMH key={index*1000} 
                        typeBanner={banner[bannerIndex].type}
                        unitId={banner[bannerIndex].unitId}
                        />
                      
                      )
                      bannerIndex = (bannerIndex >= 3 )? 0 :bannerIndex+1;
                      console.log("banner index" + bannerIndex);
          }
    // TODO revisar que no esta mostrando los videos ni hace nada con eso.
    if(value.search("<!--WP embed") != -1){
      console.log("contiene embed")
      console.log("embed "+value);
      contentFinal.push(
        <ArticleEmbedMHVideo key={index} embed={value}/>)
    }else if(value.search("data-instgrm-permalink") != -1){
      console.log("contiene embed instagram")
      contentFinal.push(
        <ArticleEmbebInstagram key={index} embed={value}/>)
    }else{
      contentFinal.push(
        <HTMLView key={index}
                          value={value}
                          stylesheet={styles}
                          onLinkPress={(urlToGo) => this.goToLink(urlToGo)}
                          renderNode={this.renderNode}
                          />
      )
                          console.log("index"+index +"text:" +value);
    }
  })
  return contentFinal;
}



  filtrarHtml0 = (content) => {
    // separo por parrafos y renderizo con HTMLS view cada uno
  let newContent = content.replace(/(<p><\/p>)|(\n)/g, "");
  //newContent = newContent.split(/(<\/p>)/g);

  let showAdds = [5,10,15,20,25,30,35];

  let banner = AdmobJson.AppArticlePage;
  let bannerIndex = 0;


  let contentFinal =  (<HTMLView 
                          value={newContent}
                          paragraphBreak={"<h1>parrafo</h1>"}
                          stylesheet={styles}
                          onLinkPress={(urlToGo) => this.goToLink(urlToGo)}
                          renderNode={this.renderNode}
                          />)

  return contentFinal;
  
  }

  filtrarHtml1 = (content) => {
        // separo por parrafos y renderizo con HTMLS view cada uno
    let newContent = content.replace(/(<p><\/p>)|(<p>&nbsp;<\/p>)|(\n)/g, "");
    newContent = newContent.split(/(<\/p>)|(<\/blockquote>)/g);

      let showAdds = [5,10,15,20,25,30,35];

      let banner = AdmobJson.AppArticlePage;
      let bannerIndex = 0;


      let contentFinal = [];
      newContent.map((value, index)=>{
        value = value;
      if(showAdds.includes(index)){
        contentFinal.push(<AdMobMH key={index*1000} 
                            typeBanner={banner[bannerIndex].type}
                            unitId={banner[bannerIndex].unitId}
                            />
                          
                          )
                          bannerIndex = (bannerIndex >= 3 )? 0 :bannerIndex+1;
                          console.log("banner index" + bannerIndex);
              }
        // TODO revisar que no esta mostrando los videos ni hace nada con eso.

        if(value != undefined && value.search("<!--WP embed") != -1){
          console.log("contiene embed")
          console.log("embed "+value);
          contentFinal.push(
            <View>
              <Text>
              
              </Text>
            <ArticleEmbedMHVideo key={index} embed={value}/>
            </View>)
        // }else if(value != undefined && value.search("data-instgrm-permalink") != -1){
        //     console.log("contiene embed instagram")
        //     contentFinal.push(
        //       <ArticleEmbebInstagram key={index} embed={value}/>)
        // }
          }else if(value != undefined){
          contentFinal.push(
            <HTMLView key={index}
                              value={value}
                              stylesheet={styles}
                              onLinkPress={(urlToGo) => this.goToLink(urlToGo)}
                              renderNode={this.renderNode}
                              />
          )
                              console.log("index"+index +"text:" +value);
        }
      })
      return contentFinal;
  }

  filtrarHtml2 = (content) => {
      // separo por parrafos y renderizo con Etiquetas Nativas
      //Debo ir filtrando cada caso posible para garantizar un correcto funcionamiento
      var newContent = content.replace(/(<\/p>)/g, "###M#M#");
      var newContent = newContent.replace(/\n|(<p>)/g, "");
      var newContent = newContent.replace(/(&#8220;)|(&#8221;)/g, '"');
      var newContent = newContent.split(/###M#M#/g);
    
      let contentFinal = [];
    
      newContent.map((value, index)=>{
        contentFinal.push(<View key={index}>
          <Text>Parrafo</Text>
          <Text>{value}</Text>
          </View>);
      })
      return (contentFinal)
    }

    filtrarHtml3 = (content) => {
      // separo por parrafos y renderizo con Etiquetas Nativas
      //Debo ir filtrando cada caso posible para garantizar un correcto funcionamiento
    
      return (<View style={{flex : 1}}>
          <WebView 
            javaScriptEnabled={true}
            source={{html: content}}
            />
      </View>
  )
    }

    goToLink = (urlToGo) => {
      let urlToGoInit = urlToGo;
      console.log("go to link");
      if(urlToGo.contains(urlMundoHispanicoJson)){
        var removeUrl = urlToGo.split(urlMundoHispanicoJson);
        var slugs = removeUrl[1].split("/");

        var slug = slugs[slugs.length-1];
        if(!isNaN(slug)){
          slug = slugs[slugs.length-2];
        }
        Actions.ArticleRequest({
          typeView:2,
          slug: slug,
          urlToGo: urlToGoInit
        })
        
      }else{
        Actions.WebArticlesBrowser({
          urlToGo: urlToGo        
        })
      }
  }

  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'iframe') {
      return null;
      
      const a = node.attribs;
      alert("iframe entro" + a.src);
      const iframeHtml = `<iframe src="${a.src}"></iframe>`;
      return (
        <View key={index} >
          <WebView source={{uri: a.src}} />
        </View>
      );
    }else if(node.name == 'blockquote'){
      const atributos = node.attribs;
      if(atributos.class == "instagram-media"){
//        alert("node instagram");
        //return <Text>Posstttt instagram</Text>
        return (<ArticleEmbebInstagram key={index} url={atributos["data-instgrm-permalink"]}/>)
      }
      return null;
    }
  }


  render(){
    if(this.state.content == null){
      return (<View style={{alignContent:"center"}}>
                <Spinner color='red' />
              </View>)
    }
    return <View>{this.state.content}</View>
  }
}

export default ArticleContent;



var styles = StyleSheet.create({
  a: {
    fontSize:23,
    fontWeight: '400',
    color: 'red',
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
