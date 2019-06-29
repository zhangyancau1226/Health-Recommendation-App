import React from 'react';
import {Text, View } from 'react-native';


export default class People extends React.Component{
    render(){
        const {firstName, lastName, gender, age, height, weight} = this.props;
        return(
            <View>
                <Text>FirstName : {firstName}</Text>
                <Text>Last Name : {lastName}</Text>
                <Text>Gender : {gender}</Text>
                <Text>Age : {age}</Text>
                <Text>Height : {height}</Text>
                <Text>Weight : {weight}</Text>
            </View>
        );
    };
}