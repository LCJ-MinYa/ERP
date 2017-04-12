'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import tabBar from '../common/tabBar.js';

var order = React.createClass({
  	render() {
    	return (
      		<Text>订单首页</Text>
    	);
  	}
})

tabBar.setNavigationOptions(order, '订单页面', '订单', 'order');

const styles = StyleSheet.create({

});

export default order;