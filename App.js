import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen(){
  return(
    <View style={styles.container}>
      <text>Home Screen</text>
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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({route}) =>({
          tabBarIcon:({focused,color,size})=>{
            switch(route.name){
              case "Home":
                return iconName  = focused
                ? "ios-information-circule"
                : "ios-information-circule-outline"

              case "Settings":
                return iconName = "ios-list"

              case "Profile":
                return iconName = focused
                ? "ios-profile-circule"
                : "ios-profile-circule-outline"

              default:
                return null
            }
          
            return <Ionicons name={iconName} size={size} color={color}/>;

            },
            tabBarActiveTintColor: "#FFA07A",
            tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
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

});