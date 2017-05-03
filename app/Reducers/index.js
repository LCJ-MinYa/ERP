'use strict';
/*
 * combineReducers方法，用于Reducer的拆分
 * 1.定义各个子Reducer函数
 * 2.调用combineReducers合并成一个大的Reducer
 */
import { combineReducers } from 'redux';

//定义初始化购物车数据
const initialCartState = 0;

function cart(state = initialCartState, action){
	console.log(action.type);
	console.log(state);
	switch(action.type){
		case 'ADD_CART':
			console.log('+1');
			return state + 1;
		case 'DEL_CART':
			return state;
		default:
			console.log('default');
			return state;
	}
}

//这里合并各个子Reducer函数
const AppReducer = combineReducers({
	cart
});

export default AppReducer;