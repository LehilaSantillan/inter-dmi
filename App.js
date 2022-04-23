import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRef } from 'react/cjs/react.development';
import { TouchableOpacity } from 'react-native-web';
import { useState } from 'react/cjs/react.production.min';

function LoginScreen({onPress}){
  return(
    <view style={styles.container}>
      <StatusBar/>
      <text>Login Screen</text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <text style={styles.text}>Login</text>
      </TouchableOpacity>
    </view>
  );  
}

function HomeScreen(){
  return(
    <View style={styles.container}>
      <text>Home Screen</text>
      <TouchableOpacity style={styles.button} onPress={onPress}></TouchableOpacity>
    </View>
  )
}

function SettingsScreen(){
  return(
    <View style={styles.container}> 
      <text>Settings Screen</text>
    </View>
  )
}

function Profile(){
  return(
    <View style={styles.container}> 
      <text>Profile</text>
    </View>
  )
}
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      { !user ? (
        <Stack.Navigator>
          <Stack.Screen
          options={{headerShown : false}}
          children={(props) => (
            <LoginScreen {...props} onPress={() => setUser(true)}/>
          )}
          name="Login"
          />
        </Stack.Navigator>
      ) : (

      <Tab.Navigator 
        screenOptions={({route}) =>({
          tabBarIcon:({focused,color,size})=>{
            let iconName;
            if(route.name === "Home"){
                iconName  = focused
                ? "ios-home-outline"
                : "ios-home-sharp"
            } else if(route.name === "Settings"){
                iconName = "ios-list"
            } else if (route.name === "Profile"){
                iconName = focused
                ? "ios-heart-circule-outline"
                : "ios-profile-circule-sharp"
            }
          
            return <Ionicons name={iconName} size={size} color={color}/>;

            },
            tabBarActiveTintColor: "#581845",
            tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen 
          name="Home"
          children={(props)=> (
            <HomeScreen {... props} onPress={() => setUser(null)}/>
          )}
        />
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#581845",
    width: 150,
    height: 40,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,r
  },
  text:{
    color: "#fff"
  }

});