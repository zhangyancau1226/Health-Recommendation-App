import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View,TextInput, Picker, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';
import {get_info} from '../auth/auth';

export default class StartScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			data: ['Male', 'Female'],
			checked: 0,
			info: [],
			firstName: '',
			lastName: '',
			gender: '',
			age: '',
			feet: '',
			inch: '',
			weight: '',
			key: '',
			ActivityIndicator_Loading: false,
		}
	};

	handleFirstName = text =>{
		this.setState(prevState =>({
			firstName:text
		}));
	};

	handleLastName = text =>{
		this.setState(prevState =>({
			lastName:text
		}));
	};

	handlegender = (itemValue,itemIndex) =>{
		this.setState(prevState =>({
			gender:itemValue
		}));
	};

	handleage = text =>{
		this.setState(prevState =>({
			age:text
		}));
	};

	handleFeet = text =>{
		this.setState(prevState =>({
			feet:text
		}));
	};

	handleInch = text =>{
		this.setState(prevState =>({
			inch:text
		}));
	};

	handleWeight = text =>{
		this.setState(prevState =>({
			weight:text
		}));
	};
	
	Update_Data_Into_Mysql = ()=>{
		if(this.state.firstName === ''){
			this.state.firstName = this.state.info[1];
		}
		if(this.state.lastName === ''){
			this.state.lastName = this.state.info[2];
		}
		if(this.state.inch === ''){
			this.state.inch = Math.floor(parseInt(this.state.info[3]) / 30.48).toString();
		}
		if(this.state.feet === ''){
			this.state.feet = Math.round(((parseInt(this.state.info[3]) / 2.54) % 12)).toString();
		}
		if(this.state.gender === ''){
			this.state.gender = this.state.info[5];
		}
		if(this.state.weight === ''){
			this.state.weight = this.state.info[4];
		}
		if(this.state.age === ''){
			this.state.age = this.state.info[6];
		}
		this.setState({ActivityIndicator_Loading : true}, ()=>{
			fetch('https://caloriecal.tk/update_User.php',{
				method:'POST',
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json',
				},
				body:JSON.stringify({
					user_id : this.state.info[0],
					first_name : this.state.firstName,
					last_name : this.state.lastName,
					height : Math.round(parseInt(this.state.inch) * 2.54 + parseInt(this.state.feet) * 30.48),
					weight : parseInt(this.state.weight),
					age : parseInt(this.state.age),
					gender : this.state.gender,
				})
			}).then((response) => response.json()).then((responseJsonFromServer) => {
				alert(responseJsonFromServer);
				this.setState({ActivityIndicator_Loading : false});
			}).catch((error) =>{
				console.error(error);
				this.setState({ActivityIndicator_Loading : false});
			});
		});

	}

	async componentDidMount(){
		AsyncStorage.getItem("userInfo").then(
			value => {
				this.setState({
					info: value.split(","),
				})
			}
		);
	}

	render() {
		//var info = info_str.split(",");
		
		// const {goBack} = this.props.navigation;
    	return (
			
			<ScrollView style={styles.wrapper}>
			
            <View>
			<TouchableOpacity style = {styles.backtouchable} onPress= {() => this.props.navigation.navigate("Main")} >
				<Icon style = {styles.backtxticon} name = 'chevron-left'/>
			
			</TouchableOpacity>
                <Text style = {styles.header}>Your Infomation</Text>
                <View style={styles.sidebyside}>
                    <View style={{flex:1}}>
                        <TextInput
							placeholder="First name" 
							defaultValue = {this.state.info[1]}
							onChangeText = {this.handleFirstName}
                            style= {styles.alignleft}  />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput 
							placeholder="Last name" 
							defaultValue = {this.state.info[2]}
							onChangeText = {this.handleLastName}
                            style = {styles.alignright} />
                    </View>
                </View>
                <View style = {{paddingBottom: 30,}}>
                    <TextInput
						placeholder= "Age"
						onChangeText = {this.handleage}
						defaultValue = {this.state.info[6]}
                        style= {styles.age_weights} />
                </View>

                <View style = {styles.sidebyside}>
            		{this.state.data.map((data, key) => {
					return(
						<View style={{ flexDirection: 'row' }}>
						{this.state.checked == key ? (
							<TouchableOpacity style={styles.btn}>
							<Image
								style={styles.checkimage}
								source={
									require('../assets/images/checked2.png')
								}
							/>
							<Text style = {{marginLeft: 10, color: '#548ce5', fontSize: 20,}} >{data}</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
							onPress={() => {
								this.setState({ checked: key });
							}}
							style={styles.btn}>
							<Image
								style={styles.checkimage}
								source={
								require('../assets/images/unchecked2.png')
								}
							/>
							<Text style = {{marginLeft: 10, color: '#548ce5', fontSize: 20,}}>{data}</Text>
							</TouchableOpacity>
                 	 )}
                </View>
              );
            })}
          </View>

                <View style= {styles.sidebyside}>
                    <View style={{flex:1}}>
                        <TextInput 
							placeholder="Feet"
							onChangeText = {this.handleFeet} 
							defaultValue = {Math.floor(parseInt(this.state.info[3]) / 30.48).toString()}
                            style={styles.alignleft} /> 
                    </View>
                    <View style={{flex:1}}>
                        <TextInput 
							placeholder="Inch"
							onChangeText = {this.handleInch} 
							defaultValue = {Math.round(((parseInt(this.state.info[3]) / 2.54) % 12)).toString()}
                            style = {styles.alignright} />
                    </View>
                </View>

                <View style = {{paddingBottom: 40,}}>
                    <TextInput
						placeholder= "Weights (lbs)"
						onChangeText = {this.handleWeight}
						defaultValue = {this.state.info[4]}
                        style= {styles.age_weights} />
                </View>

                <TouchableOpacity style = {styles.save}
                  onPress = {this.Update_Data_Into_Mysql}>

                    <Text style = {styles.text}>Save</Text> 
                </TouchableOpacity> 

				<Button
				onPress= {() => this.props.navigation.navigate("Main")}
				title="Back">
			</Button>  
            </View>
          
        </ScrollView>
			
    	);
  }
}

