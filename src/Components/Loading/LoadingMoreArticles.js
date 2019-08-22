import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import { Spinner } from 'native-base';


const LoadingMoreArticles =() => {
        let {width, height} = Dimensions.get('window');
        return (
                <View style={styles.container}>
                    <Text style={styles.text}>Cargando más articulos</Text>
                    <Spinner style={styles.Spinner} color='red' />
                </View>
            )

}

export default LoadingMoreArticles;


const styles = StyleSheet.create({
        container: {
        position:"absolute",
        top:55,
        width:"100%",
        backgroundColor:'#FFA6A6',
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,

        },
        text: {
                textAlign: 'center', // <-- the magic
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 0,
                color: 'red',
                textAlignVertical: "center",
                padding:30
        },
        Spinner :{
        }
      });
      