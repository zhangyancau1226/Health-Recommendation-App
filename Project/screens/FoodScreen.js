import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import { PermissionsAndroid } from 'react-native';

import styles from '../styles.js';



export default class LinksScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      params: [
        {
          key: "travelmode",
          value: "walking"        // may be "driving", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ],
      SCAddress: { latitude: 33.6481045, longitude: - 117.8418266 },
      PXAddress: { latitude: 33.6458381, longitude: - 117.8418829 },
      BCAddress: { latitude: 33.6457533, longitude: - 117.8443773 },
      latitude:null,
      longitude:null,
    }
  }

  eastFoodCourtNav(){
    this.props.navigation.navigate("StudentCenterPage");
  }

  phoenixNav(){
    this.props.navigation.navigate("PhoenixPage");
  }  

  BCCarvenNav(){
    this.props.navigation.navigate("BCCavernPage");
  }

  gotoSC(){
    const data = {
      source:{
        latitude:this.state.latitude,
        longitude:this.state.longitude
      },
      destination:this.state.SCAddress,
      params:this.state.params
    }
    getDirections(data);
  }

  gotoPX(){
    const data = {
      source: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      },
      destination: this.state.PXAddress,
      params: this.state.params
    }
    getDirections(data);
  }

  gotoBC(){
    const data = {
      source: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      },
      destination: this.state.BCAddress,
      params: this.state.params
    }
    getDirections(data);
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (granted) {
        console.log("You can use the ACCESS_FINE_LOCATION")
      }
      else {
        console.log(granted);
        console.log("ACCESS_FINE_LOCATION permission denied")
      }

    } catch (err) {
      console.warn(err)
    }

    await navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => { if (error) geolocation.requestAuthorization(); },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }
  
  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <Text style={styles.headerstyle}>
          Food Court Near You
         </Text>

        <View>
          <TouchableOpacity onPress = {() => this.phoenixNav()}>
            <Image source={require('../assets/images/phoenix.png')}
              style={styles.foodcourtimg} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {this.gotoPX()}}>
            <View style={styles.text_output}>
              <Text style={styles.address}>
                Phoenix Food Court
                
              </Text>
            </View>

            <View style={styles.text_output}>
            <Image source={require('../assets/images/Get_direction.png')}
                style={styles.location_icon} />
                <Text style = {styles.get_direction}>
                  Get Direction
                </Text>
            </View>
          </TouchableOpacity>
          

          <View style={styles.text_output}>
            <Text style={styles.operation_hour}>
              Operation Hour: {"\n"}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress = {() => this.eastFoodCourtNav()}>
            <Image source={require('../assets/images/east_food_court.png')}
              style={styles.foodcourtimg} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.gotoSC()}>
            <View style={styles.text_output}>
              <Text style = {styles.address}>
                Student Center Food Court
              </Text>
            </View>

            <View style={styles.text_output}>
            <Image source={require('../assets/images/Get_direction.png')}
                style={styles.location_icon} />
                <Text style = {styles.get_direction}>
                  Get Direction
                </Text>
            </View>
          </TouchableOpacity>
          

          <View style={styles.text_output}>
            <Text style={styles.operation_hour}>
              Operation Hour: {"\n"}
            </Text>
          </View>

        </View>

        <View>
          
          <TouchableOpacity onPress = {() => this.BCCarvenNav()}>
            <Image source={require('../assets/images/BC_Cavern.png')}
              style={styles.foodcourtimg} />
          </TouchableOpacity>

        <TouchableOpacity onPress={() => this.gotoBC()}>
            <View style={styles.text_output}>
              <Text style = {styles.address}>
                BC's Cavern Food Court
              </Text>
            </View>

            <View style={styles.text_output}>
            <Image source={require('../assets/images/Get_direction.png')}
                style={styles.location_icon} />
                <Text style = {styles.get_direction}>
                  Get Direction
                </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.text_output}>
            <Text style={styles.operation_hour}>
              Operation Hour: {"\n"}
            </Text>
          </View>
        </View>

      </ScrollView>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     backgroundColor: '#e6e8ed',
//   },
//   headerstyle: {
//     color: 'black',
//     fontSize: width / 18,
//     paddingTop: height / 20,
//     alignSelf: 'center',
//     paddingBottom: 20,
//   },
//   foodcourtimg: {
//     width: width,
//     height: height / 4,
//     alignSelf: 'stretch',
//   },
//   pic_title: {
//     backgroundColor: '#696a6d',
//     opacity: 0.5,
//     color: '#fff',
//     height: 25,
//     lineHeight: 18,
//     textAlign: 'center',
//     //marginTop:114
//   },
//   operation_hour: {
//     fontSize: width / 25,
//     color: 'black',
//     height: 30,
//     marginLeft: 16,
//   },
//   address:{
//     fontSize: width / 25,
//     marginLeft:16,
//   },
//   get_direction:{
//     paddingLeft: 8,
//     fontSize : width/ 25,
//   },
//   text_output: {
//     flexDirection: 'row',
//     padding: 3,
//   },
//   location_icon: {
//     marginLeft: 16,
//     width: 20,
//     height: 20,
    
//   }
// });