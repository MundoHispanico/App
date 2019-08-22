import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';


const onBuffer = () => {
    alert("bufer");

}
const onEnd = () => {
    alert("end");
    
}
const videoError = () => {
    alert("videoError");
    
}
const backgroundVideo = () => {
    alert("backgroundVideo");
    
}
const player = () => {
    alert("player");
    
}

const Videos = () => {
    return (

                <Video
                source={{uri:"https://www.youtube.com/embed/oJLcwqgVOKM"}}
                style={{ width: 800, height: 800 }}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                volume={1.0}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
      
              />
            );
}

export default Videos;

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });