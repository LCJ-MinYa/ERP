'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Dimensions,
  	Text,
  	Image
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Swiper from 'react-native-swiper';

let {width, height} = Dimensions.get('window');
class productDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowLoading: true
        };
    }
  	render() {
    	return (
    		<View>
	      		<Text>123</Text>
	            <Request
	                ref="request"
	                isShowLoading={this.state.isShowLoading}
	            />
            </View>
    	);
  	}
  	componentDidMount(){
  		let id = this.props.navigation.state.params.productId;
  		this.doReqProductDetail(id);
  	}
  	doReqProductDetail(id){
  		this.getProductDetailData(id);
  		this.getRelevanceProductData(id);
  		this.doAddBrowsingRecord(id);
  	}
  	getProductDetailData(id){
  		let _this = this;
  		this.refs.request.PostService(API.PRODUCT_DETAIL, {
  			productId: id
  		}, function(result){
  			console.log(result);
  			_this.setState({
  				isShowLoading: false
  			})
  		})
  	}
  	getRelevanceProductData(id){
  		let _this = this;
  		this.refs.request.PostService(API.RELEVANCE_PRODUCT, {
  			productId: id
  		}, function(result){
  			console.log(result);
  		})
  	}
  	doAddBrowsingRecord(id){
  		let _this = this;
  		this.refs.request.PostService(API.ADD_BROWSING_RECORD, {productId: id}) 		
  	}
}

const styles = StyleSheet.create({

});

export default productDetail;