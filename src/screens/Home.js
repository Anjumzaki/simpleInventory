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
import { Dimensions, Alert } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MyCustomImage from "../components/MyCustomImage";
import axios from 'axios'
import firebase from 'firebase'
export default class GeneralExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      products: [],
      search: ''
    };
  }

  componentDidMount(){
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // Alert('asjkdhaksj')
        axios.get('https://secret-beach-00126.herokuapp.com/get/products/')
        .then(resp => {
          console.log("sds",resp.data)
          this.setState({products: resp.data})
        })
        .catch(err => console.log(err))
  // })
  }

  // componentWillUnmount(){
  //   // this._unsubscribe()
  // }


  render() {
    var newFilter = ["By Name", "By Type", "Less than 10", "Greater than 10"];
    var key1 = this.state.search
    var temp = []

    if(this.state.search){
      if(this.state.filter === 0){
        temp = this.state.products.filter(function (product) {
          return (product.name ? product.name.toLowerCase().includes(key1.toLowerCase()) : null);
      });
      }else if(this.state.filter === 1){
        temp = this.state.products.filter(function (product) {
          return (product.type ? product.type.toLowerCase().includes(key1.toLowerCase()) : null);
      });
      }
    }

    if(this.state.filter === 2){
      console.log("in less")
      temp = this.state.products.filter(function (product) {
        return (parseInt(product.quantity) < 10 );
    });
    }else if(this.state.filter === 3){
      console.log("in greater")

      temp = this.state.products.filter(function (product) {
        return (parseInt(product.quantity) >= 10);
    });
    }
   
    // var temp = totalProducts.filter(function (product) {
    //   return (product.productName ? product.productName.toLowerCase().includes(key1.toLowerCase()) : null);
    // });
    
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
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Item
              style={{
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: "#B2BEC3",
                borderRadius: 10,
                paddingHorizontal: 10,
                width: "80%",
                backgroundColor: "#B2BEC3",
              }}
            >
              <Input style={{ color: "white" }} placeholder={ this.state.filter === 1 ?"Search by Type" : "Search by Products"} 
              onChangeText={(search) => this.setState({ search })}/>
              <Icon style={{ color: "white" }} name="search" />
            </Item>
            <TouchableOpacity
              onPress={() => this.props.navigation.push("BarcodeScreen",{props: this.props})}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: "5%",
                paddingRight:0
              }}
            >
              <Icon style={{ color: "white" }} name="ios-barcode" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.push("AddProduct", {serialNo: ""})}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: "5%",
              }}
            >
              <Icon style={{ color: "white" }} name="ios-add" />
            </TouchableOpacity>
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
                onPress={() => {
                  if(i > 1){
                    this.setState({
                      filter: i,
                      search: 'asd'
                    })
                  }else{
                    this.setState({
                      filter: i,
                      search: ''
                    })
                  }
                  
                }
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
          {this.state.search ? (

              temp.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    this.props.navigation.navigate("ProductDetails", { item: item })
                  }
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
                    imagePath={item._id}
                  />
                  <View style={{ padding: 10, justifyContent: "space-between" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: Dimensions.get("window").width - 160,
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text>{item.price}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: Dimensions.get("window").width - 160,
                      }}
                    >
                      <Text style={{ color: "#B2BEC3" }}>
                        Quantity: {item.quantity}
                      </Text>
                      <Text style={{ color: "#B2BEC3" }}> {item.type}</Text>
                    </View>
                    <Text style={{ color: "#B2BEC3" }}>
                        Serial Code: {item.serialNo}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))

            ) : (
              this.state.products.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                this.props.navigation.navigate("ProductDetails", { item: item })
              }
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
                imagePath={item._id}
              />
              <View style={{ padding: 10, justifyContent: "space-between" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: Dimensions.get("window").width - 160,
                  }}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: Dimensions.get("window").width - 160,
                  }}
                >
                  <Text style={{ color: "#B2BEC3" }}>
                    Quantity: {item.quantity}
                  </Text>
                  <Text style={{ color: "#B2BEC3" }}> {item.type}</Text>
                </View>
                <Text style={{ color: "#B2BEC3" }}>
                        Serial Code: {item.serialNo}
                    </Text>
              </View>
            </TouchableOpacity>
          )))}
        </ScrollView>
      </Container>
    );
  }
}
