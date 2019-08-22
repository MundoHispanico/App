import React, {Component} from 'react';
import {Text, View, Button, WebView, StyleSheet} from 'react-native';
import { connect } from 'react-redux'
import {detalleEvento} from '../data-store/actions/events-actions';

class PruebaView extends Component {
    static navigationOptions = {
        title: 'Prueba',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft : (
            <View>
            </View>
        )
    
      };

    render() {
    this.props.getDetalleEvento("evento_3");
    return (
        <View>
            <Text>Prueba aa</Text>
            <Text>Texto prueba component {JSON.stringify(this.props.eventDetail)} </Text>

            
            <Button
                onPress={() => this.props.navigation.navigate('StartTiminig')}
                title="Start Timing"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => this.props.navigation.navigate('DrawerNavigator')}
                title="DrawerNavigator"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => this.props.navigation.navigate('WebViewDemo')}
                title="WebView"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetalleEvento : (eventoIndex) =>{
            dispatch(detalleEvento(eventoIndex))
        }
        }
    }

const mapStateToProps = (state) => {
    return {
        eventDetail : state.events.eventDetail
    }
  }
  
const Prueba = connect(
	mapStateToProps,
	mapDispatchToProps
)(PruebaView);

export default Prueba;
