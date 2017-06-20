'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	ListView,
  	Text,
  	Image,
  	Dimensions,
  	RefreshControl,
  	TouchableWithoutFeedback
} from 'react-native';
import CommonListView from '../common/commonListView';

let {width, height} = Dimensions.get('window');
let productCommonList = React.createClass({
	propTypes:{
		isShowRefresh: React.PropTypes.bool.isRequired,
	},
	getDefaultProps: function() {
		return {
			isShowRefresh: false,
			isShowFooter: 0,
		};
	},
	render() {
		return (
			<View>
				{(()=>this.renderSmallList())()}
				{(()=>this.renderBigList())()}
			</View>
		);
	},
	renderSmallList(){
		console.log(this.props.isShowSmallProductList);
		if(this.props.isShowSmallProductList){
			return(
				<CommonListView
					arrayData={this.props.productData}
					isShowRefresh={this.props.isShowRefresh}
					renderRow={this.renderSmellRow}
					isRefreshing={this.props.isRefreshing}
                    doRefresh={this.props.doRefresh}
                    loadMoreData={this.props.loadMoreData}
                    isShowFooter={this.props.isShowFooter}
				/>
			)
		}
	},
	renderBigList(){
		if(!this.props.isShowSmallProductList){
			return(
				<CommonListView
					arrayData={this.props.productData}
					isShowRefresh={this.props.isShowRefresh}
					renderRow={this.renderBigRow}
					isRefreshing={this.props.isRefreshing}
                    doRefresh={this.props.doRefresh}
                    loadMoreData={this.props.loadMoreData}
                    isShowFooter={this.props.isShowFooter}
				/>
			)
		}
	},
	renderSmellRow(rowdata){
		return(
			<TouchableWithoutFeedback onPress={()=>{this.goProductDetail(rowdata.id)}}>
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
			</TouchableWithoutFeedback>
		)
	},
	renderBigRow(rowdata, sectionID, rowID){
		let marginRightStyle;
		rowID%2 == 0 ? (marginRightStyle = {marginRight: 5}) : (marginRightStyle = {marginRight: 0});
		return(
			<TouchableWithoutFeedback onPress={()=>{this.goProductDetail(rowdata.id)}}>
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
			</TouchableWithoutFeedback>
		)
	},
	goProductDetail(id){
		this.props.popDoClick('ProductDetail',{productId: id});
	}
});

const styles = StyleSheet.create({
	productListSmellBox:{
	},
	productListBigBox:{
		flexDirection: 'row',
		backgroundColor: '#fff',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
	},
	smallCellBox:{
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
	},
	footerBoxView:{
		height: 40,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default productCommonList;