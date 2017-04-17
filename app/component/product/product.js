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

import ProductHeader from '../common/productHeader.js';

var product = React.createClass({
  	render() {
  		const { navigate } = this.props.navigation;
    	return (
      		<View style={styles.container}>
                <ProductHeader/>
            </View>
    	);
  	}
})

tabBar.setNavigationOptions(product, '商品首页', '商品', 'shopping');

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eee'
    },
});

export default product;