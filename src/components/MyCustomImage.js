import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Text } from "native-base";

export default class MyCustomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
    };
  }
  componentDidMount() {
    this.setState({
      src: this.props.imagePath,
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
          <Image style={this.props.style} source={src} />
        )}
        
      </View>
    );
  }
}
