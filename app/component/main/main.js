'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

var main = React.createClass({
  	render() {
    	return (
			<View style={{backgroundColor:'white',width:750-44,height: 36,marginTop: 2,flexDirection:'row',alignItems: 'center',justifyContent: 'space-around',}} >
				<Text style={{ color: 'red', fontFamily:'iconfont',fontSize: 30 }}>&#xe65e;</Text>
			</View>
    	);
  	}
})

const styles = StyleSheet.create({

});

module.exports = main;