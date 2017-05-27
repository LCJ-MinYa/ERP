'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

var setNavigationOptions = function(obj, title, label, icon, pathName, num){
	obj.navigationOptions = ({navigation}) =>({
		gesturesEnabled: false,
		//tabBarVisible: false,
		path: pathName,
		title: title,
		tabBarLabel: label,
		tabBarIcon: ({tintColor}) =>{
			if(label == "购物车"){
				return(
					<View>
						<Image
						  style={[styles.icon, {tintColor: tintColor}]}
						  source={{uri: icon}}
						/>
						{/*<View style={styles.badgeView}>
							<Text style={styles.badgeText}>{num}</Text>
						</View>*/}
					</View>
				)
			}else if(label == "消息"){
				return(
					<Image
					  style={[styles.icon, {tintColor: tintColor}]}
					  source={{uri: icon}}
					/>
				)
			}else{
				return(
					<Image
					  style={[styles.icon, {tintColor: tintColor}]}
					  source={{uri: icon}}
					/>
				)
			}
		},
	})
}

const styles = StyleSheet.create({
	icon:{
		width: 24,
		height: 24
	},
	badgeView:{
		position: 'absolute',
		top: -5,
		right: -10,
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center'
	},
	badgeText:{
		color: '#fff',
		fontSize: 12
	}
});


module.exports = {
	setNavigationOptions
}