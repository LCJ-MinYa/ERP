'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  Image
} from 'react-native';

var setNavigationOptions = function(obj, title, label, icon, pathName){
	obj.navigationOptions = {
		path: pathName,
		title: title,
		tabBarLabel: label,
		//tabBarVisible: false,
		tabBarIcon: ({tintColor}) =>(
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  source={{uri: icon}}
			/>
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