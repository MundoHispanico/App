import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, Sti} from 'react-native';
import {Header,Left, Right, Body, Container} from 'native-base';
import Logo from '../../assets/logo/Logo.png';

import { Actions } from 'react-native-router-flux';
import MenuIMG from '../../assets/Icons/baseline_menu_white_36dp.png'
import BackIMG from '../../assets/Icons/baseline_arrow_back_white_36dp.png'
import ShareIMG from '../../assets/Icons/baseline_share_white_36dp.png'

class HeaderDefault extends Component {
  render() {
    let leftIcon;
    let rightIcon;
    if(this.props.back){
        leftIcon = (
            <TouchableOpacity onPress={() => Actions.pop()}>
            <View style={{width: 60}}>
              <Image source={BackIMG} style={{height:30, width:30, justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center'}}/>
            </View>
          </TouchableOpacity>)

    }else{
        leftIcon = (
            <TouchableOpacity onPress={() => {Actions.drawerOpen()}}>
            <View style={{width: 60}}>
              <Image source={MenuIMG} style={{height:30, width:30, justifyContent: 'center', alignItems: 'center'}}/>
            </View>
          </TouchableOpacity>);
    }
    if(this.props.share){
        rightIcon = (
            <TouchableOpacity onPress={() => Actions.pop()}>
            <View style={{width: 60}}>
              <Image source={ShareIMG} style={{height:30, width:30, justifyContent: 'center', alignItems: 'center'}}/>
            </View>
          </TouchableOpacity>)
    }


    return (
            <Header style={{backgroundColor:"#C52D27"}}>
                <Left>
                    {leftIcon}
                </Left>
                <Body>
                        <Image style={{ width: 200, 
                                resizeMode: 'contain'
                                }}  source={Logo}/>
                </Body>
                <Right>
                    {rightIcon}
                </Right>
            </Header>
    );
  }
}

export default HeaderDefault;

