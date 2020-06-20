import React from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import axios from "axios";
import firebase from "firebase";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Icon,
  Left,
  Body,
  Form,
  Item,
  Label,
  Input,
} from "native-base";
import Modal from "react-native-modal";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { BarCodeScanner } from 'expo-barcode-scanner';

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
      serialNo: "",
      msg: "",
      modal: false,
      isQr: false,
      scanned: false
    };
  }
  async componentDidMount() {
    this.getPermissionAsync();
    this.setState({serialNo: this.props.route.params.serialNo})
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImageCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri, modal: false });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
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
        this.setState({ image: result.uri, modal: false });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  uploadImage = async (uri, id) => {
    console.log("in functiom", uri, id);
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("product_images/" + id + ".jpg");
    return ref.put(blob);
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({scanned: true})
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log("dataaaaaaaa",data)
        this.setState({serialNo: data, isQr: false})
      
  };

  async handleSave() {
    if (this.state.image) {
      if (this.state.name) {
        if (this.state.type) {
          if (this.state.description) {
            if (this.state.price) {
              if (this.state.quantity) {
                if (this.state.serialNo) {
                  axios
                    .post(
                      "https://secret-beach-00126.herokuapp.com/add/product",
                      {
                        name: this.state.name,
                        type: this.state.type,
                        description: this.state.description,
                        price: this.state.price,
                        quantity: this.state.quantity,
                        serialNo: this.state.serialNo,
                        userId: this.props.route.params.uid,
                      }
                    )
                    .then(async (resp) => {
                      console.log("sd", resp.data);
                      await this.uploadImage(
                        this.state.image,
                        resp.data.product._id
                      );

                      this.setState({
                        name: "",
                        type: "",
                        description: "",
                        price: "",
                        quantity: "",
                        image: "",
                        serialNo: ""
                      })
                        alert("Product Publish Successfully");
                        this.props.navigation.navigate("Home");
                      
                      
                    })
                    .catch((err) => console.log(err));

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
    console.log("state", this.state);
    let { image } = this.state;
    return (
      !this.state.isQr ? ( 
      <View>
        <Modal isVisible={this.state.modal}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              marginHorizontal: 20,
              backgroundColor: "white",
              color: "white",
            }}
          >
            <Button title="From Gallery" onPress={() => this._pickImage()} />
            <View style={{ marginTop: 10 }} />
            <Button
              title="From Camera"
              onPress={() => this._pickImageCamera()}
            />
            <View style={{ alignItems: "flex-end" }}>
              <View style={{ marginTop: 20, width: 100 }}>
                <Button
                  title="Close"
                  color="#841584"
                  onPress={() => this.setState({ modal: false })}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            backgroundColor: "#2D3436",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
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
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, marginBottom: 30 }}
        >
          <KeyboardAvoidingView behavior={"position"}>
            <Form>
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => this.setState({ modal: true })}
                >
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
                <Input value={this.state.name} onChangeText={(name) => this.setState({ name })} />
              </Item>
              <Item floatingLabel last>
                <Label>Type</Label>
                <Input value={this.state.type} onChangeText={(type) => this.setState({ type })} />
              </Item>
              <Item floatingLabel last>
                <Label>Description</Label>
                <Input
                  value={this.state.description} onChangeText={(description) => this.setState({ description })}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Price</Label>
                <Input
                  value={this.state.price} onChangeText={(price) => this.setState({ price })}
                  keyboardType={"decimal-pad"}
                />
              </Item>
              <Item floatingLabel last>
                <Label keyboardType={"decimal-pad"}>Quantity</Label>
                <Input
                  value={this.state.quantity} onChangeText={(quantity) => this.setState({ quantity })}
                />
              </Item>

              <Item floatingLabel last>
                <Label keyboardType={"decimal-pad"}>Serial Code.</Label>
                <Input
                  value={
                    this.state.serialNo
                  }
                  value={this.state.serialNo} onChangeText={(serialNo) => {
                    this.setState({
                      serialNo,
                    });
                  }}
                />
              </Item>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "gray",
                    marginTop: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                  onPress={async () =>{
                    this.setState({isQr: true})
                  }}
                >
                  <Text style={{ color: "white" }}>Auto Select</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ textAlign: "center", color: "red" }}>
                {this.state.msg}
              </Text>
            </Form>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      ): (
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
  
        {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({scanned: false})} />}
      </View>
      )
    );
  }
}
