'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  Image
} from 'react-native';

var setNavigationOptions = function(obj, title, label, icon){
	obj.navigationOptions = {
		title: title,
		tabBar:{
			label: label,
			icon: ({tintColor}) =>(
				<Image
				  style={[styles.icon, {tintColor: tintColor}]}
				  source={{uri: icon}}
				/>
			),
			//visible: false,
		},
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