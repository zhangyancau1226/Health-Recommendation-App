import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./styles"
import { StylesConst } from '../../constants/const';

const InputWithIcons = props =>{
    const name = props.icon.name ? props.icon.name : StylesConst.icon.name;
    const size = props.icon.size ? props.icon.size : StylesConst.icon.size;
    const color = props.icon.color ? props.icon.color : StylesConst.icon.color;

    return(
        <View style = {styles.container}>
            <View style={{width:40}}>
                <Icon 
                    name={name} 
                    size = {size} 
                    color={color}></Icon>
            </View>
            <TextInput style={styles.textInput} {...props}></TextInput>
            
        </View>
    );
};

InputWithIcons.defaultProps = {
    icon:{
        name: StylesConst.icon.name,
        size: StylesConst.icon.size,
        color: StylesConst.icon.color,
    }
};

export default InputWithIcons;