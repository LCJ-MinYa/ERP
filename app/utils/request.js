/*
 * ===========================
 *
 * Request => 组件式请求封装
 * @author   : LiChaoJun
 * @datetime : 2017/5/25
 * 请求作为页面子组件，loading与请求合并(需要显示loading使用)
 *
 * ===========================
 */
'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Alert
} from 'react-native';

import Storage from './customStorage';
import config from '../config/config';
import sha1 from './sha1';
import Loading from './loading';
import Toast from 'react-native-root-toast';

let request = React.createClass({
	propTypes:{
		loadingText: React.PropTypes.string.isRequired,
		isShowLoading: React.PropTypes.bool.isRequired,
	},
	getDefaultProps: function() {
		return {
			loadingText: '加载中...',
			isShowLoading: false
		};
	},
	getInitialState: function() {
		return {
			isShowLoadingState: this.props.isShowLoading,
			loadingTextState: this.props.loadingText,
		};
	},
	componentWillReceiveProps(nextProps){
		this.setState({isShowLoadingState: nextProps.isShowLoading});
	},
	render(){
		return(
			<Loading 
				isShowLoading={this.state.isShowLoadingState}
				loadingText={this.props.loadingText}
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
     *  strIsNullOrEmpty检查是否为空（可以为0）
     *  @params: 传入字符串string
     *  @return: 返回布尔值真或假（真代表为空，假代表不为空）
     */
    strIsNullOrEmpty(str){
	    if (str === null || str === undefined || str === '' || this.trim(str) === '' || str === 'null') {
	        return true;
	    }
	    return false;
    },

	/*
     *  strIsNullOrEmpty检查是否为空（可以为0）
     *  @params: 传入字符串string
     *  @return: 返回布尔值真或假（真代表为空，假代表不为空）
     */
    trim(str){
	    if (typeof str !== 'string') {
	        return str;
	    }　　
	    return str.replace(/(^\s*)|(\s*$)/g, "");    	
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
	        if (!this.strIsNullOrEmpty(tvalue)) {
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
	PostService(url, params, callback, isNotBaseLoading, timeout){
		if(!isNotBaseLoading){
			this.setState({isShowLoadingState: true});
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
			this._fetch(this.fetch_promise(URL, params), timeout)
			.then((resultJSON) =>{
				if(!isNotBaseLoading){
					this.setState({isShowLoadingState: false});
				}
				if(resultJSON.error_code < 0){
					if(resultJSON.error_code == -12 || resultJSON.error_code == -15){
						if(!isNotBaseLoading){
							this.props.popGoLogin();
						}
					}else{
						this.toast(resultJSON.error_message);

					}
				}else{
					if(callback != undefined){
						callback(resultJSON);
					}
				}
			})
			.catch((err) => {
				if(!isNotBaseLoading){
					this.setState({isShowLoadingState: false});
				}
				if(err.message === 'Network request failed'){
					this.toast('网络出错');
	            }else if(err === 'Network request timeout'){
	            	this.toast('请求超时');
	            }
			})
		})
	},

	/*
     * 封装_fetch方法，使其可以设置timeout
     * @param timeout 过期时间
     * @return Promise(成功的回调和超时失败的回调)
     */
     _fetch(fetch_promise, timeout){
		var abort_fn = null;
    	var abort_promise = new Promise((resolve, reject) => {
        	abort_fn = function() {
            	reject('Network request timeout');
        	};
    	});
		var abortable_promise = Promise.race([fetch_promise, abort_promise]);
		if(timeout){
			setTimeout(function(){abort_fn();}, timeout);
		}else{
			setTimeout(function(){abort_fn();}, 5000);
		}
    	return abortable_promise;
    },

	/*
     * 封装_fetch方法，使其可以设置timeout
     * @param timeout 过期时间
     * @return Promise(成功的回调和超时失败的回调)
     */
    fetch_promise(URL, params) {
    	return new Promise((resolve, reject) => {
			fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
				},
				body: this.toQueryString(params)
			})
			.then((result) => {
				return result.json();
			})
			.then((resultJSON) => {
				resolve(resultJSON);
			})
			//捕获fetch错误异常
	        .catch((err) => {
	        	reject(err);
	        })
	    })
	},

	toast(msg){
		Toast.show(msg, {
		    position: 0,
		    shadow: false,
		    delay: 500,
		});
	}
});

export default request;