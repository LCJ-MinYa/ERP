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
	propTypes:{
		isShowBack: React.PropTypes.bool.isRequired,
		isShowRight: React.PropTypes.bool.isRequired,
		rightText: React.PropTypes.string.isRequired,
	},
	getDefaultProps: function() {
		return {
			isShowBack: true,
			isShowRight: false,
			rightText: ''
		};
	},
	renderGoback(){
		if(this.props.isShowBack){
			return(
				<TouchableWithoutFeedback onPress={this.goBack}>
					<View style={styles.leftIconBox}>
						<Text style={styles.leftIcon}>&#xe640;</Text>
					</View>
				</TouchableWithoutFeedback>
			)
		}
	},
	renderRight(){
		if(this.props.isShowRight){
			return(
				<TouchableWithoutFeedback onPress={this.doRightBtn}>
					<View style={styles.rightBox}>
						<Text style={styles.rightText}>{this.props.rightText}</Text>
					</View>
				</TouchableWithoutFeedback>
			)
		}
	},
	render() {
		return (
	  		<View style={styles.headerBox}>
	  			<View style={styles.commonHeaderBox}>
	  				{this.renderGoback()}
      				<View style={styles.titleView}>
      					<Text style={styles.title}>{this.props.headerTitle}</Text>
      				</View>
      				{this.renderRight()}
	  			</View>
	  		</View>
		);
	},
	goBack(){
		this.props.popDoClick(null);
	},
	doRightBtn(){
		this.props.doRightBtn();
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
	},
	rightBox:{
		position: 'absolute',
		right: 0,
		top: 0,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rightText:{
		fontSize: 14,
		color: '#fff',
		paddingRight: 10
	}
});


export default commonHeader;