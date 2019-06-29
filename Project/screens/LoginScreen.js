import React from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import styles from '../styles'
import TextInput from '../components/InputWithIcons/index';
import Button from 'apsl-react-native-button';
import {onSignIn} from "../auth/auth";


export default class LoginScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Username:"",
            Password:"",
            ActivityIndicator_Loading : false,
        }
    }
    
    handleUsername = (text) =>{
        this.setState(prevState => ({
            Username:text
        }));
    };

    handlePassword = (text) =>{
        this.setState(prevState => ({
            Password:text
        }));
    };

    handleLogin = () => {
        this.setState({ActivityIndicator_Loading : true}, ()=>{
			fetch('https://caloriecal.tk/Login.php',{
				method:'POST',
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json',
				},
				body:JSON.stringify({
					email : this.state.Username,
					password: this.state.Password,
				})
			}).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                // alert(responseJsonFromServer);

                if(responseJsonFromServer === "Fail"){
                    alert("Fail");
                }else{
                    onSignIn(responseJsonFromServer).then(() => this.props.navigation.navigate("Main"));
                }
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }

    render(){
        return(        
        <View style={styles.container}>
            <View style={styles.logoAndTitle}>
                {/* <Image resizeMode = 'cover' source = {require('../assets/images/loginlogo.png')}></Image> */}
                {/* <Text style={styles.logoAndTitleText}>Your Diet Manager in UCI</Text> */}
            </View>
            <View style={styles.login}>
                <TextInput 
                    placeholder="Enter Your Email" 
                    icon={{name:"user",size:40,color:"#bbb"}}
                    onChangeText = {this.handleUsername}
                ></TextInput>
                <TextInput 
                    placeholder="Enter Your Password" 
                    icon={{name:"lock",size:40,color:"#bbb"}}
                    secureTextEntry = {true}
                    onChangeText = {this.handlePassword}
                ></TextInput>
            </View>
            <Button
                style = {{backgroundColor : 'red', borderWidth: 0, margin:10}}
                textStyle = {{fontSize:18}}
                onPress = {this.handleLogin}
            >        
            Login
            </Button>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Author by Zican Li</Text>
            </View>
        </View>
        )};
}