'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text
} from 'react-native';
import UISize from '../../utils/uiSize';
import Modal from 'react-native-modalbox';

let productDetailPopUp = React.createClass({
 	render() {
	    return (
	  		 <Modal
	  			ref={"modal"}
	        	style={styles.modal}
	          	isOpen={this.props.showProductDetailPopUp}
	          	onClosed={this.props.hideProductDetailPopUp}
	          	position={'bottom'}
	        >
	            	<Text style={styles.text}>Basic modal</Text>
	        </Modal>
	    );
  	},
})

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#fff',
		width: UISize.width(),
		height: 300
	}
});

export default productDetailPopUp;