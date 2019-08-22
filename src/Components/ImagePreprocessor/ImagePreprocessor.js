import React, {Component} from 'react';
import {Dimensions, View, Image} from 'react-native';




const getImageId = (url) =>{
        console.log("url "+url);

        return url;
        // sample image route 
        //https://res.cloudinary.com/mundo/image/upload/c_crop,f_auto,g_north_west,h_2022,q_80,w_3840,x_0,y_332/v1538876144/082616_ADAMARI_LOPEZ_TONI_ICONOS8_idjhku.jpg
        
        const cloudinaryURL = "https://res.cloudinary.com/mundo/image/upload/";
        console.log("go to link");
        if(url && url != undefined && url.contains(cloudinaryURL)){
          var routeParts = url.split("/");
  
          var imageId = routeParts[routeParts.length-1];
                return cloudinaryURL+"q_50/"+imageId;
        }else{
                return url;
        }

}
const ImagePreprocessor =({url}) => {

        if(url){
                return <Image source={{uri: getImageId(url)}} 
                style={{flex: 1}}/>
        }else{
                return <View></View>
        }

}

export default ImagePreprocessor;

