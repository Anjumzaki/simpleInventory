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
import * as EmailValidator from "email-validator";
import axios from 'axios'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      errMessage: ''
    };
  }

  signup(){
    console.log("called")
    if (this.state.name) {
      if (this.state.email) {
        if (EmailValidator.validate(this.state.email)) {
            if (this.state.password === this.state.cpassword) {
            
              axios.post("https://secret-beach-00126.herokuapp.com/signup",{
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
              })
                .then(resp => {
                    console.log("resp",resp)

                    if(resp.data === 'User already exists!'){
                      this.setState({errMessage: 'User already exists!'})
                    }else{
                      this.props.navigation.navigate("Login")
                    }
                })
                .catch(err => this.setState({errMessage: "Email already exist!"}))

            } else {
              this.setState({
                errMessage: "Password does not match",
                
              });
            }
         
        } else {
          this.setState({
            errMessage: "Please enter correct email",
            
          });
        }
      } else {
        this.setState({
          errMessage: "Please enter your email",
          
        });
      }
    } else {
      this.setState({
        errMessage: "Please enter your name",
        loading: false,
      });
    }
  }

  render() {
    console.log("asdas",this.state)
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
              <Input 
              onChangeText={(name) =>
                this.setState({
                  name,
                })
              }
              value={this.state.name}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
              onChangeText={(email) =>
                this.setState({
                  email,
                })
              }
              value={this.state.email}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
              onChangeText={(password) =>
                this.setState({
                  password,
                })
              }
              value={this.state.password}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input 
              onChangeText={(cpassword) =>
                this.setState({
                  cpassword,
                })
              }
              value={this.state.cpassword}/>
            </Item>
          </Form>
        </View>
        <View>
          <Text style={{textAlign: "center", color: "red", marginBottom: 20}}>
            {this.state.errMessage}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#2D3436",
              paddingVertical: 15,
              borderRadius: 10,
            }}
            onPress={() => this.signup()}
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
