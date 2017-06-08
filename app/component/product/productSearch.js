'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Platform,
  	StatusBar,
  	TouchableOpacity
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
      				</View>
	    		</View>
	    	</View>
	    );
  	},
  	goBack(){
  		this.setState({stateBar: 'light-content'}, ()=>{
  			this.props.navigation.goBack(null);
  		})
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
	}
});


export default productSearch;