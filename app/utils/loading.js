'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	ActivityIndicator
} from 'react-native';
import UISize from './uiSize';

let loading = React.createClass({
	propTypes: {
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
		if (this.props.isShowLoading) {
			return (
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
			)
		} else {
			return null;
		}
	},
	close() {
		console.log('onRequestClose...');
	}
});

const styles = StyleSheet.create({
	loadingWrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: UISize.width(),
		height: UISize.height(),
		top: 0,
		left: 0,
	},
	loadingBox: {
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		borderRadius: 5,
		marginBottom: 80,
	},
	loadingIcon: {
		padding: 10
	},
	loadingTextStyle: {
		color: '#fff'
	}
});

export default loading;