'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions
} from 'react-native';
let {width, height} = Dimensions.get('window');
let productHeader = React.createClass({
  	render() {
    	return (
      		<View style={styles.headerBox}>
      			<View style={styles.commonHeaderBox}>
      				<Text style={styles.leftIcon} onPress={this.goLeft}>&#xe611;</Text>
      				<View style={styles.middleInput}>
      					<Text style={styles.searchIcon}>&#xe623;</Text>
      					<Text style={styles.searchMsg}>输入商品名称或编号进行搜索</Text>
      				</View>
      				<Text style={[styles.leftIcon, styles.rightIcon]} onPress={this.goRight}>&#xe602;</Text>
      			</View>
      		</View>
	  	);
  	},
  	goLeft(){
  		this.props.popGoLeft('ProductList');
  	},
  	goRight(){
  		alert('right');
  	}
})

const styles = StyleSheet.create({
	headerBox:{
		height: Platform.OS == 'ios' ? 64 : 44,
		backgroundColor: '#f65a44',
	},
	commonHeaderBox:{
		flexDirection: 'row',
		marginTop: Platform.OS == 'ios' ? 20 : 0,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	leftIcon:{
		fontFamily: 'iconfont',
		fontSize: 26,
		color: '#fff',
		width: 44,
		height: 44,
		textAlign: 'center',
		lineHeight: 44
	},
	rightIcon:{
		fontSize: 22
	},
	middleInput:{
		flexDirection: 'row',
		width: width - 44*2,
		height: 30,
		backgroundColor: '#eee',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	searchIcon:{
		fontFamily: 'iconfont',
		color: '#909090',
		fontSize: 14,
		paddingLeft: 10,
		paddingRight: 10
	},
	searchMsg:{
		color: '#909090'
	}
});

export default productHeader;