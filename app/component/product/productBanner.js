'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Dimensions,
  	ScrollView
} from 'react-native';

let {width, height} = Dimensions.get('window');

let productBanner = React.createClass({
  	render() {
    	return (
    		<View style={styles.bannerBox}>
    			<ScrollView
    			  horizontal={true}
    			  pagingEnabled={true}
    			  showsHorizontalScrollIndicator={false}
    			  onMomentumScrollEnd={this.onScrollAnimationEnd}
    			>
    				{this.renderScrollItem()}
    			</ScrollView>


      		</View>
    	);
  	},
  	//banner元素
  	renderScrollItem(){
  		let bannerItemArr = [];
  		let bannerData = 
  	},
  	//ScrollView切换时调用
  	onScrollAnimationEnd(e){

  	}
});

const styles = StyleSheet.create({
	bannerBox:{
		flex: 1,
		height: width / 3,
		backgroundColor: 'yellow'
	}
});


export default productBanner;