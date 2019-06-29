import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage} from 'react-native';
import {Pedometer} from "expo";
import { setLightEstimationEnabled } from 'expo/build/AR';
import styles from "../styles.js"

let enddate = new Date();
enddate.setMinutes(enddate.getMinutes(), - 420);
enddate.setDate(enddate.getDate() - 1);
let endmonth = enddate.getUTCMonth() + 1;
let endday = enddate.getUTCDate();
let endyear = enddate.getUTCFullYear();

if (endday < 10) {
	endday = endday.toString();
	endday = "0" + endday;
}
if (endmonth < 10) {
	endmonth = endmonth.toString();
	endmonth = "0" + endmonth;
}

let startdate = new Date();
startdate.setMinutes(startdate.getMinutes() - 420);
startdate.setDate(enddate.getDate() - 7);

let startmonth = startdate.getUTCMonth() + 1; //months from 1-12
let startday = startdate.getUTCDate();
let startyear = startdate.getUTCFullYear();

if (startday < 10) {
	startday = startday.toString();
	startday = "0" + startday;
}
if (startmonth < 10) {
	startmonth = startmonth.toString();
	startmonth = "0" + startmonth;
}


export default class QAScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			weeklyeat: [],
			weeklywalk: [],
			eatavg: 0,
			eatmax: 0,
			eatmaxdate: "",
			eatmin: 100000,
			eatmindate: "",

			walkavg: 0,
			walkmax: 0,
			walkmaxdate: "",
			walkmin: 10000000,
			walkmindate: "",
			user_id: 2,
			name: "Ziyang Chen",
			gender: "Male",
			height_feet: 5,
			height_inch: 11,
			age: 21,
			weight: 180,
			calorie_need: 3000
		};
	}

	componentWillMount(){
		this._generate_report();
	}


	async _generate_report(){
		await AsyncStorage.getItem("userInfo").then(
			value => {
				if (value !== null) {
					let info = value.split(",");
					this.setState({
						user_id:info[0],
						name: info[1] + " " + info[2],
						height_feet: Math.floor(parseInt(info[3])/30.48),
						height_inch: Math.round(parseInt(info[3])%30.48/2.54),
						weight: info[4],
						gender: info[5],
						age:info[6],
					});
				}
			}
		);

		if (this.state.gender === 'Male')
		{
			this.setState({
				calorie_need: Math.floor((10 * this.state.weight * 0.4536 + 6.26 * (this.state.height_feet * 30.48 + this.state.height_inch * 2.54) - 5 * this.state.age + 5)*1.6)
			}) 
		}
		else {
			this.setState({
				calorie_need: Math.floor((10 * this.state.weight * 0.4536 + 6.26 * (this.state.height_feet * 30.48 + this.state.height_inch * 2.54) - 5 * this.state.age - 161)*1.6)
			})
		}

		await fetch("https://caloriecal.tk/WeeklyReport.php", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: this.state.user_id,
				start_date: startyear + "-" + startmonth + "-" + startday,
				end_date: endyear + "-" + endmonth + "-" + endday
			})
		}).then((response) => response.json()).then((responseJsonFromServer) => {
			this.setState({
				weeklyeat: responseJsonFromServer.replace(/\n$/, "").split("\n")
			});
		}).catch((error) => {
			console.log(error);
		});

		let sum = 0;
		for (let i = 0; i < this.state.weeklyeat.length; i++) {
			let temp = parseInt(this.state.weeklyeat[i].split(",")[1]);
			if(this.state.eatmax < temp){
				this.setState({
					eatmax: temp,
					eatmaxdate: this.state.weeklyeat[i].split(",")[0].split(" ")[0]
				})
			}
			if(this.state.eatmin > temp){
				this.setState({
					eatmin: temp,
					eatmindate: this.state.weeklyeat[i].split(",")[0].split(" ")[0]
				})
			}
			sum += temp;
		}
		sum = Math.round(sum / this.state.weeklyeat.length);
		this.setState({
			eatavg: sum
		});

		console.log(this.state.weeklyeat);
		console.log(this.state.eatavg);
		console.log(this.state.eatmax);
		console.log(this.state.eatmaxdate);
		console.log(this.state.eatmin);
		console.log(this.state.eatmindate);

		await fetch("https://caloriecal.tk/WeeklySteps.php", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: this.state.user_id,
				start_date: startyear + "-" + startmonth + "-" + startday,
				end_date: endyear + "-" + endmonth + "-" + endday
			})
		}).then((response) => response.json()).then((responseJsonFromServer) => {
			console.log(responseJsonFromServer);
			this.setState({
				weeklywalk: responseJsonFromServer.replace(/\n$/, "").split("\n")
			});
		}).catch((error) => {
			console.log(error);
		});

		sum = 0;
		for (let i = 0; i < this.state.weeklywalk.length; i++){
			let temp = parseInt(this.state.weeklywalk[i].split(",")[1]);
			if(temp < this.state.walkmin){
				this.setState({
					walkmin: temp,
					walkmindate: this.state.weeklywalk[i].split(",")[0].split(" ")[0],
				});
			}
			if(temp > this.state.walkmax){
				this.setState({
					walkmax: temp,
					walkmaxdate: this.state.weeklywalk[i].split(",")[0].split(" ")[0],
				})
			}
			sum += temp;
		}
		sum = Math.round(sum / this.state.weeklywalk.length);
		this.setState({
			walkavg: sum
		});

		console.log(this.state.weeklywalk);
		console.log(this.state.walkavg);
		console.log(this.state.walkmax);
		console.log(this.state.walkmaxdate);
		console.log(this.state.walkmin);
		console.log(this.state.walkmindate);

	}

	
  	render() {
    	return (
			<ScrollView style={styles.wrapper}>
        <Text style={styles.headerstyle}>
          Recommendation
         </Text>
				<View style = {{paddingLeft: 10, paddingRight: 10, borderBottomColor: '#BCB8B8', borderBottomWidth: 1}}>
				 <Text style = {styles.QAText}>
					Hi, <Text style = {{color: 'red'}}>{this.state.name}</Text> {"\n"}
					Let's see if I know you well{'\n'}
					You are a <Text style = {{color: 'red'}}>{this.state.age}</Text>-year-old <Text style = {{color: 'red'}}>{this.state.gender}</Text>, {"\n"}
					around average height <Text style = {{color: 'red'}}>{this.state.height_feet}</Text>ft <Text style = {{color: 'red'}}>{this.state.height_inch}</Text>in and <Text style = {{color:'red'}}>{this.state.weight}</Text>lb{"\n"}
					
				</Text>
				</View>

				<View style = {{paddingLeft: 10, paddingRight: 10, borderBottomColor: '#BCB8B8', borderBottomWidth: 1}}>
				 <Text style = {styles.QAText}>
					For the past week, your average was <Text style = {{color: 'red'}}>{this.state.eatavg}</Text> Cals.{'\n'}
					Based on your information, you should take <Text style = {{color: 'red'}}>{this.state.calorie_need}</Text> per day.{'\n'}
					You had <Text style = {{color: 'red'}}>Fast Food</Text> the most, for <Text style = {{color: 'red'}}>4</Text> day.{'\n'}
					You should eat less <Text style = {{color: 'red'}}>Fast Food</Text> and more <Text style = {{color: 'red'}}>Vegetable</Text>, such as <Text style = {{color: 'red'}}>the mixed vegetable</Text> from <Text style = {{color: 'red'}}>Panda Express</Text>{'\n'}
					Why don't you go to <Text style = {{color: 'red'}}>Jumba Juice</Text> some time?{'\n'}
					On <Text style = {{color:'red'}}>{this.state.eatmindate}</Text>, you didn't eat too much: <Text style = {{color: 'red'}}>{this.state.eatmin}</Text> Cal.{'\n'}
					However, on <Text style = {{color: 'red'}}>{this.state.eatmaxdate}</Text>, you ate a lot: <Text style = {{color: 'red'}}>{this.state.eatmax}</Text> Cal.{'\n'}
					Did you go to a party?{'\n'}
				</Text>
				</View>

				<View style = {{paddingLeft: 10, paddingRight: 10, borderBottomColor: '#BCB8B8', borderBottomWidth: 1}}>
				 <Text style = {styles.QAText}>
				 For the past week,{"\n"}
					You walked <Text style = {{color: 'red'}}>{this.state.walkavg}</Text> steps for average each day,{'\n'}
					On <Text style = {{color:'red'}}>{this.state.walkmaxdate}</Text>, you walked the most: <Text style = {{color: 'red'}}>{this.state.walkmax}</Text> steps.{'\n'}
					However, on <Text style = {{color: 'red'}}>{this.state.walkmindate}</Text>, you barely moved: <Text style = {{color: 'red'}}>{this.state.walkmin}</Text> steps.{'\n'}
					Hope you had a good rest that day.{'\n'}
					Overall, your activity level was <Text style = {{color: 'red'}}>Slightly active lifestyle</Text> you should exercise or sports <Text style = {{color: 'red'}}>4-5 </Text>days/week.{'\n'}
				</Text>
				</View>

				 
			</ScrollView>
    
      );
  	}
}

