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
	getInitialState: function() {
		return {
			notice: [],
		};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.noticeData.length !== 0){
			this.setState({notice: nextProps.noticeData})
		}
	},
	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.leftIconBox}>
					<Text style={styles.leftIcon}>&#xe62b;</Text>
				</View>
				<Swiper
					horizontal={false}
					autoplay={true}
					showsPagination={false}
					scrollEnabled={false}
					height={36}
					width={width-36}
					onTouchEnd={this.goNewsView}
				>
			        {this.renderNoticeItemView()}
			  	</Swiper>
		  	</View>
		);
	},
	renderNoticeItemView(){
		let noticeItemArr = [];
		for (var i = 0; i < this.state.notice.length; i++) {
			noticeItemArr.push(
		        <View style={styles.slide} key={i} onPress={this.goNewsView}>
		          	<Text numberOfLines={1} style={styles.text}>【最新公告】{this.state.notice[i].name}</Text>
		        </View>
			)
		}
		return noticeItemArr;
	},
	goNewsView(e, state){
		console.log(state.index);
	}
});

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		height: 36,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	leftIconBox:{
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	leftIcon:{
		fontFamily: 'iconfont',
		fontSize: 24,
		color: '#f65a44'
	},
  	slide: {
	    height: 36,
	    justifyContent: 'center'
  	},
  	text: {
	    color: 'gray',
	    fontSize: 16,
	    paddingRight: 10
  	}
});


export default productNotice;