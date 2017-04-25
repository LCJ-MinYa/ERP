'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
} from 'react-native';

import CommonHeader from '../common/commonHeader.js';

let productClass = React.createClass({
	getInitialState: function() {
		return {
			headerTitle: '商品分类' 
		};
	},
	render() {
		return (
		  	<View style={styles.container}>
		  		<CommonHeader
		  			popDoClick={(url, params)=>{this.popToNewView(url, params)}}
		  			headerTitle={this.state.headerTitle}
		  		/>
		  	</View>
		);
	},
	popToNewView(url, params){
		if(!url){
			this.props.navigation.goBack(url);
		}else{
			this.props.navigation.navigate(url);
		}
	},
});

const styles = StyleSheet.create({
	container:{
		flex: 1
	}
});

export default productClass;