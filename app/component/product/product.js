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
import ProductBanner from './productBanner.js';
import ProductTypeNav from './productTypeNav.js';
import ProductNotice from './productNotice.js';

var product = React.createClass({
    getInitialState: function() {
        return {
            isLogin: false,
            bannerData: [],
            goodsLabelData: {},
            noticeData: []
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
                    <ProductTypeNav goodsLabelData={this.state.goodsLabelData}/>
                    <ProductNotice noticeData={this.state.noticeData}/>

                    <View style={styles.listTitle}>
                        <Text style={styles.leftText}>推荐商品</Text>
                        <Text style={styles.rightIcon}>&#xe613;</Text>
                    </View>

                </ScrollView>

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
                let _this = this;
                this.refs.request.PostService(API.GLOBAL_INFO, {}, function(result){
                    if(result.error_code < 0){
                        Alert.alert('登录已过期',result.error_message,[
                            {
                                text: '重新登录',
                                onPress:()=>{
                                    _this.props.navigation.navigate('Login');
                                }
                            }
                        ])
                    }else{
                        _this.getBannerNoticeData();
                    }
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
            if(result.hasOwnProperty('banner') && result.banner.length === 0){
                result.banner[0] = 'index_banner_1';
                result.banner[1] = 'index_banner_2';
            }
            _this.setState({bannerData: result.banner});
            _this.setState({goodsLabelData: result.goodsLabel});
            _this.setState({noticeData: result.notice});
        })
    }
})

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eee'
    },
    listTitle:{
        flex: 1,
        flexDirection: 'row',
        height: 30,
        marginTop: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftText:{
        paddingLeft: 10,
        color: '#f65a44',
        fontSize: 14
    },
    rightIcon:{
        fontFamily: 'iconfont',
        color: '#f7a900',
        paddingRight: 10,
        fontSize: 18
    }
});

export default product;