'use strict';

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
import loginScreen from '../login/login.js';
import productListScreen from '../product/productList.js';

import tabBar from '../common/tabBar.js';
import storage from '../../utils/customStorage.js';

//商品导航
const productStack = StackNavigator({
    Product: {
        screen: productScreen,
        path: '/'
    },
    ProductList: {
        screen: productListScreen,
        path: '/list'
    }
},{
    headerMode: 'none',
})

//购物车导航
const cartStack = StackNavigator({
    Cart: {
        screen: cartScreen,
        path: '/'
    },
},{
    headerMode: 'none',
})

//订单导航
const orderStack = StackNavigator({
    Order: {
        screen: orderScreen,
        path: '/'
    },
},{
    headerMode: 'none',
})

//信息导航
const msgStack = StackNavigator({
    Msg: {
        screen: msgScreen,
        path: '/'
    },
},{
    headerMode: 'none',
})

//我的导航
const mineStack = StackNavigator({
    Mine: {
        screen: mineScreen,
        path: '/'
    },
},{
    headerMode: 'none',
})

tabBar.setNavigationOptions(productStack, '商品首页', '商品', 'shopping');
tabBar.setNavigationOptions(cartStack, '购物车页面', '购物车', 'cart');
tabBar.setNavigationOptions(orderStack, '订单页面', '订单', 'order');
tabBar.setNavigationOptions(msgStack, '消息页面', '消息', 'msg');
tabBar.setNavigationOptions(mineStack, '我的页面', '我的', 'mine');

const MainScreenNavigator = TabNavigator({
    ProductTab: { screen: productStack },
    CartTab: { screen: cartStack },
    OrderTab: { screen: orderStack },
    MsgTab: { screen: msgStack },
    MineTab: { screen: mineStack }
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
        },
        indicatorStyle: {
            height: 0
        }
    }
});

//设置头部导航条是否作为根视图
const rootMain = StackNavigator({
    Root: { screen: MainScreenNavigator },
    Login: { screen: loginScreen },
},{
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Root',
    onTransitionStart: ()=>{
        console.log('导航栏切换开始');
    },
    onTransitionEnd: ()=>{
        console.log('导航栏切换结束');
    }
});

export default rootMain;