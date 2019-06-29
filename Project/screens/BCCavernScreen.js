import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "../styles.js"

export default class BCCavernScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMount: false,
            list_of_r: [],
            myloop: [],
        }
    }
    // componentWillMount() {
    //     this.setState({
    //         isMount: true
    //     });
    // }

    // componentWillUnmount() {
    //     this.setState({
    //         isMount: false
    //     });
    // }

    async componentDidMount() {
        await fetch("https://caloriecal.tk/Restaurants.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: "BC Cavern Food Court",
            })
        }).then((response) => response.json()).then((responseJsonFromServer) => {
            this.setState({
                list_of_r: responseJsonFromServer.replace(/\n$/, "").split("\n"),
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    async goToFood(i) {
            let name = await this.state.list_of_r[i].split(",")[0];
            
        console.log(name.split(" ")[0]+"BC");
            this.props.navigation.navigate(name.split(" ")[0]+"BC");

    }


    changeLoop() {
        var pictures = [<Image style = {styles.restaurantimg} source={require("../assets/images/bc0.jpg")}/>,
        <Image style = {styles.restaurantimg} source={require("../assets/images/phoenix2.jpg")}/>,
        <Image style = {styles.restaurantimg} source={require("../assets/images/scenter2.jpg")}/>,
        <Image style = {styles.restaurantimg} source={require("../assets/images/phoenix3.jpg")}/>]
        for (let i = 0; i < this.state.list_of_r.length; i++) {
            this.state.myloop.push(
                <TouchableOpacity onPress = {() => this.goToFood(i)}  key={i}>
                    <View>
                        {pictures[i]}
                        <Text style={styles.restauranttextleft}>
                            {this.state.list_of_r[i].split(",")[0]}
                                                 
                        </Text>
                        <Text style={styles.restauranttextright}>
                            {this.state.list_of_r[i].split(",")[1]}  
                               
                        </Text>
                        </View>
                </TouchableOpacity>
            );
        }
        return this.state.myloop;
    }

    render() {
        return (
            <ScrollView style = {styles.wrapper}>
                
                {this.changeLoop()}
            </ScrollView>
        );
    }

}