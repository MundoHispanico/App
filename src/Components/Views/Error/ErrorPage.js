import React, {Component} from 'react';
import { connect } from 'react-redux'
import { categoryArticles, resetLoading, setCategoryCode} from '../../../data-store/actions/articles-actions';

import {StyleSheet, Text} from 'react-native';
import { Container, Button } from 'native-base';

import WarningIMG from '../../../assets/Icons/baseline_warning_black_36dp.png';

import HeaderDefault from '../../Menu/HeaderDefault';

class ErrorPageView extends Component {

    reload = () => {
        if(this.props.categoryCode >= 0){
            this.props.getArticlesByCategory(this.props.categoryCode);
        }else{
            this.props.getArticlesByCategory(9782973);
        }
    }
    
    render(){
        console.log(this.props.isLoading +" status "+this.props.status);
    let text = "";
    if(this.props.type == "Not found"){
        text = "Página no encontrada";
    }else if(this.props.type == "SyntacError:JSON Parse error:Unexpected EOF"){
        text = String(this.props.type);
    }else{
        text = "Error intente de nuevo"
    }
        return (
                     <Container>
                        <Container style={styles.container}>
                        <Image source={WarningIMG}/>
                            <Text style={styles.text}>{text}</Text>
                            <Button onPress={() => this.reload()} block light>
                                <Text style={styles.text}>Cargar de nuevo</Text>
                            </Button>
                              
                          </Container>
                     </Container>
          
            )
        }

}


const mapDispatchToProps = (dispatch) => {
    return {
        getArticlesByCategory : (categoryCode) => {
          console.log("get slug");
          //dispatch(resetLoading());
          dispatch(setCategoryCode(categoryCode));
          dispatch(categoryArticles(categoryCode))
        }
      }
    }
  
const mapStateToProps = (state) => {
    return {
      menuList : state.articles.menuList,
      categoryCode : state.articles.categoryCode,
      isLoading : state.articles.isLoading,
      status : state.articles.status

    }
  }
  
const ErrorPage = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ErrorPageView);
  
export default ErrorPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text :{
      fontSize : 25,
      textAlign : 'center'
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    icon:{
        fontSize: 200, 
        color: 'grey', 
        padding:10,
        textAlign : 'center'
    }
  });
  