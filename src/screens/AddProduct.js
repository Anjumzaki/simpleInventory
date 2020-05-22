import React from "react";
import { View, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import axios from 'axios'
import firebase from 'firebase'
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
  Form,
  Item,
  Label,
  Input,
} from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      image: null,
      name: "",
      type: "",
      description: "",
      price: "",
      quantity: "",
      serialNo: '',
      msg: ''
    };
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


    uploadImage = async (uri,id) => {
      console.log("in functiom",uri,id)
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = firebase
        .storage()
        .ref()
        .child("product_images/" + id + ".jpg");
      return ref.put(blob);
    };

  async handleSave() {
    if (this.state.image) {
      if (this.state.name) {
        if (this.state.type) {
          if (this.state.description) {
            if (this.state.price) {
              if (this.state.quantity) {
                if (this.state.serialNo) {
                    axios.post('https://secret-beach-00126.herokuapp.com/add/product',{
                      name: this.state.name,
                      type: this.state.type,
                      description: this.state.description,
                      price: this.state.price,
                      quantity: this.state.quantity,
                      serialNo: this.state.serialNo,
                      userId: this.props.route.params.uid
                    })
                    .then(async(resp) => {
                      console.log("sd",resp.data)
                      await this.uploadImage(this.state.image, resp.data.product._id)
                       alert("Product Publish Successfully")
                    })
                    .catch(err => console.log(err))

                // alert("Call Function here");
   

              } else {
                alert("Please enter serial Code");
              }
              } else {
                alert("Please enter quantity");
              }
            } else {
              alert("Please enter price");
            }
          } else {
            alert("Please enter description");
          }
        } else {
          alert("Please enter type");
        }
      } else {
        alert("Please enter name");
      }
    } else {
      alert("Please add image");
    }
  }
  render() {
    console.log("state",this.state)
    let { image } = this.state;
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
            Add Product
          </Text>
          <TouchableOpacity onPress={() => this.handleSave()}>
            <Text
              style={{
                color: "white",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <Form>
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <TouchableOpacity onPress={this._pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: "#DFE6E9",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      style={{ color: "#B2BEC3", fontSize: 100 }}
                      name="ios-add"
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={(name) => this.setState({ name })} />
            </Item>
            <Item floatingLabel last>
              <Label>Type</Label>
              <Input onChangeText={(type) => this.setState({ type })} />
            </Item>
            <Item floatingLabel last>
              <Label>Description</Label>
              <Input
                onChangeText={(description) => this.setState({ description })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Price</Label>
              <Input
                onChangeText={(price) => this.setState({ price })}
                keyboardType={"decimal-pad"}
              />
            </Item>
            <Item floatingLabel last>
              <Label keyboardType={"decimal-pad"}>Quantity</Label>
              <Input onChangeText={(quantity) => this.setState({ quantity })} />
            </Item>
            <Item floatingLabel last>
              <Label keyboardType={"decimal-pad"}>Serial Code.</Label>
              <Input 
              value={this.state.serialNo ? this.state.serialNo : this.props.route.params.serialNo}
              onChangeText={(serialNo) => {
                 this.setState({
                   serialNo
                 })
                }} />
            </Item>
              <Text style={{textAlign: "center", color: "red"}}>{this.state.msg}</Text>
          </Form>
        </ScrollView>
      </View>
    );
  }
}
