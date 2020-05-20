import React from "react";
import { View, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
export default class Login extends React.Component {
  render() {
    return (
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          paddingBottom: 50,
          backgroundColor: "whtie",
          flex: 1,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
        >
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input />
            </Item>
          </Form>
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#2D3436",
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Text>Already have account? Log In!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
