import React, {Component} from 'react';
import {StyleSheet , Text, View, Platform} from 'react-native';
import { Container } from 'native-base';
//import taboolaIOS from './taboolaIOS.html';
import { WebView } from 'react-native-webview';

class Taboola extends Component {
  constructor(props){
    super(props)
    this.state = {
      taboolaView : null
    }
  }
  componentDidMount(){
    Platform.select({
      ios: () => {
        this.setState({
          taboolaView : this.taboolaIOS
        })
      },
      android: () => {
        this.setState({
          taboolaView : this.taboolaAndroid
        });
      }
    });


  }

  taboolaAndroid = `<H1 style="color:red">android</H1>`;
  // taboolaAndroid = (`<HTML>
  //             <HEAD>
  //             <script type="text/javascript">
  //               window._taboola = window._taboola || [];
  //               _taboola.push({article:"${this.props.appPageId}", url:"${this.props.urlPageWeb}", device:"${this.props.advertisingId}"});
  //               _taboola.push({additional_data:{sdkd:{ "appid" : "Taboola.TaboolaDemoApp", "os" : "iOS", "app" : "TaboolaDemoApp", "model" : "x86_64", "osv" : "10.2", "net" : "wifi", "appv" : "1.0"}}});
  //               !function (e, f, u, i) {
  //                 if (!document.getElementById(i)){
  //                   e.async = 1;
  //                   e.src = u;
  //                   e.id = i;
  //                   f.parentNode.insertBefore(e, f);
  //                 }
  //               }(document.createElement('script'),
  //               document.getElementsByTagName('script')[0],
  //               '//cdn.taboola.com/libtrc/mundohispanico-mobileappsdkandroid/loader.js',
  //               'tb_loader_script');
  //               if(window.performance && typeof window.performance.mark == 'function')
  //                 {window.performance.mark('tbl_ic');}
  //             </script></HEAD>
  //             <BODY>
              
  //             <div id="taboola-below-article-thumbnails"></div>
  //             <script type="text/javascript">
  //               window._taboola = window._taboola || [];
  //               _taboola.push({
  //                 mode: 'thumbnails-a-feed',
  //                 container: 'taboola-below-article-thumbnails',
  //                 placement: 'Below Article Thumbnails',
  //                 target_type: 'mix'
  //               });
  //             </script>
  //             <script type="text/javascript">
  //               window._taboola = window._taboola || [];
  //               _taboola.push({flush: true});
  //             </script>
  //             </BODY>
  //             </HTML>`)

      
  taboolaIOS = `<HTML>
    <HEAD>
    <script type="text/javascript">
      window._taboola = window._taboola || [];
      _taboola.push({article:"${this.props.appPageId}", url:"${this.props.urlPageWeb}", device:"${this.props.advertisingId}"});
      _taboola.push({additional_data:{sdkd:{ "appid" : "Taboola.TaboolaDemoApp", "os" : "iOS", "app" : "TaboolaDemoApp", "model" : "x86_64", "osv" : "10.2", "net" : "wifi", "appv" : "1.0"}}});
      !function (e, f, u, i) {
        if (!document.getElementById(i)){
          e.async = 1;
          e.src = u;
          e.id = i;
          f.parentNode.insertBefore(e, f);
        }
      }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/mundohispanico-mobileappsdkios/loader.js',
      'tb_loader_script');
      if(window.performance && typeof window.performance.mark == 'function')
        {window.performance.mark('tbl_ic');}
    </script>
    </HEAD>
    <BODY>
    <div id="taboola-below-article-thumbnails"></div>
    <script type="text/javascript">
      window._taboola = window._taboola || [];
      _taboola.push({
        mode: 'thumbnails-a-feed',
        container: 'taboola-below-article-thumbnails',
        placement: 'Below Article Thumbnails',
        target_type: 'mix'
      });
    </script>
    <script type="text/javascript">
      window._taboola = window._taboola || [];
      _taboola.push({flush: true});
    </script>
    </BODY>
    </HTML>
    
    `
    testLibreria = `<html>
    <head>
      <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!--Import materialize.css-->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="background-color:red">
            <div class="carousel">
                    <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
                    <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
                    <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
                    <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
                    <a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>
                  </div>
      <!--JavaScript at end of body for optimized loading-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      <script>
        $(document).ready(function(){
            $('.carousel').carousel();
        });
       </script>
    </body>
  </html>`


  render(){
    return (
      <View style={styles.list}>
        <WebView style={styles.webView}
          source={{html: this.state.taboolaView}}
          />
      </View>)
  }

    
  }
  
  export default Taboola;
  
  
  const styles = StyleSheet.create({
    list :{
      height:500,
      backgroundColor : 'red'
    },
    webView :{ 
      height:500,
        backgroundColor : 'white'
    }
  });
  