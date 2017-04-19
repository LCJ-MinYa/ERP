'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
let productNotice = React.createClass({
	render() {
		return (
			<View style={styles.wrapper}>
				<Text></Text>
				<Swiper
					horizontal={false}
					autoplay={true}
					showsPagination={false}
					scrollEnabled={false}
					height={30}
					width={width-20}
				>
			        <View style={styles.slide1}>
			          	<Text style={styles.text}>Hello Swiper</Text>
			        </View>
			        <View style={styles.slide2}>
			          	<Text style={styles.text}>Beautiful</Text>
			        </View>
			        <View style={styles.slide3}>
			          	<Text style={styles.text}>And simple</Text>
			        </View>
			  	</Swiper>
		  	</View>
		);
	}
});

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		height: 30,
		flexDirection: 'row',
		backgroundColor: '#fff'
	},
  	slide1: {
	    height: 30,
  	},
  	slide2: {
	    height: 30,
  	},
 	 slide3: {
	    height: 30,
  	},
  	text: {
	    color: 'yellow',
	    fontSize: 12,
	    fontWeight: 'bold',
  	}
});


export default productNotice;