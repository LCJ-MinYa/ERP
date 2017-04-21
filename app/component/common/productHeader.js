'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
let {width, height} = Dimensions.get('window');
let productHeader = React.createClass({
	propTypes:{
		showProductClass: React.PropTypes.bool.isRequired,
		showSaoYiSao: React.PropTypes.bool.isRequired,
	},
	getDefaultProps: function() {
		return {
			showProductClass: true,
			showSaoYiSao: true,
		};
	},
  	render() {
    	return (
      		<View style={styles.headerBox}>
      			<View style={styles.commonHeaderBox}>
      				<TouchableWithoutFeedback onPressIn={this.goLeft}>
	      				<View style={styles.leftIconBox}>
	      					{this.renderLeftIcon()}
	      				</View>
      				</TouchableWithoutFeedback>
      				<View style={styles.middleInput}>
      					<Text style={styles.searchIcon}>&#xe623;</Text>
      					<Text style={styles.searchMsg}>输入商品名称或编号进行搜索</Text>
      				</View>
      				<TouchableWithoutFeedback onPressIn={this.goRight}>
	      				<View style={styles.leftIconBox}>
	      					{this.renderRightIcon()}
	      				</View>
      				</TouchableWithoutFeedback>
      			</View>
      		</View>
	  	);
  	},
  	renderLeftIcon(){
  		if(this.props.showProductClass){
  			return (<Text style={styles.leftIcon}>&#xe611;</Text>);
  		}else{
  			return (<Text style={[styles.leftIcon,{paddingTop: 2}]}>&#xe640;</Text>);
  		}
  	},
  	renderRightIcon(){
  		if(this.props.showSaoYiSao){
  			return (<Text style={[styles.leftIcon, styles.rightIcon]}>&#xe602;</Text>);
  		}else{
  			return (<Text style={[styles.leftIcon, styles.rightIcon]}>&#xe600;</Text>);
  		}
  	},
  	goLeft(){
  		if(this.props.showProductClass){
  			this.props.popDoClick('ProductClass');
  		}else{
  			this.props.popDoClick(null);
  		}
  	},
  	goRight(){
  		this.props.popDoClick('Root');
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
	leftIconBox:{
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	},
	leftIcon:{
		fontFamily: 'iconfont',
		fontSize: 26,
		color: '#fff',
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