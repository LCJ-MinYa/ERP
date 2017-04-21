'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import ProductHeader from '../common/productHeader.js';

let {width, height} = Dimensions.get('window');
let productList = React.createClass({
	getDefaultProps: function() {
		return {
			
		};
	},
	render() {
		return(
			<View style={styles.container}>
				{/*---- 商品列表header ----*/}
				<ProductHeader
					showProductClass={false}
					showSaoYiSao={false}
					popDoClick = {(url)=>{this.popToClassView(url)}} 
				/>

				{/*---- 商品列表nav ----*/}
				<View style={styles.navBox}>
					<View style={styles.navIconBox}>
						<Text style={styles.navIcon}>&#xe611;</Text>
					</View>
					<View style={[styles.navSortBox, styles.borderLeft, styles.borderRight]}>
						<View style={[styles.navTextView,{borderBottomWidth: 2,borderBottomColor: '#f65a44'}]}>
							<Text style={styles.navText}>价格</Text>
						</View>
						<View style={styles.navTextView}>
							<Text style={styles.navText}>上架</Text>
						</View>
						<View style={styles.navTextView}>
							<Text style={styles.navText}>销量</Text>
						</View>
					</View>
					<View style={styles.navIconBox}>
						<Text style={[styles.navIcon,{fontSize: 14}]}>&#xe6a9;</Text>
					</View>
					<View style={[styles.navIconBox,styles.borderLeft]}>
						<Text style={styles.navIcon}>&#xe613;</Text>
					</View>
				</View>

			</View>
		)
	},
	popToClassView(url){
		if(!url){
			this.props.navigation.goBack(url);
		}else{
			this.props.navigation.navigate(url);
		}
	}
});

const styles = StyleSheet.create({
	container:{
        flex: 1,
        backgroundColor: '#eee'
	},
	navBox:{
		flexDirection: 'row',
		height: 25,
		borderBottomWidth: 0.5,
		borderBottomColor: '#e1e1e1',
		backgroundColor: '#fafafa'
	},
	navIconBox:{
		height: 25,
		width: 45,
		justifyContent: 'center',
		alignItems: 'center'
	},
	navIcon:{
		fontFamily: 'iconfont',
		fontSize: 18,
		color: '#3d4145'
	},
	borderRight:{
		borderRightWidth: 0.5,
		borderRightColor: '#f0f0f0'
	},
	borderLeft:{
		borderLeftWidth: 0.5,
		borderLeftColor: '#f0f0f0',
	},
	navSortBox:{
		width: width - 3*45 - 1.5,
		height: 25,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	navTextView:{
		flex: 1,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center'	
	},
	navText:{
		fontSize: 14,
		color: '#3d4145'
	}
});


export default productList;