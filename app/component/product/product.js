'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    Alert,
    ScrollView
} from 'react-native';
import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Storage from '../../utils/customStorage.js';
import ProductHeader from '../common/productHeader.js';
import ProductBanner from '../product/productBanner.js';

var product = React.createClass({
    getInitialState: function() {
        return {
            isLogin: false,
            bannerData: []
        };
    },
  	render() {
  		const { navigate } = this.props.navigation;
    	return (
      		<View style={styles.container}>
                <ProductHeader
                    popGoLeft = {(url)=>{this.popToClassView(url)}}
                />

                <ScrollView>
                    <ProductBanner ref="productBanner" bannerData={this.state.bannerData}/>
                </ScrollView>

                <Request ref="request"/>
            </View>
    	);
  	},
    popToClassView(url){
        this.props.navigation.navigate(url);
    },
    componentDidMount(){
        this.getBannerNoticeData();
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
                this.refs.request.PostService(API.GLOBAL_INFO, {}, function(result){
                    //console.log(result);
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
    },
    getBannerNoticeData(){
        let _this = this;
        this.refs.request.PostService(API.BANNER_NOTICE, {}, function(result){
            if(result.banner.length === 0){
                result.banner[0] = 'index_banner_1';
                result.banner[1] = 'index_banner_2';
            }
            _this.setState({bannerData: result.banner});
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