import React, {Component} from 'react';
import {ScrollView, Text, View,Image , StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import { connect } from 'react-redux'
import { categoryArticlesNew, resetLoading, setCategoryCode } from '../../data-store/actions/articles-actions';

import { Actions } from 'react-native-router-flux';

import ArrowForwardIMG from '../../assets/Icons/baseline_arrow_forward_ios_white_36dp.png'
import BackIMG from '../../assets/Icons/baseline_arrow_back_white_36dp.png'


class SideMenuView extends Component {
  constructor(props){
    super(props)
    this.state = {
      menu : null,
      showSubItems : false
    }
  }

  navigateToScreen = (item) => () => {
    // if(item.goTowebView !== undefined){
    //     Actions.ArticleRequestDrawer({
    //     typeView : 3,
    //     urlToGo: item.goTowebView });
    //     Actions.drawerClose();
    // }else{
        this.props.getArticlesNew(item)
        Actions.drawerClose()   
//    }
  
  }

  showSubItemsFunc = (subItems) => {
    let subitemsView = [];
        subItems.map((item, index)=>{
          subitemsView.push(<View key={index} style={styles.navSectionStyle}>
            <TouchableOpacity onPress={this.navigateToScreen(item)}>
              <View style={{width: 240}}>
                <Text style={styles.navItemStyle}>
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
            </View>); 
        });
   
    this.setState({
      showSubItems : !this.state.showSubItems,
      subItems : subitemsView
    })

  }

  BackToMenu = () =>{
    this.setState({
      showSubItems : !this.state.showSubItems,
      subItems : null
    })
  }

  // <Icon 
  // name='arrow-forward'
  // style={{fontSize: 20, color: 'white', padding:10}}
  // />

  subItemsIcon = (item) =>{   
    if(item.subItems != undefined){
    return (
      <TouchableOpacity onPress={() => {this.showSubItemsFunc(item.subItems)}}>
      <View style={styles.navItemStyle}>
        <Image source={ArrowForwardIMG} style={{height:20, width:20}}/>
      </View>
    </TouchableOpacity>);
    }
    return;
  }

  // <Icon 
  // name='arrow-back'
  // style={{fontSize: 30, color: 'white', padding:10}}
  // onPress={() => this.BackToMenu()}
  // />
  render () {
    let menu = [];
    let backButton;
    const items = this.props.menuItems;

    if(this.state.showSubItems){
      menu = this.state.subItems;
      backButton = (
        <TouchableOpacity onPress={() => this.BackToMenu()}>
      <View >
          <Image source={BackIMG} style={{height:30, width:30}}/>
        </View>
      </TouchableOpacity>)
    }else{
      for(var i in items){
        menu.push(
          <View key={i} style={styles.navSectionStyle}>
          <TouchableOpacity onPress={this.navigateToScreen(items[i])}>
            <View style={{width: 240}}>
              <Text style={styles.navItemStyle}>
                {items[i].label}
              </Text>
            </View>
          </TouchableOpacity>
          {this.subItemsIcon(items[i])}
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {backButton}
          {menu}
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Mundo Hispánico </Text>
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      getArticlesNew : (item) => {
        console.log("get slug");
        //dispatch(resetLoading());
        dispatch(setCategoryCode(item));
        dispatch(categoryArticlesNew(item))
      },
      getWebView : (item) => {
        console.log("get slug");
        dispatch(setCategoryCode(item));
      }
    }
  }

const mapStateToProps = (state) => {
  return {
    menuItems : state.articles.menuItems
  }
}

const SideMenu = connect(
mapStateToProps,
mapDispatchToProps
)(SideMenuView);

export default SideMenu;

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      backgroundColor:"#000000"
    },
    navItemStyle: {
      padding: 15,
      color : '#FFFFFF',
      fontSize : 20,
    },
    navSectionStyle: {
      height : "auto",
      flex:1,
      flexDirection: 'row',
      backgroundColor: '#000000',
      borderBottomColor: 'grey',
      borderBottomWidth: 1
    },
    sectionHeadingStyle: {
      paddingVertical: 10,
      paddingHorizontal: 5
    },
    footerContainer: {
      padding: 20,
      backgroundColor: '#000000'
    },
    footerText:{
      color : '#FFFFFF',
      fontSize : 10,
    }
  });