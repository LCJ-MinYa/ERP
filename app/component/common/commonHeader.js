'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Dimensions,
  	Platform,
  	TouchableWithoutFeedback
} from 'react-native';

let {width, height} = Dimensions.get('window');
let commonHeader = React.createClass({
	render() {
		return (
	  		<View style={styles.headerBox}>
	  			<View style={styles.commonHeaderBox}>
      				<TouchableWithoutFeedback onPressIn={this.goBack}>
	      				<View style={styles.leftIconBox}>
	      					<Text style={styles.leftIcon}>&#xe640;</Text>
	      				</View>
      				</TouchableWithoutFeedback>
      				<View style={styles.titleView}>
      					<Text style={styles.title}>{this.props.headerTitle}</Text>
      				</View>
	  			</View>
	  		</View>
		);
	},
	goBack(){
		this.props.popDoClick(null);
	}
});

const styles = StyleSheet.create({
	headerBox:{
		width: width,
		height: Platform.OS == 'ios' ? 64 : 44,
		backgroundColor: '#f65a44',
	},
	commonHeaderBox:{
		flexDirection: 'row',
		marginTop: Platform.OS == 'ios' ? 20 : 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	leftIconBox:{
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
	},
	leftIcon:{
		fontFamily: 'iconfont',
		fontSize: 20,
		color: '#fff',
		paddingTop: 4,
	},
	titleView:{
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title:{
		color: '#fff',
		fontSize: 20
	}
});


export default commonHeader;