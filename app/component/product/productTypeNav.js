'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text
} from 'react-native';

let productTypeNav = React.createClass({
  	render() {
    	return (
      		<View style={styles.typeNavBox}>
      			{this.productItemView('#f5740e', '&#xe629;', '全部')}
      			{this.productItemView('#f5740e', '&#xe629;', '全部')}
      			{this.productItemView('#f5740e', '&#xe629;', '全部')}
      			{this.productItemView('#f5740e', '&#xe629;', '全部')}
      			{this.productItemView('#f5740e', '&#xe629;', '全部')}
      		</View>
    	);
  	},
  	productItemView(color, icon, text){
  		return(
  			<View style={styles.typeNavItem}>
	  			<View style={[styles.navColor,{backgroundColor: color}]}>
	  				<Text style={styles.navIcon}>{icon}</Text>
	  			</View>
	  			<Text style={styles.navText}>{text}</Text>
  			</View>
  		)
  	}
});

const styles = StyleSheet.create({
	typeNavBox:{
		flex: 1,
		flexDirection: 'row',
		height: 60,
		backgroundColor: '#fff'
	},
	typeNavItem:{
		flex: 1,
		height: 60
	},
	navColor:{
		width: 30,
		height: 30,
		borderRadius: 30
	},
	navIcon:{

	},
	navText:{

	}
});


export default productTypeNav;