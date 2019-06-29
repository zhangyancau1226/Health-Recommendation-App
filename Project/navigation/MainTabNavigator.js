import React from 'react';
import { Platform, StatusBar, Button , TouchableOpacity} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator , createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles.js';

import TabBarIcon from '../components/TabBarIcon';
import InfoScreen from '../screens/InfoScreen';
import FoodScreen from '../screens/FoodScreen';
import QAScreen from '../screens/QAScreen';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import SubwayBC from '../screens/ResScreens/SubwayBC';
import SubwaySC from '../screens/ResScreens/SubwaySC';
import TortillaBC from '../screens/ResScreens/TortillaBC';
import Wendys from '../screens/ResScreens/Wendys';
import Einstein from '../screens/ResScreens/Einstein';
import GreensToGo from '../screens/ResScreens/Green';
import GrilleBC from '../screens/ResScreens/GrilleBC';
import Panda from '../screens/ResScreens/Panda';
import Wahoo from '../screens/ResScreens/Wahoo';
import BCPizza from '../screens/ResScreens/BCPizza';
import TortillaPX from '../screens/ResScreens/TortillaPX';
import GrillePX from '../screens/ResScreens/GrillePX';
import Ramen from '../screens/ResScreens/Ramen';

import PhoenixScreen from '../screens/PhoenixScreen';
import StudentCenterScreen from '../screens/StudentCenterScreen';
import BCCavernScreen from '../screens/BCCavernScreen';



// const headerStyle = {
//   marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
// };

export const StudentCenter = createStackNavigator(
  {StudentCenter: {
    screen: StudentCenterScreen,
    navigationOptions: ({navigation}) =>
      ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("Main")}>
        <Icon style = {styles.backtxticon} name = 'chevron-left'/>
        </TouchableOpacity>
    })}},
    

  );

export const Phoenix = createStackNavigator({
  Phoenix: {
    screen: PhoenixScreen,
    navigationOptions: ({navigation}) =>
      ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("Main")}>
        <Icon style = {styles.backtxticon} name = 'chevron-left'/>
        </TouchableOpacity>,
      headerTitleStyle: { alignSelf: 'center' , fontSize: 20},
      title: 'Phoenix Food Court',
    })}
  }
);

export const BCCavern = createStackNavigator({
  BCCavern:{
    screen: BCCavernScreen,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("Main")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const WahooSC = createStackNavigator({
  WahooSC:{
    screen: Wahoo,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("StudentCenterPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const RamenSC = createStackNavigator({
  RamenSC:{
    screen: Ramen,
    navigationOptions: ({ navigation }) =>
      ({
        headerLeft: <TouchableOpacity onPress={() => navigation.navigate("StudentCenterPage")}>
          <Icon style={styles.backtxticon} name='chevron-left' />
        </TouchableOpacity>
      })
  }
});

export const Pizza = createStackNavigator({
  Pizza:{
    screen: BCPizza,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("BCCavernPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const PandaSC = createStackNavigator({
  PandaSC:{
    screen:Panda,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("StudentCenterPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>,
      headerTitleStyle: { alignSelf: 'center' , fontSize: 20},
      title: 'Panda Express',
  })
  }
});

export const Grille = createStackNavigator({
  Grille:{
    screen: GrilleBC,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("BCCavernPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>,
      headerTitleStyle: { alignSelf: 'center' , fontSize: 20},
      title: 'Grille Works',
  })
  }
});

export const Grille2 = createStackNavigator({
  Grille:{
    screen: GrillePX,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("PhoenixPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>,
      headerTitleStyle: { alignSelf: 'center' , fontSize: 20},
      title: 'Grille Works',
  })
  }
});

export const WendysSC = createStackNavigator({
  Wendys: {
    screen: Wendys,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("StudentCenterPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>,
      headerTitleStyle: { alignSelf: 'center' , fontSize: 20},
      title: 'Wendy\'s',
  })
  }
});

export const EinsteinPX = createStackNavigator({
  Einstein:{
    screen: Einstein,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("PhoenixPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>,
      headerTitleStyle: { alignSelf: 'center' , fontSize: 20},
      title: 'Einstein Bros. Bagels',
  })

  }
});

export const GreensToGoPX = createStackNavigator({
  GreensToGo: {
    screen: GreensToGo,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("PhoenixPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const Subway = createStackNavigator({
  Subway: {
    screen: SubwayBC,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("BCCavernPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const Subway2 = createStackNavigator({
  Subway2: {
    screen: SubwaySC,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("StudentCenterPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const Tortilla = createStackNavigator({
  Tortilla:{
    screen: TortillaBC,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("BCCavernPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const Tortilla2 = createStackNavigator({
  Tortilla:{
    screen: TortillaPX,
    navigationOptions: ({navigation}) =>
    ({headerLeft: <TouchableOpacity onPress= {() => navigation.navigate("PhoenixPage")}>
      <Icon style = {styles.backtxticon} name = 'chevron-left'/>
      </TouchableOpacity>
  })
  }
});

export const SignedOut = createStackNavigator({
  Login : {
    screen : LoginScreen,
    navigationOptions:{
      header:null
    }
  }
});

export const Setting = createStackNavigator({
  
  Setting :{
    screen: StartScreen,
    navigationOptions:{
      header: null
    }}

});

export const SignedIn = createBottomTabNavigator({
  Info:{
    screen : InfoScreen,
    navigationOptions:{
      tabBarLabel : "Info",
      tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={
                Platform.OS === 'ios'
                  ? `ios-information-circle${focused ? '' : '-outline'}`
                  : 'md-information-circle'
              }
            />
      ),
    }
  },
  Food:{
    screen:FoodScreen,
    
    navigationOptions:{
      tabBarLabel:"Food",
      tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
            />
      ),
      
      

    }
  },
  Advice:{
    screen:QAScreen,
    navigationOptions:{
      tabBarLabel:"Advice",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
      ),
      
    }
  },
  
},
{
    initialRouteName: 'Food',
  }
);


