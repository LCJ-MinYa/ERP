'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image
} from 'react-native';
import UISize from '../../utils/uiSize';
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import CommonHeader from '../common/commonHeader';

let order = React.createClass({
    getInitialState: function() {
        return {
            headerTitle: "订单列表"
        };
    },
    renderOrderNav(){
    	return(
    		<View style={styles.orderNavStyle}>
    			<View style={styles.orderNavTextBox}><Text style={styles.orderNavText}>全部</Text></View>
    			<View style={styles.orderNavTextBox}><Text style={styles.orderNavText}>待审核</Text></View>
    			<View style={styles.orderNavTextBox}><Text style={styles.orderNavText}>待付款</Text></View>
    			<View style={styles.orderNavTextBox}><Text style={styles.orderNavText}>待发货</Text></View>
    			<View style={styles.orderNavTextBox}><Text style={styles.orderNavText}>待收货</Text></View>
    		</View>
    	)
    },
  	render() {
    	return (
      		<View style={styles.container}>
                <CommonHeader
                    isShowBack={false}
                    isShowRight={true}
                    rightText={'筛选'}
                    headerTitle={this.state.headerTitle}
                />

            	{/*订单nav*/}
            	{this.renderOrderNav()}
      		</View>
    	);
  	}
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee'
	},
	orderNavStyle:{
		width: UISize.width(),
		height: UISize.p2d(90),
		flexDirection: 'row',
		backgroundColor: '#fff',
		marginBottom: 5
	},
	orderNavTextBox:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	orderNavText:{
		color: '#5f646e',
		fontSize: 14,
	}
});

export default order;