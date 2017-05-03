'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Config from '../../config/config.js';

import ProductHeader from '../common/productHeader.js';
import ProductCommonList from '../common/productCommonList.js';

let {width, height} = Dimensions.get('window');
let productList = React.createClass({
    getInitialState: function() {
        return {
        	params: {},//记录参数用，不刷新视图
        	pageIndex: 1,
        	isShowSmallProductList: true,
            productData: [],
            isRefreshing: false,
            isShowLoading: true,
            isShowFooter: 0,//0不显示 1.加载中... 2.没有更多数据了
            isLoadMore: false,
        };
    },
	render() {
		return(
			<View style={styles.container}>
				{/*---- 商品列表header ----*/}
				<ProductHeader
					showProductClass={false}
					showSaoYiSao={false}
					popDoClick = {(url, params)=>{this.popToNewView(url, params)}} 
				/>

				{/*---- 商品列表nav ----*/}
				<View style={styles.navBox}>
					<View style={styles.navIconBox}>
						<Text style={styles.navIcon}>&#xe611;</Text>
					</View>
					<View style={[styles.navSortBox, styles.borderLeft, styles.borderRight]}>
						<View style={[styles.navTextView,{borderBottomWidth: 2,borderBottomColor: '#f65a44'}]}>
							<Text style={styles.navText}>价格</Text>
						</View>
						<View style={styles.navTextView}>
							<Text style={styles.navText}>上架</Text>
						</View>
						<View style={styles.navTextView}>
							<Text style={styles.navText}>销量</Text>
						</View>
					</View>
					<View style={styles.navIconBox}>
						<Text style={[styles.navIcon,{fontSize: 14}]}>&#xe6a9;</Text>
					</View>
					<View style={[styles.navIconBox,styles.borderLeft]}>
						<Text style={styles.navIcon}>&#xe613;</Text>
					</View>
				</View>

				<ProductCommonList
					isShowSmallProductList={this.state.isShowSmallProductList}
					productData={this.state.productData}
					isShowRefresh={true}
					isRefreshing={this.state.isRefreshing}
					doRefresh={()=>this.doRefresh()}
					loadMoreData={()=>this.loadMoreData()}
					isShowFooter={this.state.isShowFooter}
					popDoClick={(url, params)=>{this.popToNewView(url, params)}}
				/>

				<Request
					ref="request"
					isShowLoading={this.state.isShowLoading}
				/>
			</View>
		)
	},
	componentDidMount(){
		this.getProductData(false, true);
	},
	getProductData(isRefresh, isFirst){
		let _this = this;
		this.state.params = this.props.navigation.state.params;
		let params = JSON.parse(JSON.stringify(this.state.params));
		params.pageSize = Config.PAGESIZE;
		if(isRefresh){
			this.state.pageIndex = 1;
			params.pageIndex = this.state.pageIndex;
		}else{
			params.pageIndex = this.state.pageIndex;
		}
        this.refs.request.PostService(API.PRODUCT_LIST, params, function(result){
        	console.log(result);
        	//判断是否首次加载
        	if(isFirst){
        		_this.setState({isShowLoading: false});
        	}
        	//判断是否是下啦刷新加载
        	if(isRefresh){
        		_this.setState({isRefreshing: false});
        	}
        	//判断是非还有更多数据
        	if(_this.state.pageIndex < result.pageCount){
        		_this.setState({isShowFooter: 0});
        	}else{
        		_this.setState({isShowFooter: 2});
        	}

            if(result.data.length !== 0){
            	if(_this.state.pageIndex == 1){
            		_this.setState({productData: result.data});
            	}else{
            		_this.setState({productData: _this.state.productData.concat(result.data)});
            	}
                _this.state.pageIndex += 1;
                _this.state.isLoadMore = false;
            }
        })
	},
	popToNewView(url, params){
		if(!url){
			this.props.navigation.goBack(url);
		}else{
			this.props.navigation.navigate(url, params);
		}
	},
	doRefresh(){
		this.setState({isRefreshing: true,});
		this.getProductData(true);

	},
	loadMoreData(){
		if(this.state.isLoadMore || this.state.isShowFooter == 2){
			return
		}
		this.state.isLoadMore = true;
		this.setState({isShowFooter: 1});
		this.getProductData();
	}
});

const styles = StyleSheet.create({
	container:{
		flex: 1,
        backgroundColor: '#eee'
	},
	navBox:{
		width: width,
		flexDirection: 'row',
		height: 25,
		borderBottomWidth: 0.5,
		borderBottomColor: '#e1e1e1',
		backgroundColor: '#fafafa'
	},
	navIconBox:{
		height: 25,
		width: 45,
		justifyContent: 'center',
		alignItems: 'center'
	},
	navIcon:{
		fontFamily: 'iconfont',
		fontSize: 18,
		color: '#3d4145'
	},
	borderRight:{
		borderRightWidth: 0.5,
		borderRightColor: '#f0f0f0'
	},
	borderLeft:{
		borderLeftWidth: 0.5,
		borderLeftColor: '#f0f0f0',
	},
	navSortBox:{
		width: width - 3*45 - 1.5,
		height: 25,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	navTextView:{
		flex: 1,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center'	
	},
	navText:{
		fontSize: 14,
		color: '#3d4145'
	}
});


export default productList;