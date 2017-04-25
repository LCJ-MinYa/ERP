'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Modal,
  	Text,
  	ActivityIndicator
} from 'react-native';

let loading = React.createClass({
	propTypes:{
		isShowLoading: React.PropTypes.bool.isRequired,
		loadingText: React.PropTypes.string.isRequired,
	},
	getDefaultProps: function() {
		return {
			isShowLoading: false,
			loadingText: '加载中...'
		};
	},
  	render() {
    	return (
      		<Modal
      			animationType={'fade'}
      			onRequestClose={() => this.close()}
      			visible={this.props.isShowLoading}
      			transparent={true}
      		>
      			<View style={styles.loadingWrap}>
      				<View style={styles.loadingBox}>
      					<ActivityIndicator
      						style={styles.loadingIcon}
      						color={'#fff'}
      						size={'large'}
      					/>
      					<Text style={styles.loadingTextStyle}>{this.props.loadingText}</Text>
      				</View>
      			</View>
      		</Modal>
    	);
  	},
  	close(){
  		console.log('onRequestClose...');
  	}
});

const styles = StyleSheet.create({
	loadingWrap:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'		
	},
	loadingBox: {
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		borderRadius: 5
	},
	loadingIcon:{
		padding: 10
	},
	loadingTextStyle:{
		color: '#fff'
	}
});

export default loading;