'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import tabBar from '../common/tabBar.js';

var mine = React.createClass({
  	render() {
    	return (
      		<Text>我的首页</Text>
    	);
  	}
})

tabBar.setNavigationOptions(mine, '我的页面', '我的', 'mine');

const styles = StyleSheet.create({

});

export default mine;