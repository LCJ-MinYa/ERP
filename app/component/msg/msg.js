'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';

import { connect,Provider } from 'react-redux';
import { addCart } from '../../action'

var msg = React.createClass({
  	render() {
  		const {dispatch, cart} = this.props;
    	return (
    		<View>
      			<Text style={{marginTop: 100}} onPress={()=>{
                    dispatch(addCart(cart));
                }}>消息首页</Text>
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

export default connect(selector)(msg);