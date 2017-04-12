'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import tabBar from '../common/tabBar.js';

var msg = React.createClass({
  	render() {
    	return (
      		<Text>消息首页</Text>
    	);
  	}
})

tabBar.setNavigationOptions(msg, '消息页面', '消息', 'msg');

const styles = StyleSheet.create({

});

export default msg;