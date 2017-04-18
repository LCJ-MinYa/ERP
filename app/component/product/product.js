'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    Alert
} from 'react-native';
import Request from '../../utils/request.js';
import ApiConfig from '../../config/apiConfig.js';
import Storage from '../../utils/customStorage.js';
import ProductHeader from '../common/productHeader.js';

var product = React.createClass({
    getInitialState: function() {
        return {
            isLogin: false,
        };
    },
  	render() {
  		const { navigate } = this.props.navigation;
    	return (
      		<View style={styles.container}>
                <ProductHeader
                    popGoLeft = {(url)=>{this.popToClassView(url)}}
                />

                <Request ref="request"/>
            </View>
    	);
  	},
    popToClassView(url){
        this.props.navigation.navigate(url);
    },
    componentDidMount(){
        let token, profileId;
        Storage.getData('token')
        .then((value)=>{ 
            token = value;
            return Storage.getData('profileId')
        })
        .then((value)=>{
            profileId = value;
            if(token && profileId){
                this.setState({isLogin: true});
                //拉取global全局信息
                this.refs.request.PostService(ApiConfig.GLOBAL_INFO, {}, function(result){
                    console.log(result);
                })
            }else{
                Alert.alert('您还未登录','点击登录',[
                    {
                        text: '去登录',
                        onPress:()=>{
                            this.props.navigation.navigate('Login');
                        }
                    }
                ])
            }
        })
    }
})

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eee'
    },
});

export default product;