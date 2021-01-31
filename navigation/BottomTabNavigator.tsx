import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabSettingScreen from '../screens/TabSettingScreen';

import { Button,Text,TouchableOpacity,AsyncStorage,Image } from 'react-native';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabLoginParamList , TabSignupParamList } from '../types';
import { View } from '../components/Themed';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (

    
    <BottomTab.Navigator
      
    initialRouteName="TabOne"
      tabBarOptions={{ 
        activeTintColor: '#80e5ff',
        inactiveTintColor: '#fff',
        activeBackgroundColor: '#cc66ff',
        inactiveBackgroundColor: '#cc66ff'
        }}>
      <BottomTab.Screen
        name="หน้าหลัก"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="ข้อมูลสมาชิก"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="รายการชำระ"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-cash" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="ตั้งค่าข้อมูล"
        component={TabSettingNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />



    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {

  return  <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator({navigation}) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: () => (<Text style={{flex: 1, textAlign: 'center', color: '#fff', fontSize: 18}}>หน้าหลัก</Text>),
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out" color='#fff'/>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#cc66ff',
          },
          headerTintColor: '#fff',
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator({navigation}) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ 
          headerTitle: () => (<Text style={{flex: 1, textAlign: 'center', color: '#fff', fontSize: 18}}>สมาชิก</Text>),
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out" color='#fff'/>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#cc66ff',
          },
          headerTintColor: '#fff',
        }}
      />
    </TabTwoStack.Navigator>
  );
}


const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator({navigation}) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ 
          headerTitle: () => (<Text style={{flex: 1, textAlign: 'center', color: '#fff', fontSize: 18}}>รายการชำระเงิน</Text>),
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out" color='#fff'/>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#cc66ff',
          },
          headerTintColor: '#fff',
        }}
      />
    </TabThreeStack.Navigator>
  );
}



const TabSettingStack = createStackNavigator<TabLoginParamList>();

function TabSettingNavigator({navigation}) {
  return (
    <TabSettingStack.Navigator>
      <TabSettingStack.Screen
        name="TabSettingScreen"
        component={TabSettingScreen}
        options={{ 
          headerTitle: () => (<Text style={{flex: 1, textAlign: 'center', color: '#fff', fontSize: 18}}>ตั้งค่าข้อมูล</Text>),
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out" color='#fff'/>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#cc66ff',
          },
          headerTintColor: '#fff',
        }}
      />
    </TabSettingStack.Navigator>
  );
}
