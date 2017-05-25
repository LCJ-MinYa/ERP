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
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import Config from '../../config/config';
import ProductHeader from '../common/productHeader';
import ProductBanner from './productBanner';
import ProductTypeNav from './productTypeNav';
import ProductNotice from './productNotice';
import ProductCommonList from '../common/productCommonList';

let bannerNoticeReq = false;
let productReq = false;
let product = React.createClass({
    getInitialState: function() {
        return {
            isShowLoading: false,
            isShowSmallProductList: true,
            bannerNoticeData: {},
            productData: []
        };
    },
  	render() {
    	return (
      		<View style={styles.container}>
                <ProductHeader popDoClick={(url)=>{this.popToNewView(url)}} />

                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isShowLoading}
                            onRefresh={this.doRefresh}
                            tintColor="#989898"
                            colors={['#989898']}
                            progressBackgroundColor="#eee"
                        />
                    }
                >
                    <ProductBanner ref="productBanner" bannerData={this.state.bannerNoticeData.banner}/>
                    <ProductTypeNav popDoClick={(url, params)=>{this.popToNewView(url, params)}} goodsLabelData={this.state.bannerNoticeData.goodsLabel}/>
                    <ProductNotice noticeData={this.state.bannerNoticeData.notice}/>

                    <View style={styles.listTitle}>
                        <Text style={styles.leftText}>推荐商品</Text>
                        <TouchableWithoutFeedback onPress={this.changeProductList}>
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
                    <ProductCommonList
                        isShowSmallProductList={this.state.isShowSmallProductList}
                        productData={this.state.productData}
                        popDoClick={(url, params)=>{this.popToNewView(url, params)}}
                    />
                    <TouchableWithoutFeedback>
                        <View style={styles.goProductList}>
                            <Text style={styles.goProductListText}>查看全部推荐商品</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

                <Request
                    ref="request"
                    isShowLoading={this.state.isShowLoading}
                />
            </View>
    	);
  	},
    popToNewView(url, params){
        this.props.navigation.navigate(url, params);
    },
    componentDidMount(){
        this.getInitMsg();
    },
    getInitMsg(){
        this.setState({isShowLoading: true}, ()=>{
            this.getBannerNoticeData();
            this.getProductData();
        });
    },
    getBannerNoticeData(){
        let _this = this;
        bannerNoticeReq = true;
        this.refs.request.PostService(API.BANNER_NOTICE, {}, function(result){
            bannerNoticeReq = false;
            _this.isRequestFinish();
            if(result == '请求超时'){
                alert("请求超时");
                return;
            }
            if(result.hasOwnProperty('banner') && result.banner.length === 0){
                result.banner[0] = 'index_banner_1';
                result.banner[1] = 'index_banner_2';
            }
            _this.setState({bannerNoticeData: result});
        }, true);
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
            productReq = false;
            _this.isRequestFinish();
            if(result == '请求超时'){
                alert("请求超时");
                return;
            }
            if(result.data.length !== 0){
                _this.setState({productData: result.data});
            }
        }, true);
    },
    doRefresh(){
        this.getInitMsg();
    },
    isRequestFinish(){
        if(!bannerNoticeReq && !productReq){
            this.setState({isShowLoading: false});
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