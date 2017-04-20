'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	ListView,
  	Text,
  	Image,
  	Dimensions
} from 'react-native';
let {width, height} = Dimensions.get('window');
let productCommonList = React.createClass({
	getInitialState: function() {
		let ds = new ListView.DataSource({
			rowHasChanged:(row1, row2) => row1 !== row2
		})
		return {
			dataSource: ds,
		};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.productData.length !== 0){
			this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.productData)})
		}
	},
	render() {
		return (
			<View>
				{this.a()}
				{this.b()}
			</View>
		);
	},
	a(){
		if(this.props.isShowSmallProductList){
			return(
				<ListView
					contentContainerStyle={styles.productListSmellBox}
					dataSource={this.state.dataSource}
					renderRow={this.renderSmellRow}
					scrollEnabled={false}
					enableEmptySections={true}
				/>
			)
		}
	},
	b(){
		if(!this.props.isShowSmallProductList){
			return(
				<ListView
					contentContainerStyle={styles.productListBigBox}
					dataSource={this.state.dataSource}
					renderRow={this.renderBigRow}
					scrollEnabled={false}
					enableEmptySections={true}
				/>
			)
		}
	},
	renderSmellRow(rowdata){
		return(
			<View style={styles.smallCellBox}>
				<Image
				  	style={styles.productImage}
				  	source={{uri: rowdata.picUrl}}
				/>
				<View style={styles.rightBox}>
					<Text numberOfLines={2} style={styles.productName}>{rowdata.fullName}</Text>
					<Text style={styles.productUnit}>库存：{rowdata.stockQty}{rowdata.unit}</Text>
					<Text style={styles.productPrice}>
						¥
						<Text style={{fontSize: 18}}>{rowdata.price}</Text>
						<Text style={{fontSize: 14,color: '#323232'}}>／{rowdata.unit}</Text>
					</Text>
					<View style={styles.buyBtnBox}>
						<Text style={styles.butBtn}>&#xe600;</Text>
					</View>
				</View>
			</View>
		)
	},
	renderBigRow(rowdata){
		return(
			<View>
				<Text>{rowdata.fullName}</Text>
			</View>
		)
	}
});

const styles = StyleSheet.create({
	productListSmellBox:{
		flex: 1,
	},
	productListBigBox:{
		flex: 1,
	},
	smallCellBox:{
		flex: 1,
		height: 100,
		borderBottomWidth: 0.5,
		borderBottomColor: '#e1e1e1',
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	productImage:{
		width: 80,
		height: 80,
		marginLeft: 10,
		marginRight: 10
	},
	rightBox:{
		justifyContent: 'space-around',
		width: width-110
	},
	productName:{
		color: '#323232',
		fontSize: 15
	},
	productUnit:{
		color: '#727272',
		fontSize: 12,
		paddingTop: 5,
		paddingBottom: 5
	},
	productPrice:{
		color: '#f65a44',
		fontSize: 12
	},
	buyBtnBox:{
		width: 30,
		height: 30,
		borderRadius: 30,
		borderWidth: 0.5,
		borderColor: '#f65a44',
		position: 'absolute',
		right: 0,
		bottom: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	butBtn:{
		fontFamily: 'iconfont',
		fontSize: 16,
		color: '#f65a44',
		paddingTop: 1
	}
});

export default productCommonList;