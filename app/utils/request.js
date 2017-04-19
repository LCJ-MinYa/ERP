'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	ActivityIndicator,
  	Alert
} from 'react-native';

import Storage from './customStorage.js';
import config from '../config/config.js';
import sha1 from './sha1.js';

var request = React.createClass({
    getInitialState: function() {
        return {
            isShowLoading: false
        };
    },
	render(){
		return(
			<ActivityIndicator
				style={{height: 0}}
				animating={this.state.isShowLoading}
				size={'large'}
			/>
		);
	},

	getProfileId(value, params){
		if(value){
			params.profileId = value;
		}else{
			params.profileId = '';
		}
	},

	getToken(value, params){
		if(value){
			params.token = value;
		}else{
			params.token = '';
		}
		return Storage.getData('profileId')
	},

	/*
     *  getTimestamp获取当前时间戳参数
     *  return:返回number类型时间戳
     */
	getTimestamp(){
		return Math.round(new Date().getTime() / 1000);
	},

	/*
     *  getParamsStr
     *  return:返回string类型parStr
     */
    getParamsStr(data){
		var orgParams = [];
	    for (var i in data) {
	        orgParams.push(i)
	    }
    	var newParams = orgParams.sort();

	    var parStr = '';
	    for (var i = 0; i < newParams.length; i++) {
	        var tkey = newParams[i];
	        var tvalue = data[tkey];
	        if (tvalue) {
	            if (typeof(tvalue) == "object") {
	                tvalue = JSON.stringify(tvalue);
	            }
	            parStr = parStr + "&" + tkey + "=" + tvalue;
	        }
	    }
	    if (parStr.length > 0) {
	        parStr = parStr.substring(1);
	    }
	    return parStr;     	
    },

    getSingnStr(data){
    	var parStr = this.getParamsStr(data);
    	if(parStr.length > 0){
    		return sha1.sha1(parStr);
    	}
    	return '';
    },

	/*
     *  toQueryString更改JSON格式数据
     *  obj:传入obj参数
     *  return:返回字符串形式的参数
     */
	toQueryString(obj) {
	    return obj ? Object.keys(obj).sort().map(function (key) {
	        var val = obj[key];
	        if (Array.isArray(val)) {
	            return val.sort().map(function (val2) {
	                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
	            }).join('&');
	        }
	        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	    }).join('&') : '';
	},

	/*
     *  post请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     *  isLoading:是否显示加载状态
     */
	PostService(url, params, callback, isLoading){
		if(isLoading){
			this.setState({isShowLoading: true});
		}
		let URL = config.API + url;
		params.timestamp = this.getTimestamp();
		Storage.getData('token')
		.then((value)=>{
			if(value){
				params.token = value;
			}else{
				params.token = '';
			}
			return Storage.getData('profileId')
		})
		.then((value)=>{
			if(value){
				params.profileId = value;
			}else{
				params.profileId = '';
			}
			params.signstr = this.getSingnStr(params);
			//发送POST请求
			return fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
				},
				body: this.toQueryString(params)
			})
		})
		.then((result) => result.json())
		.then((resultJSON) => {
			if(isLoading){
				this.setState({isShowLoading: false});
			}
			if(url == '/api/system/getGlobalInfo' && resultJSON.error_code < 0){
				callback(resultJSON);
			}else if(resultJSON.error_code < 0){
                Alert.alert('请求失败',resultJSON.error_message,[
                    {
                        text: '确定',
                    }
                ])
			}else{
				callback(resultJSON);
			}
		})
		//捕获fetch错误异常
		.catch((error) => {
        	console.error(error);
      	});
	}
});

export default request;