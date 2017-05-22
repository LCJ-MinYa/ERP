'use strict';
import React, { Component } from 'react';
import {
    NetInfo,
    View,
    Text
} from 'react-native';
import { 
  StackNavigator,
  TabNavigator,
  Platform,
} from 'react-navigation';

import { connect } from 'react-redux';

//tabbar导航
import productScreen from '../product/product';
import cartScreen from '../cart/cart';
import orderScreen from '../order/order';
import msgScreen from '../msg/msg';
import mineScreen from '../mine/mine';

//navigator导航
import launchScreen from '../launch/launch';
import loginScreen from '../login/login';
import productListScreen from '../product/productList';
import productClassScreen from '../product/productClass';
import productDetailScreen from '../product/productDetail';

import Request from '../../utils/request';
import tabBar from '../common/tabBar';
import storage from '../../utils/customStorage';

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
    ProductDetail: { screen: productDetailScreen }
},{
    lazy: true,
    headerMode: 'none',
    initialRouteName: 'Launch',
    onTransitionStart: (nav)=>{
        //console.log('导航栏切换开始');
    },
    onTransitionEnd: ()=>{
        //console.log('导航栏切换结束');
    }
});

const defaultGetStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
    return defaultGetStateForAction(action, state);
};

class rootMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            connectionInfo: ''
        };
    }
    renderNetInfo(){
        if(this.state.connectionInfo == 'none'){
            return(
                <Text style={{position: 'absolute', top: 100}}>{this.state.connectionInfo}</Text>
            );
        }else{
            return null;
        }
    }
    render() {
        const {dispatch, isLoading} = this.props;
        return (
            <View style={{flex: 1}}>
                <Navigator
                    onNavigationStateChange={
                        (prevState, currentState) => {
                            //console.log(prevState);
                            //console.log(currentState);
                        }
                    }
                />
                {this.renderNetInfo()}

                <Request
                    ref="request"
                    isShowLoading={isLoading}
                />
            </View>
        );
    }
    componentDidMount(){
        NetInfo.addEventListener(
            'change',
            this.handleConnectionInfoChange.bind(this)
        );
    }
    handleConnectionInfoChange(connectionInfo) {
        this.setState({connectionInfo: connectionInfo});
    }
}

function selector(state) {
    return {  
        isLoading: state.isLoading,
    }  
}

export default connect(selector)(rootMain);