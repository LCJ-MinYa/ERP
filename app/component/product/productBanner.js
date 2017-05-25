'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Dimensions,
  	ScrollView,
  	ListView,
  	Image,
  	Text
} from 'react-native';

let {width, height} = Dimensions.get('window');
let productBanner = React.createClass({
	getInitialState: function() {
		let ds = new ListView.DataSource({
			rowHasChanged:(row1, row2) => row1 !== row2
		})
		return {
			dataSource: ds,
			activePage: 0,
			activePageNumber: 0
		};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.bannerData instanceof Array){
			if(nextProps.bannerData.length !== 0){
				this.setState({activePageNumber: nextProps.bannerData.length})
				this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.bannerData)})
			}
		}
	},
  	render() {
    	return(
    		<View>
	    		{
	    			this.state.activePageNumber == 0 ? (null) : (
			    		<View>
			    			<ScrollView
			    			  horizontal={true}
			    			  pagingEnabled={true}
			    			  showsHorizontalScrollIndicator={false}
			    			  onMomentumScrollEnd={this.onScrollAnimationEnd}
			    			>
				    			{this.renderScrollItem()}
			    			</ScrollView>

			    			<View style={styles.pageNumberStyle}>
			    				{this.pageNumber()}
			    			</View>

			      		</View>
		      		)
	      		}
      		</View>
      	)
  	},
  	//banner元素
  	renderScrollItem(){
  		return(
			<ListView
				contentContainerStyle={styles.bannerBox}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				scrollEnabled={false}
				enableEmptySections={true}
				removeClippedSubviews={false}
			/>
  		);
  	},
  	renderRow(rowdata){
  		return(
			<Image
			  style={styles.bannerImage}
			  source={{uri: rowdata}}
			/>
  		)
  	},
  	//banner页码
  	pageNumber(){
  		let pageNumberArr = [], activeColor;
  		for (var i = 0; i < this.state.activePageNumber; i++) {
  			activeColor = (i === this.state.activePage) ? {backgroundColor: 'orange'} : {backgroundColor: 'gray'}
  			pageNumberArr.push(
  				<View key={i} style={[styles.bannerIcon, activeColor]}></View>
  			)
  		}
  		return pageNumberArr;
  	},
  	//ScrollView切换时调用
  	onScrollAnimationEnd(e){
		//求出当前页码
		let currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);
		//更新页面
		this.setState({
			activePage: currentPage
		})
  	}
});

const styles = StyleSheet.create({
	bannerBox:{
		flex: 1,
		height: width / 3,
		flexDirection: 'row'
	},
	bannerImage:{
		width: width,
		height: width / 3,
	},
	pageNumberStyle:{
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0)',
		position: 'absolute',
		bottom: 5,
		right: 15,
	},
	bannerIcon:{
		width: 8,
		height: 8,
		marginLeft: 10,
		borderRadius: 8
	}
});


export default productBanner;