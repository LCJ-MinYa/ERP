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
				{this.renderSmallList()}
				{this.renderBigList()}
			</View>
		);
	},
	renderSmallList(){
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
	renderBigList(){
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
					<Text numberOfLines={1} style={styles.productUnit}>库存：{rowdata.stockQty}{rowdata.unit}</Text>
					<Text numberOfLines={1} style={styles.productPrice}>
						¥
						<Text style={{fontSize: 18}}>{rowdata.price}</Text>
						<Text style={{fontSize: 14,color: '#323232'}}>／{rowdata.unit}</Text>
					</Text>
				</View>
				<View style={styles.buyBtnBox}>
					<Text style={styles.butBtn}>&#xe600;</Text>
				</View>
			</View>
		)
	},
	renderBigRow(rowdata, sectionID, rowID){
		let marginRightStyle;
		rowID%2 == 0 ? (marginRightStyle = {marginRight: 5}) : (marginRightStyle = {marginRight: 0});
		return(
			<View style={[styles.bigCellBox, marginRightStyle]}>
				<Image
				  style={styles.bigimage}
				  source={{uri: rowdata.picUrl}}
				/>
				<Text numberOfLines={2} style={[styles.productBigName, styles.allPadding]}>{rowdata.fullName}</Text>
				<Text numberOfLines={1} style={[styles.productBigUnit, styles.allPadding]}>库存：{rowdata.stockQty}{rowdata.unit}</Text>
				<Text numberOfLines={1} style={[styles.productBigPrice, styles.allPadding]}>¥<Text style={{fontSize: 18}}>{rowdata.price}</Text></Text>
				<View style={styles.buyBtnBox}>
					<Text style={styles.butBtn}>&#xe600;</Text>
				</View>			
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
		flexDirection: 'row',
		backgroundColor: '#fff',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
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
		right: 10,
		bottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	butBtn:{
		fontFamily: 'iconfont',
		fontSize: 16,
		color: '#f65a44',
		paddingTop: 1
	},
	bigCellBox:{
		width: (width-5) * 0.5,
		borderBottomWidth: 0.5,
		borderBottomColor: '#e1e1e1',
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		marginBottom: 5,	
	},
	bigimage:{
		width: (width-5) * 0.5,
		height: (width-5) * 0.5
	},
	productBigName:{
		height: 35,
		color: '#323232',
		fontSize: 15,
		marginTop: 10,
	},
	productBigUnit:{
		color: '#727272',
		fontSize: 12,
		paddingTop: 5,
		paddingBottom: 5
	},
	productBigPrice:{
		color: '#f65a44',
		fontSize: 12,
		paddingBottom: 5
	},
	allPadding:{
		paddingLeft: 10,
		paddingRight: 10,		
	}
});

export default productCommonList;