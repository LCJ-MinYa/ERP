'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

var setNavigationOptions = function(obj, title, label, icon, pathName){
	obj.navigationOptions = {
		//gesturesEnabled: false,
		path: pathName,
		title: title,
		tabBarLabel: label,
		//tabBarVisible: false,
		tabBarIcon: ({tintColor}) =>(
			<View>
				<Image
				  style={[styles.icon, {tintColor: tintColor}]}
				  source={{uri: icon}}
				/>
				<Text>66</Text>
			</View>
		),
	}
}

const styles = StyleSheet.create({
	icon:{
		width: 24,
		height: 24
	}
});


module.exports = {
	setNavigationOptions
}