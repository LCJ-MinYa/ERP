'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import tabBar from '../common/tabBar.js';

var product = React.createClass({
  	render() {
    	return (
      		<Text style={{marginTop: 100}} onPress={()=> this.props.navigation.navigate('ProductList')}>商品首页</Text>
    	);
  	}
})

tabBar.setNavigationOptions(product, '商品首页', '商品', 'shopping');

const styles = StyleSheet.create({

});

export default product;