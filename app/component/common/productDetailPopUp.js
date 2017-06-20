'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	TouchableWithoutFeedback,
  	Image
} from 'react-native';
import UISize from '../../utils/uiSize';
import Modal from 'react-native-modalbox';

let productDetailPopUp = React.createClass({
	getInitialState: function() {
		return {
			style: {}
		};
	},
  	resizeModal(ev) {
    	this.setState({style: {height: ev.nativeEvent.layout.height + 10}});
  	},
  	renderProductInfo(){
  		return(
			<View style={styles.goodsBasicInfo}>
				<Image
				  style={styles.productImg}
				  source={{uri: this.props.productData.picUrl}}
				/>
				<View style={styles.goodsTextInfo}>
					<Text numberOfLines={1} style={styles.goodsFullName}>{this.props.productData.fullName}</Text>
					<Text numberOfLines={1} style={styles.goodsUnitNumber}>起订量:{this.props.productData.minQty}{this.props.productData.unit}    库存:{this.props.productData.stockQty}{this.props.productData.unit}</Text>
					<Text
						style={styles.productTradePrice}
						numberOfLines={1}
					>
						批发价：<Text style={styles.productTradePriceColor}>¥<Text style={styles.productTradePriceSize}>{this.props.productData.tradePrice}</Text></Text>    市场价:¥{this.props.productData.marketPrice}
					</Text>
				</View>
				<TouchableWithoutFeedback onPress={this.props.hideProductDetailPopUp}>
					<View style={styles.closeView}>
						<Text style={styles.closeIcon}>&#xe642;</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
  		)
  	},
  	renderFootBtn(){
  		return(
			<View style={styles.footerView}>
                <View style={styles.footerLeftView}>
                    {
                        this.props.productData.isCollected ? (
                            <Text style={[styles.footerLeftIcon,{paddingTop: 2}]}>&#xe64b;</Text>
                        ) : (
                            <Text style={styles.footerLeftIcon}>&#xe64c;</Text>
                        )
                    }
                    <Text style={styles.footerLeftText}>收藏</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.showProductDetailPopUp}>
                    <View style={[styles.footerLeftView, styles.footerRightView]}>
                        <Text style={styles.footerRightText}>加入购物车</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
  		)
  	},
 	render() {
	    return (
	  		 <Modal
	  			ref={"modal"}
	        	style={[styles.modal, {height: this.state.modalHeight}]}
	          	isOpen={this.props.showProductDetailPopUp}
	          	onClosed={this.props.hideProductDetailPopUp}
	          	backButtonClose={true}
	          	position={'bottom'}
	        >
	        	<View style={styles.inner} onLayout={(ev)=>{this.resizeModal(ev)}}>
	        		<View style={styles.container}>
	        			{/*商品基本信息*/}
	        			{this.renderProductInfo()}

	        			{/*商品单位*/}
	        		</View>

	        		{/*底部按钮信息*/}
	        		{this.renderFootBtn()}
	                
                </View>
	        </Modal>
	    );
  	},
})

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#fff',
		width: UISize.width(),
	},
	inner:{
		width: UISize.width(),
	},
	container:{
		width: UISize.width(),
		marginBottom: 44
	},
  	footerView: {
  		width: UISize.width(),
  		height: 44,
  		flexDirection: 'row',
  		position: 'absolute',
  		bottom: 0,
  		left: 0
  	},
  	footerLeftView:{
  		flex: 1,
  		height: 44,
  		backgroundColor: '#e6e6e6',
  		flexDirection: 'row',
  		justifyContent: 'center',
  		alignItems: 'center'
  	},
  	footerLeftIcon:{
  		fontFamily: 'iconfont',
  		fontSize: 18,
  		color: '#f65a44',
  		paddingRight: 2
  	},
  	footerLeftText:{
  		color: '#323232',
  		fontSize: 14
  	},
  	footerRightView:{
  		backgroundColor: '#f65a44'
  	},
  	footerRightText:{
  		fontSize: 14,
  		color: '#fff'
  	},
  	goodsBasicInfo:{
  		flexDirection: 'row',
  		padding: UISize.p2d(20),
  		borderColor: '#e1e1e1',
  		borderBottomWidth: UISize.p2d(1)
  	},
  	productImg:{
  		width: UISize.p2d(140),
  		height: UISize.p2d(140)
  	},
  	goodsTextInfo:{
  		width: UISize.p2d(750 - 180),
  		paddingHorizontal: UISize.p2d(30),
  		justifyContent: 'center',
  	},
  	goodsFullName:{
  		fontSize: 15,
  		color: '#323232',
  	},
  	closeView:{
  		width: 20,
  		height: 20,
  		borderRadius: 10,
  		position: 'absolute',
  		top: 15,
  		right: 15,
  		justifyContent: 'center',
  		alignItems: 'center'
  	},
  	closeIcon:{
  		fontFamily: 'iconfont',
  		fontSize: 20,
  		color: '#828282'
  	},
  	goodsUnitNumber:{
  		paddingVertical: 8,
  		fontSize: 12,
  		color: '#727272'
  	},
    productTradePrice:{
        fontSize: 12,
        color: '#646464'
    },
    productTradePriceColor:{
        color: '#f65a44'
    },
    productTradePriceSize:{
        fontSize: 15
    },
});

export default productDetailPopUp;