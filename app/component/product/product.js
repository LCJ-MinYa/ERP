'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    Alert,
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback
} from 'react-native';
import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Config from '../../config/config.js';
import Storage from '../../utils/customStorage.js';
import ProductHeader from '../common/productHeader.js';
import ProductBanner from './productBanner.js';
import ProductTypeNav from './productTypeNav.js';
import ProductNotice from './productNotice.js';
import ProductCommonList from '../common/productCommonList.js';

let bannerNoticeReq = false;
let productReq = false;
let product = React.createClass({
    getInitialState: function() {
        return {
            isRefreshing: false,
            isShowSmallProductList: true,
            bannerNoticeData: {},
            productData: []
        };
    },
  	render() {
  		const { navigate } = this.props.navigation;
    	return (
      		<View style={styles.container}>
                <ProductHeader
                    popGoLeft = {(url)=>{this.popToClassView(url)}}
                />

                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.doRefresh}
                            tintColor="#989898"
                            colors={['#989898']}
                            progressBackgroundColor="#eee"
                        />
                    }
                >
                    <ProductBanner ref="productBanner" bannerData={this.state.bannerNoticeData.banner}/>
                    <ProductTypeNav goodsLabelData={this.state.bannerNoticeData.goodsLabel}/>
                    <ProductNotice noticeData={this.state.bannerNoticeData.notice}/>

                    <View style={styles.listTitle}>
                        <Text style={styles.leftText}>推荐商品</Text>
                        <TouchableWithoutFeedback onPressIn={this.changeProductList}>
                            <View>
                            {
                                this.state.isShowSmallProductList ? (
                                    <Text style={styles.rightIcon}>&#xe613;</Text>
                                ) : (
                                    <Text style={styles.rightIcon}>&#xe62e;</Text>
                                )
                            }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ProductCommonList isShowSmallProductList={this.state.isShowSmallProductList} productData={this.state.productData}/>
                    <View style={styles.goProductList}>
                        <Text style={styles.goProductListText}>查看全部推荐商品</Text>
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
                        _this.getProductData();
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
        bannerNoticeReq = true;
        this.refs.request.PostService(API.BANNER_NOTICE, {}, function(result){
            if(result.hasOwnProperty('banner') && result.banner.length === 0){
                result.banner[0] = 'index_banner_1';
                result.banner[1] = 'index_banner_2';
            }
            _this.setState({bannerNoticeData: result});
            bannerNoticeReq = false;
            _this.isRequestFinish();
        })
    },
    getProductData(){
        let _this = this;
        productReq = true;
        this.refs.request.PostService(API.PRODUCT_LIST, {
            isRecommend:1,
            includeOOS:1,
            pageIndex: 1,
            pageSize: Config.PAGESIZE
        }, function(result){
            if(result.data.length !== 0){
                _this.setState({productData: result.data});
                productReq = false;
                _this.isRequestFinish();
            }
        })
    },
    doRefresh(){
        this.setState({isRefreshing: true});
        this.getBannerNoticeData();
        this.getProductData();
    },
    isRequestFinish(){
        if(!bannerNoticeReq && !productReq && this.state.isRefreshing){
            this.setState({isRefreshing: false});
        }
    },
    changeProductList(){
        this.setState({isShowSmallProductList: !this.state.isShowSmallProductList});
    },
})

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eee'
    },
    listTitle:{
        flex: 1,
        flexDirection: 'row',
        height: 32,
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
        fontSize: 16
    },
    rightIcon:{
        fontFamily: 'iconfont',
        color: '#f7a900',
        paddingRight: 10,
        fontSize: 20
    },
    goProductList:{
        flex: 1,
        height: 32,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    goProductListText:{
        fontSize: 14,
        color: '#7b7b7b'
    },
    scrollView:{
        flex: 1
    }
});

export default product;