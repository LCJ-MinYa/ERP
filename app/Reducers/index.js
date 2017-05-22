'use strict';
/*
 * combineReducers方法，用于Reducer的拆分
 * 1.定义各个子Reducer函数
 * 2.调用combineReducers合并成一个大的Reducer
 */
import { combineReducers } from 'redux';


//定义初始化购物车数据
const initialCartState = 1;
const initialLoadingState = false;
const initialMessageState = 0;

function cart(state = initialCartState, action){
	switch(action.type){
		case 'ADD_CART':
			return state + 1;
		case 'DEL_CART':
			return state;
		default:
			return state;
	}
}

function isLoading(state = initialLoadingState, action){
	switch(action.type){
		case 'SHOW_LOADING':
			state = true;
			return state;
		case 'HIDE_LOADING':
			state = false;
			return state;
		default:
			return state;
	}
}

function message(state = initialMessageState, action){
	switch(action.type){
		case 'GET_MESSAGE_COUNT':
			return state;
		case 'SET_MESSAGE_COUNT':
			state = action.count;
			return state;
		case 'DEL_MESSAGE_COUNT':
			return state;
		default:
			return state;
	}
}

//这里合并各个子Reducer函数
const AppReducer = combineReducers({
	cart,
	isLoading,
	message,
});

export default AppReducer;