'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text
} from 'react-native';

let productTypeNav = React.createClass({
	getInitialState: function() {
		return {
			goodsLabel: {
				hotLabel: "热销",
				newsLabel: "新款",
				promotionLabel: "特价",
				recommendLabel: "推荐"
			}
		};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.goodsLabelData.hasOwnProperty('hotLabel')){
			this.setState({goodsLabel: nextProps.goodsLabelData})
		}
	},
  	render() {
    	return (
      		<View style={styles.typeNavBox}>
      			{this.productItemView('#f5740e', 1)}
      			{this.productItemView('#80cd40', 2)}
      			{this.productItemView('#fdbd35', 3)}
      			{this.productItemView('#53adff', 4)}
      			{this.productItemView('#f65a44', 5)}
      		</View>
    	);
  	},
  	productItemView(color, icon){
  		let navIconView, navIconText;
  		switch(icon){
  			case 1:
  				navIconView = <Text style={styles.navIcon}>&#xe629;</Text>;
  				navIconText = '全部';
  				break;
  			case 2:
  				navIconView = <Text style={styles.navIcon}>&#xe626;</Text>;
  				navIconText = this.state.goodsLabel.promotionLabel;
  				break;
  			case 3:
  				navIconView = <Text style={styles.navIcon}>&#xe62a;</Text>;
  				navIconText = this.state.goodsLabel.newsLabel;
  				break;
  			case 4:
  				navIconView = <Text style={styles.navIcon}>&#xe627;</Text>;
  				navIconText = this.state.goodsLabel.hotLabel;
  				break;
  			case 5:
  				navIconView = <Text style={styles.navIcon}>&#xe64c;</Text>;
  				navIconText = '推荐';
  				break;
  		}
  		return(
  			<View style={styles.typeNavItem}>
	  			<View style={[styles.navColor,{backgroundColor: color}]}>
	  				{navIconView}
	  			</View>
	  			<Text style={styles.navText}>{navIconText}</Text>
  			</View>
  		)
  	}
});

const styles = StyleSheet.create({
	typeNavBox:{
		flex: 1,
		flexDirection: 'row',
		height: 80,
		backgroundColor: '#fff',
		borderBottomWidth: 0.5,
		borderBottomColor: '#ececec'
	},
	typeNavItem:{
		flex: 1,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center'
	},
	navColor:{
		width: 36,
		height: 36,
		borderRadius: 36,
		alignItems: 'center',
		marginBottom: 10,
		justifyContent: 'center'
	},
	navIcon:{
		fontFamily: 'iconfont',
		fontSize: 18,
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0)'
	},
	navText:{
		color: '#4d4d4d',
		fontSize: 14
	}
});


export default productTypeNav;