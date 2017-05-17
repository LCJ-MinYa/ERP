'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';

var mine = React.createClass({
  	render() {
    	return (
    		<View style={styles.container}>
    			<View style={styles.headerImageView}>

                </View>
            </View>
    	);
  	}
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    headerImageView:{
        backgroundColor: '#f65a44',
        height: 170
    }
});

export default mine;