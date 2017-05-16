'use strict';
import React, { Component } from 'react';
import { 
  StackNavigator,
  TabNavigator,
  Platform
} from 'react-navigation';

//tabbar导航
import productScreen from '../product/product.js';
import cartScreen from '../cart/cart.js';
import orderScreen from '../order/order.js';
import msgScreen from '../msg/msg.js';
import mineScreen from '../mine/mine.js';

//navigator导航
import launchScreen from '../launch/launch.js';
import loginScreen from '../login/login.js';
import productListScreen from '../product/productList.js';
import productClassScreen from '../product/productClass.js';
import productDetailScreen from '../product/productDetail.js';

import tabBar from '../common/tabBar.js';
import storage from '../../utils/customStorage.js';

tabBar.setNavigationOptions(productScreen, '商品首页', '商品', 'shopping', 'app/');
tabBar.setNavigationOptions(cartScreen, '购物车页面', '购物车', 'cart', 'app/cart');
tabBar.setNavigationOptions(orderScreen, '订单页面', '订单', 'order', 'app/order');
tabBar.setNavigationOptions(msgScreen, '消息页面', '消息', 'msg', 'app/msg');
tabBar.setNavigationOptions(mineScreen, '我的页面', '我的', 'mine', 'app/mine');

const TabScreenNavigator = TabNavigator({
    ProductTab: { screen: productScreen },
    CartTab: { screen: cartScreen },
    OrderTab: { screen: orderScreen },
    MsgTab: { screen: msgScreen },
    MineTab: { screen: mineScreen }
},{
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions:{
        activeTintColor: '#f65a44',
        inactiveTintColor: '#323232',
        labelStyle:{
            fontSize: 12,
        },
        style:{
            backgroundColor: '#fafafa',
        },
        indicatorStyle: {
            height: 0
        },
        showIcon: true,
    }
});

//设置头部导航条是否作为根视图
const Navigator = StackNavigator({
    Launch: { screen: launchScreen },
    TabRoot: { screen: TabScreenNavigator },
    Login: {
        screen: loginScreen,
        navigationOptions:{
            gesturesEnabled: false
        }
    },
    ProductList: { screen: productListScreen },
    ProductClass: { screen: productClassScreen },
    ProductDetail: { screen: productDetailScreen },
},{
    lazy: true,
    headerMode: 'none',
    initialRouteName: 'Launch',
    onTransitionStart: (nav)=>{
        console.log(nav);
        console.log('导航栏切换开始');
    },
    onTransitionEnd: ()=>{
        console.log('导航栏切换结束');
    }
});

const defaultGetStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
    return defaultGetStateForAction(action, state);
};

class rootMain extends Component {
    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        //console.log(prevState);
                        //console.log(currentState);
                    }
                }
            />
        );
    }
}

export default rootMain;