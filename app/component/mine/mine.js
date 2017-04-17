'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import storage from '../../utils/customStorage.js';

var mine = React.createClass({
  	render() {
    	return (
    		<View>
    			<Text style={{marginTop: 100}} onPress={this.clearLogin}>我的首页</Text>
    		</View>
    	);
  	},
  	clearLogin(){
  		storage.getData('token')
  		.then((value)=>{
  			console.log(value);
  		})
  	}
})

const styles = StyleSheet.create({

});

export default mine;