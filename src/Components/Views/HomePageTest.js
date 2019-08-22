import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Animated, Image, FlatList, Button, TouchableOpacity} from 'react-native';
import {StackNavigator } from 'react-navigation';

import StartTiming from './StartTiming';

export default class HomePageTest extends Component {

  

  constructor(props){
    super(props)
    this.state = {
      animate : new Animated.Value(30),
      animateXY: new Animated.ValueXY({x:0, y:0}),
      dataSource : null,
      isLoading : true
    }
  }

  componentWillMount(){
  }

  componentDidMount(){
    return fetch('https://mundohispanico.staging.wpengine.com/sabor?json=1')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.posts,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  animar(){
    Animated.sequence([
      Animated.timing(this.state.animate, {
        toValue: 100,
        duration : 1000
      }),
      Animated.timing(this.state.animateXY, {
        toValue: {x:0, y: 100},
        duration : 500
      })
    ]).start();

  }
  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <Text>Cargando...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
      <Text style={styles.instructions}>Boton</Text>
    </TouchableOpacity>

      <TouchableOpacity onPress={() => this.props.navigation.navigate("StartTiming")}>
        <Text style={styles.instructions}>otro home test</Text>
      </TouchableOpacity>

        <Text onPress={() => this.animar()} style={styles.welcome}>Mundo Hispánico</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Animated.View style={{width:this.state.animate, 
                                height: this.state.animate, 
                                backgroundColor: "red",
                                top:this.state.animateXY.x,
                                left : this.state.animateXY.y }} />

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={styles.list}>
            <Image
                style={{width: 80, height: 80}}
                source={{uri: item.attachments[0].url}}
              />
            <Text style={styles.item}>{item.title}</Text>
          </View>}
        />
      </ScrollView>
    );
  }
}


const InnerStackNavigator = new StackNavigator({
  StartTiming :{
      screen : StartTiming
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list :{
    flex:1,
    flexDirection: 'row',
    padding : 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1, 
    paddingTop:22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
