import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../../context/global/global.context";
import HomeScreen from "../../pages/Home/Home";
import SettingsScreen from "../../pages/Settings/Settings";
import Profile from "../../pages/Profile/Profile";


const Tab = createBottomTabNavigator();

export default function MainNavigator({ user }) {
  const { state, login, logout } = useContext(GlobalContext);

  useEffect(()=>{
    login();
  },[user])

  return (
    <NavigationContainer>
      {state.user && (
        <Tab.Navigator
          initialRouteName="Red Social"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Inicio") {
                iconName = focused ? "ios-home" : "ios-home-outline";
              } else if (route.name === "Perfil") {
                iconName = focused ? "ios-happy" : "ios-happy-outline";
              } else if (route.name === "Configaración") {
                iconName = "ios-list";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#581845",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Perfil" component={Profile} />
          <Tab.Screen
            name="Configuración"
            
            children={(props) => (
              <SettingsScreen {...props} onPress={logout} user={user} />
            )}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}