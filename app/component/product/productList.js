'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import ProductHeader from '../common/productHeader.js';

let {width, height} = Dimensions.get('window');
let productList = React.createClass({
	render() {
		return(
			<ProductHeader
				showProductClass={false}
				showSaoYiSao={false}
				popDoClick = {(url)=>{this.popToClassView(url)}} 
			/>
		)
	},
	popToClassView(url){
		if(!url){
			this.props.navigation.goBack(url);
		}else{
			this.props.navigation.navigate(url);
		}
	}
});

const styles = StyleSheet.create({

});


export default productList;