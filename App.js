import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import LoginScreen from "./src/pages/Login";
import HomeScreen from "./src/pages/Home";
import SettingsScreen from "./src/pages/Settings";
import Profile from "./src/pages/Profile";

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
                ? "ios-happy-outline"
                : "ios-happy-sharp"
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
