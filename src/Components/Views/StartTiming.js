import React, {Component} from 'react';
import {Text, View} from 'react-native';

class StartTimning extends Component {

    static navigationOptions = {
        title: 'Start Timing',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    
      };
  render() {
    return (
        <View>
            <Text>START TIMING </Text>
        </View>
    );
  }
}

export default StartTimning;
