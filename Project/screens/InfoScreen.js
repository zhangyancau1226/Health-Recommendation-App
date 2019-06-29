import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Pedometer } from "expo";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { height, width } from '../styles.js';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { ACTION_SHOW_INPUT_METHOD_PICKER } from 'expo/build/IntentLauncherAndroid/IntentLauncherAndroid';



class ButtonRound extends React.Component {
  render() {
    const size = this.props.size;
    const fontSize = this.props.fontSize;
    const borderWidth = 1;

    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: this.props.backgroundColor,
        borderColor: this.props.color,
        width: size, height: size,
        borderRadius: size,
        borderWidth: borderWidth,
        paddingLeft: 10,
        paddingRight: 10
      }}>
        <Text style={{
          textAlign: 'center',

          fontSize: fontSize - 10 * borderWidth,
          lineHeight: fontSize - (Platform.OS === 'ios' ? 80 * borderWidth : borderWidth),
        }}>
          {this.props.title}
        </Text>

        <Text style={{
          textAlign: 'center',

          fontSize: fontSize - 20 * borderWidth,
          lineHeight: fontSize - (Platform.OS === 'ios' ? 80 * borderWidth : borderWidth),
        }}>
          {this.props.body}
        </Text>
      </View>
    );
  }
}

let date = new Date();
date.setMinutes(date.getMinutes() - 420);

let month = date.getUTCMonth() + 1; //months from 1-12
let day = date.getUTCDate();
if (day < 10) {
  day = day.toString();
  day = "0" + day;
}
if (month < 10) {
  month = month.toString();
  month = "0" + month;
}
let year = date.getUTCFullYear();
export default class HomeScreen extends React.Component {
  state = {
    user_id: 1,
    pastStepCount: 0,
    meals: [],
    calorie_need: 0,
    currentTake: 0,
    name: 'Zican Li',
    height_feet: 5,
    height_inch: 7, 
    age: 22,
    gender: 'Male',
    weight: 120,

  }

  async componentWillMount() {
    await this._subscribe();
    this._findmeals();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe(){
    const end = new Date();
    end.setMinutes(end.getMinutes() - 420);
    const start = new Date();
    start.setMinutes(start.getMinutes() - 420);
    start.setHours(-7);
    start.setMinutes(0);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({
          pastStepCount: result.steps
        });
      },
      error => {
        this.setState({
          pastStepCount: "Could not Get StepCount" + error
        });
      }
    );
    
    
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  async _findmeals() {
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
				calorie_need: Math.floor((10 * this.state.weight * 0.4536 + 6.26 * (this.state.height_feet * 30.48 + this.state.height_inch * 2.54) - 5 * this.state.age + 5)*1.6 + this.state.pastStepCount*0.03)
      }) 
      console.log(this.state.calorie_need)
		}
		else {
			this.setState({
				calorie_need: Math.floor((10 * this.state.weight * 0.4536 + 6.26 * (this.state.height_feet * 30.48 + this.state.height_inch * 2.54) - 5 * this.state.age - 161)*1.6 + this.state.pastStepCount*0.03)
			})
    }
    

    await fetch("https://caloriecal.tk/FindMeal.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        eat_time: year + "-" + month + "-" + day
      })
    }).then((response) => response.json()).then((responseJsonFromServer) => {
      this.setState({
        meals: responseJsonFromServer.split(","),
      });
    }).catch((error) => {
      console.log(error);
    });

    let take = parseInt(this.state.meals[0]) + parseInt(this.state.meals[1]) + parseInt(this.state.meals[2]) + parseInt(this.state.meals[3]);
    this.setState({
      currentTake: take
    });
    await fetch("https://caloriecal.tk/update_steps.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        steps: this.state.pastStepCount,
        date: year + "-" + month + "-" + day 
      })
    });

    
  }



  render() {
    const barWidth = Dimensions.get('screen').width - 20;

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.infoBar}>
          <View style={styles.leftContainer} />
          <Text style={{ fontSize: 25 }}>Daily Calories ({month}/{day})</Text>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserInfo')}>
              <Icon name="cog" size={30} color='black'></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles1.label}>Calorie Bar Based on Your BMI</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={Math.min(this.state.currentTake / this.state.calorie_need * 100, 100)}
            backgroundColorOnComplete="#DC143C"
            backgroundColor="#43bc64"
          />
          {/* change percentage to variable calories burned collected/calories calculated by bmi */}
          <Text style={{ marginTop: 10, alignSelf: 'center' }}>Calorie Percentage: {parseInt(this.state.currentTake / this.state.calorie_need * 100)}%</Text>
          {/* dont need this button after updated. onpress when press the food */}

        </View>

        <View style={{
          marginTop: 30,
          justifyContent: 'space-between',
          flex: 1,
          flexDirection: 'row'
        }}>

          <View flexDirection={'column'}
            alignItems={'center'}>
            {(parseInt(this.state.meals[0]) != 0) &&
            <ButtonRound
              title={this.state.meals[0]}
              body={'Cal'}
              color="black"
              fontSize={32}
              size={80}
              backgroundColor='#5E9BE0'
            />}
            {(parseInt(this.state.meals[0]) == 0)&&
            <ButtonRound
            title={this.state.meals[0]}
            body={'Cal'}
            color="black"
            fontSize={32}
            size={80}
            backgroundColor='white'
          />}
            <Text>Breakfast</Text>
          </View>

          <View flexDirection={'column'}
            alignItems={'center'}>
          {(parseInt(this.state.meals[1]) != 0) &&
            <ButtonRound
              title={this.state.meals[1]}
              body={'Cal'}
              color="black"
              fontSize={32}
              size={80}
              backgroundColor='#5E9BE0'
            />}
            {(parseInt(this.state.meals[1]) == 0) &&
            <ButtonRound
            title={this.state.meals[1]}
            body={'Cal'}
            color="black"
            fontSize={32}
            size={80}
            backgroundColor='white'
          />}
            <Text>Lunch</Text>
          </View>

          <View flexDirection={'column'}
            alignItems={'center'}>

          {
            (parseInt(this.state.meals[2]) == 0) &&
            <ButtonRound
              title={'0'}
              body={'Cal'}
              color="black"
              fontSize={32}
              size={80}
              backgroundColor='white'
            />
            }
          
          {
            (parseInt(this.state.meals[2]) != 0) &&
            <ButtonRound
              title={this.state.meals[2]}
              body={'Cal'}
              color="black"
              fontSize={32}
              size={80}
              backgroundColor='#5E9BE0'
            />
            }
      
            <Text>Dinner</Text>
          </View>




        </View>


        <View style={{
          marginTop: 20,
          flex: 1,

          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View />

          <View />
          <View flexDirection={'column'}
            alignItems={'center'}>
            <ButtonRound
              title={this.state.pastStepCount}
              body={'Steps'}
              color="black"
              fontSize={32}
              size={80}
              backgroundColor='#5E9BE0'
            />
            <Text>Walking Steps</Text>
          </View>
          <View />
          <View flexDirection={'column'}
            alignItems={'center'}>

            {
              (parseInt(this.state.meals[3]) == 0) &&
              <ButtonRound
                title={0}
                body={'Cal'}
                color="black"
                fontSize={32}
                size={80}
                backgroundColor='white'
              />

            }

            {
              (parseInt(this.state.meals[3]) != 0) &&
              <ButtonRound
                title={this.state.meals[3]}
                body={'Cal'}
                color="black"
                fontSize={32}
                size={80}
                backgroundColor='#5E9BE0'
              />
            }

            <Text>Other Food</Text>
          </View>
          <View />
          <View />

        </View>

        <View borderRadius={10}
          marginTop={30}
          backgroundColor={'white'}
          paddingLeft={10}
          paddingRight={10}
          justifyContent={'center'}
          alignItems={'center'}
          height={50}>

          <Text style={{ fontSize: 30 }}>Calorie Summary</Text>
        </View>

        {(this.state.currentTake - this.state.calorie_need) < 0 &&
          <View borderRadius={10}
            marginTop={10}
            backgroundColor={'#43bc64'}
            paddingLeft={10}
            paddingRight={10}
            justifyContent={'center'}
            alignItems={'center'}
            height={50}>

            <Text style={{ fontSize: 30 }}>Calorie Left: {-(this.state.currentTake - this.state.calorie_need)} Cal</Text>


          </View>
        }
        {(this.state.currentTake - this.state.calorie_need) > 0 &&

          <View borderRadius={10}
            marginTop={10}
            backgroundColor={'#DC143C'}
            paddingLeft={10}
            paddingRight={10}
            justifyContent={'center'}
            alignItems={'center'}
            height={50}>

            <Text style={{ fontSize: 30 }}>Calorie Exceed: {(this.state.currentTake - this.state.calorie_need)} Cal</Text>
          </View>

        }


      </ScrollView>

    );
  }
}


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
  label: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 15
  }
});