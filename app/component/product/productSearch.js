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
	    	</View>
	    );
  	},
  	goBack(){
  		this.setState({stateBar: 'light-content'}, ()=>{
  			this.props.navigation.goBack(null);
  		})
  	},
  	goSearch(){

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
		alignItems: 'center'
	},
	inputStyle:{
		width: UISize.width() - 144,
		paddingHorizontal: 10,
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
	}
});


export default productSearch;