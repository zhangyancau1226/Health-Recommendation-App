import React from 'react';
import { View, Text, TouchableOpacity, Alert, AsyncStorage, ScrollView} from 'react-native';

export default class GrillePX extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ActivityIndicator_Loading: false,
            list_of_r: [],
            myloop: [],
            user_id: 1,
        }
    }

    submit(i) {
        Alert.alert(
            "Comfirm Your Food and Calories",
            "Name: " + this.state.list_of_r[i].split(",")[0] + "\n Calories: " + this.state.list_of_r[i].split(",")[2],
            [
                { text: 'Confirm', onPress: () => { this.food_confirm(i) }, style: 'cancel' },
                { text: 'Cancel', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        );
    }

    food_confirm(i) {
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

        fetch("https://caloriecal.tk/EatFood.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                amount: parseInt(this.state.list_of_r[i].split(",")[2]),
                date: year + "-" + month + "-" + day,
                food_name: this.state.list_of_r[i].split(",")[0],
                restaurant_name: "Grille Works",
                eat_time: date.toISOString().slice(0, 19).replace('T', ' ')
            })
        }).then((response) => response.json()).then((responseJsonFromServer) => {
            this.setState({
                ActivityIndicator_Loading: false,
                list_of_r: responseJsonFromServer.replace(/\n$/, "").split("\n"),
            });
        }).catch((error) => {
            console.log(error);
            this.setState({ ActivityIndicator_Loading: false })
        });
    }

    async componentWillMount() {
        await fetch("https://caloriecal.tk/Foods.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurant: "Grille Works",
            })
        }).then((response) => response.json()).then((responseJsonFromServer) => {
            this.setState({
                ActivityIndicator_Loading: false,
                list_of_r: responseJsonFromServer.replace(/\n$/, "").split("\n"),
            });
        }).catch((error) => {
            console.log(error);
            this.setState({ ActivityIndicator_Loading: false })
        });
        AsyncStorage.getItem("userInfo").then(
            value => {
                if (value !== null) {
                    this.setState({
                        user_id: value.split(",")[0]
                    });
                }
            }
        );
    }

    changeLoop() {
        for (let i = 0; i < this.state.list_of_r.length; i++) {
            this.state.myloop.push(
                <View key={i} style = {{borderBottomWidth:1, borderBottomColor: 'black'}}>
                    <TouchableOpacity onPress={() => { this.submit(i) }}>
                        <Text>
                            {this.state.list_of_r[i].split(",")[0]}
                            {"\n"}
                            Min Calorie: {this.state.list_of_r[i].split(",")[1]}
                            {"\n"}
                            Max Calorie: {this.state.list_of_r[i].split(",")[2]}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return this.state.myloop;
    }
    render() {
        return (
            <ScrollView>
                {this.changeLoop()}
            </ScrollView>
        );
    }
}