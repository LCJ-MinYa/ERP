'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import UISize from '../../utils/uiSize';
import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import CommonHeader from '../common/commonHeader.js';

let msg = React.createClass({
    getInitialState: function() {
        return {
            headerTitle: "消息"
        };
    },
    renderContent(){

    },
  	render() {
    	return (
    		<View style={styles.container}>
                <CommonHeader
                    isShowBack={false}
                    headerTitle={this.state.headerTitle}
                />

                {this.renderContent()}

                <Request
                    ref="request"
                    isShowLoading={false}
                />
      		</View>
    	);
  	}
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default msg;