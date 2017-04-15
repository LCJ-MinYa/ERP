'use strict';

import React,{ Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { 
  StackNavigator,
  TabNavigator
} from 'react-navigation'; 

//tabbar导航
import productScreen from '../product/product.js';
import cartScreen from '../cart/cart.js';
import orderScreen from '../order/order.js';
import msgScreen from '../msg/msg.js';
import mineScreen from '../mine/mine.js';

//navigator导航
import loginScreen from '../login/login.js';
import productListScreen from '../product/productList.js';

import storage from '../../utils/customStorage.js';

let initRoute;
let token = storage.getData('token');
let profileId = storage.getData('profileId');
if(token && profileId){
    initRoute = 'Root';
}else{
    initRoute = 'Login';
}
console.log(initRoute);
console.log(storage);

const MainScreenNavigator = TabNavigator({
    Product: { screen: productScreen },
    Cart: { screen: cartScreen },
    Order: { screen: orderScreen },
    Msg: { screen: msgScreen },
    Mine: { screen: mineScreen }
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        activeTintColor: '#f65a44',
        inactiveTintColor: '#323232',
        labelStyle:{
            fontSize: 12,
        },
        style:{
            backgroundColor: '#fafafa',
        }
    }
});

//设置头部导航条是否作为根视图
const rootMain = StackNavigator({
    Root: { screen: MainScreenNavigator },
    ProductList: { screen: productListScreen },
    Login: { screen: loginScreen },
},{
    headerMode: 'none',
    initialRouteName: initRoute
});

export default rootMain;