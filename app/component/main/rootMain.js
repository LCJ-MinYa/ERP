'use strict';

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
        },
        indicatorStyle: {
            height: 0
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
    initialRouteName: 'Root',
    onTransitionStart: ()=>{
        console.log('导航栏切换开始');
    },
    onTransitionEnd: ()=>{
        console.log('导航栏切换结束');
    }
});

export default rootMain;