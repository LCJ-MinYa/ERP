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
import productClass from '../product/productClass.js';

import tabBar from '../common/tabBar.js';
import storage from '../../utils/customStorage.js';

// //商品导航
// const productStack = StackNavigator({
//     Product: {
//         screen: productScreen,
//         path: '/'
//     },
//     ProductList: {
//         screen: productListScreen,
//         path: '/list'
//     }
// },{
//     headerMode: 'none',
// })

// //购物车导航
// const cartStack = StackNavigator({
//     Cart: {
//         screen: cartScreen,
//         path: '/'
//     },
// },{
//     headerMode: 'none',
// })

// //订单导航
// const orderStack = StackNavigator({
//     Order: {
//         screen: orderScreen,
//         path: '/'
//     },
// },{
//     headerMode: 'none',
// })

// //信息导航
// const msgStack = StackNavigator({
//     Msg: {
//         screen: msgScreen,
//         path: '/'
//     },
// },{
//     headerMode: 'none',
// })

// //我的导航
// const mineStack = StackNavigator({
//     Mine: {
//         screen: mineScreen,
//         path: '/'
//     },
// },{
//     headerMode: 'none',
// })

tabBar.setNavigationOptions(productScreen, '商品首页', '商品', 'shopping');
tabBar.setNavigationOptions(cartScreen, '购物车页面', '购物车', 'cart');
tabBar.setNavigationOptions(orderScreen, '订单页面', '订单', 'order');
tabBar.setNavigationOptions(msgScreen, '消息页面', '消息', 'msg');
tabBar.setNavigationOptions(mineScreen, '我的页面', '我的', 'mine');

const MainScreenNavigator = TabNavigator({
    ProductTab: { screen: productScreen },
    CartTab: { screen: cartScreen },
    OrderTab: { screen: orderScreen },
    MsgTab: { screen: msgScreen },
    MineTab: { screen: mineScreen }
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
        },
        showIcon: true,
    }
});

//设置头部导航条是否作为根视图
const rootMain = StackNavigator({
    Root: { screen: MainScreenNavigator },
    Login: {
        screen: loginScreen,
        navigationOptions:{
            cardStack:{
                gesturesEnabled: false
            }
        }
    },
    ProductList: { screen: productListScreen },
    ProductClass: { screen: productClass }
},{
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