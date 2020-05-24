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
      email: "",
      password: ""
    };
  }

  login() {
    if (this.state.email) {
      if (EmailValidator.validate(this.state.email)) {
        if (this.state.password) {
          console.log("Pressed");
          axios
            .post(
              "https://secret-beach-00126.herokuapp.com/signin",
              {
                email: this.state.email.toLowerCase(),
                password: this.state.password,
              }
            )
            .then((resp) => {
              // alert(JSON.stringify(resp));
              console.log("gfh",resp.data);
              if (resp.data === "Incorrect password.") {
                // this.props.userAsync(resp.data);
                this.setState({
                  errMessage: "Password is incorrect",
                  loading: false,
                });
                Î;
              } else if (resp.data === "Email does not exist.") {
                // this.props.navigation.navigate("Map");
                this.setState({
                  errMessage: "Email does not exist.",
                  loading: false,
                });
              } else {
                console.log("final")
                this.props.navigation.navigate("Home",{
                  uid: resp.data._id
                })
              }
            })
            .catch((err) =>
              this.setState({ msg: err.message, loading: false })
            );
        } else {
          this.setState({
            errMessage: "Please Enter Your Password",
            loading: false,
          });
        }
      } else {
        this.setState({
          errMessage: "Please enter a valid email",
          loading: false,
        });
      }
    } else {
      this.setState({
        errMessage: "Please Enter Your Email",
        loading: false,
      });
    }
  }

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
        <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
          <Form>
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
              secureTextEntry={true}
              onChangeText={(password) =>
                this.setState({
                  password,
                })
              }
              value={this.state.password}/>
            </Item>
          </Form>
        </View>
        <View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#2D3436",
            paddingVertical:15,
            borderRadius:10
          }}

          onPress={() => this.login()}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>this.props.navigation.push('SignUp')}
          style={{
            alignItems: "center",
            paddingVertical:15,
            borderRadius:10
          }}
        >
          <Text>Don't have account? Sign Up!</Text>
        </TouchableOpacity>

        </View>

      </View>
    );
  }
}
