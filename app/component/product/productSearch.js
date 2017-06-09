'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Platform,
  	StatusBar,
  	TouchableOpacity,
  	TextInput
} from 'react-native';
import UISize from '../../utils/uiSize';
let productSearch = React.createClass({
	getInitialState: function() {
		return {
			stateBar: 'dark-content'
		};
	},
  	render() {
	    return (
	    	<View style={styles.container}>
	    		<StatusBar
	    			barStyle={this.state.stateBar}
	    		/>

	    		{/*搜索header*/}
	    		<View style={styles.headerBox}>
	    			<View style={styles.commonHeaderBox}>
	      				<TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
		      				<View style={styles.leftIconBox}>
		      					<Text style={[styles.leftIcon,{paddingTop: 2,fontSize: 20}]}>&#xe640;</Text>
		      				</View>
	      				</TouchableOpacity>
	      				<View style={styles.middleInput}>
		      				<TextInput
		                        autoCapitalize={'none'}
		                        style={styles.inputStyle}
		                        placeholder='输入商品名称或编号进行搜索'
		                        underlineColorAndroid={'transparent'}
		                    />
	      				</View>
	      				<TouchableOpacity activeOpacity={0.8} onPress={this.goSearch}>
		      				<View style={styles.rightBox}>
		      					<Text style={styles.rightText}>搜索</Text>
		      				</View>
	      				</TouchableOpacity>
      				</View>
	    		</View>

	    		{/*搜索历史*/}
	    		<Text style={styles.searchHistroyTitle}>搜索历史</Text>
	    		<View style={styles.searchHistroyBox}>
	    			<Text style={styles.searchHistroyList}>aa</Text>
	    			<Text style={styles.searchHistroyList}>aa</Text>
	    			<Text style={styles.searchHistroyList}>aa</Text>
	    			<Text style={styles.searchHistroyList}>aa</Text>

	    		</View>

	    		{/*底部清空按钮*/}
	    		<TouchableOpacity activeOpacity={0.8} onPress={this.clearSearchHistroy} style={styles.clearSearchHistroyBox}>
	    			<View style={styles.clearSearchHistroyView}>
	    				<Text style={styles.clearSearchHistroyText}>清空搜索历史</Text>
	    			</View>
	    		</TouchableOpacity>
	    	</View>
	    );
  	},
  	goBack(){
  		this.setState({stateBar: 'light-content'}, ()=>{
  			this.props.navigation.goBack(null);
  		})
  	},
  	goSearch(){

  	},
  	clearSearchHistroy(){

  	}
})

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff'
	},
	headerBox:{
		width: UISize.width(),
		height: Platform.OS == 'ios' ? 64 : 44,
		backgroundColor: '#fff',
		borderColor: '#e7e7e7',
		borderBottomWidth: 0.5
	},
	commonHeaderBox:{
		flexDirection: 'row',
		marginTop: Platform.OS == 'ios' ? 20 : 0,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	leftIconBox:{
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	},
	leftIcon:{
		fontFamily: 'iconfont',
		fontSize: 26,
		color: '#b5b5b5',
	},
	middleInput:{
		width: UISize.width() - 144,
		marginVertical: 7,
		marginHorizontal: 10,
		height: 30,
		borderColor: '#f65a44',
		borderBottomWidth: 0.5,
	},
	inputStyle:{
		width: UISize.width() - 144,
		paddingHorizontal: 10,
		paddingVertical: 0,
		height: 30,
		fontSize: 14,
	},
	rightBox:{
		marginVertical: 7,
		marginHorizontal: 10,
		width: 60,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f65a44',
		borderRadius: 5,
	},
	rightText:{
		fontSize: 14,
		color: '#fff'
	},
	clearSearchHistroyBox:{
		width: UISize.width(),
		height: 48,
		borderColor: '#e1e1e1',
		borderTopWidth: 0.5,
		position: 'absolute',
		bottom: 0,
		left: 0
	},
	clearSearchHistroyView:{
		width: UISize.width(),
		height: 48,
		justifyContent: 'center',
		alignItems: 'center'
	},
	clearSearchHistroyText:{
		color: '#f65a44',
		fontSize: 14
	},
	searchHistroyTitle:{
		marginVertical: 20,
		marginLeft: 15,
		color: '#494949',
		fontSize: 14
	},
	searchHistroyBox:{
		width: UISize.width(),
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row',
		paddingHorizontal: 30,
	},
	searchHistroyList:{
		padding: 10,
		marginRight: 10,
		marginBottom: 10,
		backgroundColor: '#f4f4f4',
		color: '#717171',
		borderRadius: 5
	}
});


export default productSearch;