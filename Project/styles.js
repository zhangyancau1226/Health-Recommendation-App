import {StylesConst} from './constants/const';
import {Dimensions} from 'react-native';


export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export default({
    container:{
        backgroundColor:'#f5f5f5',
    },
    wrapper: {
        flex: 1,
        padding: 10,
        backgroundColor: '#e6e8ed',
        paddingRight: 10,
    },

    header: {
        fontSize: Dimensions.get('window').width / 15,
        marginTop: Dimensions.get('window').height / 20,
        color: '#548ce5',
        paddingBottom: 50,
        textAlign: 'center', 
    },

    alignleft: {
        borderWidth: 12,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width / 2 - 20,
        height: 50,
    },

    alignright: {
        borderWidth: 12,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        justifyContent: 'flex-end',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width / 2 - 10,
        height: 50,
    },

    age_weights: {
        borderWidth: 12,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width / 3,
        height: 50,

    },

    sidebyside: {
        paddingBottom: 30,
        flexDirection:"row",
    },

    gender: {
        borderWidth: 12,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width -20,
        height: 50,
    },
    
    save: {
        alignself: 'stretch',
        backgroundColor: '#4377cc',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#ffffff',
        fontSize: 20,
    },
    titleFont:{
        fontSize:25,
        fontWeight:'bold'
    },
    logoAndTitle:{
        flex:1,
        paddingBottom:20,
        justifyContent:'center',
        alignItems:'center',
    },
    logoAndTitleText:{
        color: StylesConst.textColor,
    },
    login:{
        flex:1,
        alignItems:'center',
    },
    footer:{
        alignSelf:'center',
        paddingBottom:20
    },
    footerText:{
        color:StylesConst.textColor,
    },
    SHA1:{
        package:"com.healthguidance.app",
        key:"F9:F4:BF:CB:67:65:A4:47:82:C2:24:22:B5:5C:30:74:A5:3A:13:29"
    },

    checkimage: {
        height: 20, 
        width: 20,
    },

    btn: {
        paddingRight: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },

    backtouchable: {
        marginTop: Dimensions.get('window').height / 17,
        flexDirection: 'row',
    },

    backtxticon: {
        marginLeft: 10,
        fontSize: 20,
        color: '#548ce5',
        paddingLeft: width/30
    },

    container: {
        flex: 2,
        backgroundColor: '#e6e8ed',
      },
      headerstyle: {
        color: '#548ce5',
        fontSize: width / 15,
        paddingTop: height / 20,
        alignSelf: 'center',
        paddingBottom: 20,
      },
      foodcourtimg: {
        width: width -20,
        height: height / 4,
        alignSelf: 'stretch',
      },
      pic_title: {
        backgroundColor: '#696a6d',
        opacity: 0.5,
        color: '#fff',
        height: 25,
        lineHeight: 18,
        textAlign: 'center',
        //marginTop:114
      },
      operation_hour: {
        fontSize: width / 25,
        color: 'black',
        height: 30,
        marginLeft: 10,
      },
      address:{
        fontSize: width / 25,
        marginLeft:10,
      },
      get_direction:{
        paddingLeft: 8,
        fontSize : width/ 25,
      },
      text_output: {
        flexDirection: 'row',
        padding: 3,
      },
      location_icon: {
        marginLeft: 10,
        width: 20,
        height: 20,
        
      },

      restauranttextleft: {
          fontSize: width/ 23,
          fontWeight: 'bold',
          paddingLeft: 10,
          paddingTop: 5,
      },

      restauranttextright: {
        fontSize: width/ 25,
        color: '#7a7a87',
        paddingLeft: 10,
        height: 30,
    },

      restaurantname: {
          justifyContent: 'space-between',
          flexDirection: 'row'
      },

      restaurantimg: {
        width: width-20,
        height: height/5,
        alignSelf: 'stretch',
        marginRight: 10,
      },

      infoBar: {
        marginTop:height/25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      rightIcon: {
        resizeMode: 'contain',
      },

    QAText: {
        color: 'black',
        fontSize: width/20,
        lineHeight: height/25,
        
    }

});;