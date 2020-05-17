import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
    };
  }

  render() {
    const { item } = this.props.route.params;
    console.log(item);
    return (
      <View>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            backgroundColor: "#2D3436",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              style={{
                color: "white",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              name="arrow-back"
            />
          </TouchableOpacity>

          <Text style={{ color: "white", fontWeight: "bold" }}>
            {item.name}
          </Text>
          <TouchableOpacity 
          onPress={()=>this.props.navigation.push('EditProducts')}
           >
            <Text
              style={{
                color: "white",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{item.name}</Text>
                  <Text>{item.type}</Text>
                </Body>
              </Left>
            </CardItem>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/1.jpg")}
                style={{ height: 200, width: 200 }}
              />
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
              <Text> {item.description} </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity  style={{ paddingHorizontal: 10 }}>
                <Icon style={{ fontSize: 40 }} name="ios-add" />
              </TouchableOpacity>
              <Text style={{ fontSize: 30 }}>{item.quantity}</Text>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <Icon style={{ fontSize: 40 }} name="ios-remove" />
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
