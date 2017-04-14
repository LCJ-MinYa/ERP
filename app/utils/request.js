'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
} from 'react-native';

import storage from './customStorage.js';
import config from '../config/config.js';
import sha1 from './sha1.js';

class request extends Component {
	/*
     *  getProfileId获取profileId参数
     *  return:返回字符串形式的profileId
     */
	static getProfileId(){
		var profileId = storage.getData('profileId');
		if(!profileId){
			return '';
		}
		return profileId;
	}

	/*
     *  getTimestamp获取当前时间戳参数
     *  return:返回number类型时间戳
     */
	static getTimestamp(){
		return Math.round(new Date().getTime() / 1000);
	}

	/*
     *  getToken获取用户保存的token
     *  return:返回string类型token
     */
	static getToken(){
		var token = storage.getData('token');
		if(!token){
			return '';
		}
		return token;
	}

	/*
     *  getParamsStr
     *  return:返回string类型parStr
     */
    static getParamsStr(data){
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
	    console.log("parStr=====" + parStr);
	    return parStr;     	
    }

    static getSingnStr(data){
    	var parStr = this.getParamsStr(data);
    	if(parStr.length > 0){
    		return sha1.sha1(parStr);
    	}
    	return '';
    }

	/*
     *  toQueryString更改JSON格式数据
     *  obj:传入obj参数
     *  return:返回字符串形式的参数
     */
	static toQueryString(obj) {
	    return obj ? Object.keys(obj).sort().map(function (key) {
	        var val = obj[key];
	        if (Array.isArray(val)) {
	            return val.sort().map(function (val2) {
	                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
	            }).join('&');
	        }
	        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	    }).join('&') : '';
	}

	/*
     *  post请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     */
	static PostService(url, params, callback){
		let URL = config.API + url;
		params.profileId = this.getProfileId();
		params.timestamp = this.getTimestamp();
		params.token = this.getToken();
		params.signstr = this.getSingnStr(params);
		//发送POST请求
		fetch(URL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			body: this.toQueryString(params)
		})
		//将返回数据转换为JSON格式	
		.then((result) => result.json())
		//将数据通过回调返回
		.then((resultJSON) => {
			callback(resultJSON);
		})
		//捕获fetch错误异常
		.catch((error) => {
        	console.error(error);
      	});
	}
}

export default request;