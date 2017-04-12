'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import tabBar from '../common/tabBar.js';

var cart = React.createClass({
  	render() {
    	return (
      		<Text>购物车首页</Text>
    	);
  	}
})

tabBar.setNavigationOptions(cart, '购物车页面', '购物车', 'cart');

const styles = StyleSheet.create({

});

export default cart;