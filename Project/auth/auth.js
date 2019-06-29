import {AsyncStorage} from "react-native";

export const onSignIn = (userid) =>  AsyncStorage.setItem('userInfo',userid);

export const onSignOut = () => AsyncStorage.removeItem('userInfo');

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("userInfo").then(res => {
            if(res !== null){
                resolve(true);
            }else{
                resolve(false);
            }
        }).catch(err => reject(err));
    });
};

export const get_info = async() => {
    let userinfo = '';
    try{
        userinfo = await AsyncStorage.getItem("userInfo") || 'none';
    }catch(error){
        console.log(error.message);
    }
    return userinfo.split(",");
};