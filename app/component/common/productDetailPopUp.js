'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	TouchableWithoutFeedback
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
	        		</View>
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
		height: 300,
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
});

export default productDetailPopUp;