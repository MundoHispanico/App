import React, {Component} from 'react';
import {Dimensions, View,ActivityIndicator,StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import {Container, Spinner} from 'native-base';

import { urlMundoHispanicoJson } from '../../../localData/urlMundoHispanico';

import OfflineCacheWebView from 'react-native-offline-cache-webview';

class ArticleWebBrowser extends Component {

        constructor(props){
                super(props)
                this.state = {
                        showWebView : false,
                        visible: true
                }
        }
        componentDidMount(){
                this.setState({
                        showWebView : true
                })

        }
        componentWillUnmount(){
                this.setState({
                        showWebView : false
                })

        }

        injectedJavascript0 = () =>{
                return `
                document.querySelector('header').style.display ='none';
                //window.onclick = function(e) {
                        //var url = "";
                        //if(e.target.tagName.toLowerCase() ===ƒ 'a')
                        //{
                                //e.preventDefault();
                                //url = String(e.target.href); //this is the url where the anchor tag points to.
                                //alert(url);
                                //window.postMessage("prueba", "http://mundohispanico.com/injected");
                        //}
                //};`;
        }

        injectedJavascript = () =>{
                 return `document.querySelector('header').style.display ='none';true;`;
                // return true;
        }

        injectJavascript = () =>{
                return ;
        }
        backToList = () =>{
                //Actions.pop();
        }

        onMessage = (event) =>{
                //alert(JSON.stringify(event.data));
        }

        showSpinner() {
            console.log('Show Spinner');
            this.setState({ visible: true });
          }

          hideSpinner() {
            console.log('Hide Spinner');
            this.setState({ visible: false });
          }



        render(){
        let {width, height} = Dimensions.get('window');
        //let urlFinal = (this.props.amp)?this.props.url+"/amp":this.props.url;
        let urlFinal = this.props.url+"/app";
        
        return (
                
                   // {webView}
                   <View
                        style={this.state.visible === true ? styles.stylOld : styles.styleNew}>
                        {this.state.visible ? (
                          <ActivityIndicator
                            color="red"
                            size="large"
                            style={styles.ActivityIndicatorStyle}
                          />
                        ) : null}

                        <WebView
                            source={{uri: urlFinal}}
                            onMessage={this.onMessage}
                            onError={this.backToList()}
                            injectedJavaScript={this.injectedJavascript()}
                            injectJavaScript={this.injectJavascript()}
                            javaScriptEnabled={true}
                            startInLoadingState={false}
                            allowsInlineMediaPlayback={true}
                            mediaPlaybackRequiresUserAction={false}
                            style={{backgroundColor:"transparent"}}
                            offlineCacheMode={"on"}
                            onLoadStart={() => this.showSpinner()}
                            onLoad={() => this.hideSpinner()}
                        />
                      </View>
                
            )
        }

}

export default ArticleWebBrowser;

var styles = StyleSheet.create({
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

