import React, { Component } from "react";
import {
  Container,
  View,
  Text,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Image,
} from "native-base";
import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MyCustomImage from "../components/MyCustomImage";
export default class GeneralExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
    };
  }
  render() {
    var newFilter = ["By Name", "By Type", "Less than 10", "Greater than 10"];
    var products = [
      {
        name: "Addidas Shoes",
        quantity: 2,
        type: "Shoes",
        description: "this is the best shoes ever",
        price: "$10",
      },
      {
        name: "Addidas Shoes",
        quantity: 2,
        type: "Shoes",
        description: "this is the best shoes ever",
        price: "$10",
      },
      {
        name: "Addidas Shoes",
        quantity: 2,
        type: "Shoes",
        description: "this is the best shoes ever",
        price: "$10",
      },
      {
        name: "Addidas Shoes",
        quantity: 2,
        type: "Shoes",
        description: "this is the best shoes ever",
        price: "$10",
      },
      {
        name: "Addidas Shoes",
        quantity: 2,
        type: "Shoes",
        description: "this is the best shoes ever",
        price: "$10",
      },
      {
        name: "Addidas Shoes",
        quantity: 2,
        type: "Shoes",
        description: "this is the best shoes ever",
        price: "$10",
      },
    ];
    const { filter } = this.state;
    return (
      <Container>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            backgroundColor: "#2D3436",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: "#2D3436",
              paddingVertical: 20,
            }}
          >
            <Item
              style={{
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: "white",
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
            >
              <Input style={{ color: "white" }} placeholder="Search Products" />
              <Icon style={{ color: "white" }} name="search" />
            </Item>
          </View>
        </View>
        <View style={{ height: 80 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {newFilter.map((item, i) => (
              <TouchableOpacity
              key={i}
                onPress={() =>
                  this.setState({
                    filter: i,
                  })
                }
                style={{
                  backgroundColor: filter == i ? "#2D3436" : "#B2BEC3",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "white" }}> {item} </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          {products.map((item, i) => (
            <TouchableOpacity
            key={i}
            onPress={()=>this.props.navigation.navigate('ProductDetails',{item:item})}
              style={{
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.34,
                shadowRadius: 2.27,
                elevation: 10,
                marginVertical: 10,
                width: Dimensions.get("window").width - 40,
                backgroundColor: "white",
                marginHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <MyCustomImage
                style={{ width: 100, height: 100 }}
                imagePath={require("../assets/" + 0 + ".jpg")}
              />
              <View style={{ padding: 10,justifyContent:'space-between' }}>
                <View style={{ flexDirection: "row",justifyContent:'space-between',width:Dimensions.get("window").width - 160 }}>
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </View>
                <View style={{ flexDirection: "row",justifyContent:'space-between',width:Dimensions.get("window").width - 160 }}>
                  <Text style={{color:'#B2BEC3'}}>Quantity: {item.quantity}</Text>
                  <Text style={{color:'#B2BEC3'}}> {item.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Container>
    );
  }
}
