import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Text } from "native-base";
import firebase from 'firebase'

export default class MyCustomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
  }
  componentDidMount() {
 

    const ref = firebase
    .storage()
    .ref("product_images/" + this.props.imagePath + ".jpg");
      ref.getDownloadURL().then((url) => {
        console.log("Imageee urllllllllll", url);
        this.setState({ image: url });
      }).catch((err)=>{
        console.log(err)
      });

  }

  render() {
      var {src} = this.state
    //   const slides = {
    //     car: require(src.toString()),
    //     phone: require('../phone.png'),
    //   }
    return (
      <View>
        {src == "" ? (
          <ActivityIndicator color="gray" size={"large"} />
        ) : (
          <Image style={this.props.style} source={{uri: this.state.image}} />
        )}
        
      </View>
    );
  }
}
