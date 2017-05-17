'use strict';
/*
 * combineReducers方法，用于Reducer的拆分
 * 1.定义各个子Reducer函数
 * 2.调用combineReducers合并成一个大的Reducer
 */
import { combineReducers } from 'redux';
import cartScreen from '../component/cart/cart.js';
import tabBar from '../component/common/tabBar.js';


//定义初始化购物车数据
const initialCartState = 0;

function cart(state = initialCartState, action){
	switch(action.type){
		case 'ADD_CART':
			tabBar.setNavigationOptions(cartScreen, '购物车页面', '购物车', 'cart', 'app/cart', state + 1);
			//cartScreen.props.navigation.setParams({cart: state + 1});
			return state + 1;
		case 'DEL_CART':
			return state;
		default:
			return state;
	}
}

//这里合并各个子Reducer函数
const AppReducer = combineReducers({
	cart
});

export default AppReducer;