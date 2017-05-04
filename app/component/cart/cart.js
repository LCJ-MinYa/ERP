'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';

import { connect,Provider } from 'react-redux';

var cart = React.createClass({
  	render() {
  		const {dispatch, cart} = this.props;
    	return (
    		<View>
      			<Text>购物车首页</Text>
      			<Text>{cart}</Text>
      		</View>
    	);
  	}
})

const styles = StyleSheet.create({

});

function selector(state) {
    return {  
        cart: state.cart,
    }  
}

export default connect(selector)(cart);