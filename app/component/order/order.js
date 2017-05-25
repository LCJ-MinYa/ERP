'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
  	TouchableOpacity,
  	ListView,
  	RefreshControl
} from 'react-native';
import UISize from '../../utils/uiSize';
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import Config from '../../config/config';
import CommonHeader from '../common/commonHeader';

import { connect } from 'react-redux';
import { showLoading,hideLoading } from '../../action'

let order = React.createClass({
    getInitialState: function() {
        return {
            headerTitle: "订单列表",
            orderState: 0,
            period: 0,
            startDate: '',
            endDate: '',
            number: '',
            pageIndex: 1,
        };
    },
    renderOrderNav(){
    	return(
    		<View style={styles.orderNavStyle}>
    			{this.renderOrderNavList('全部', 0)}
    			{this.renderOrderNavList('待审核', 1)}
    			{this.renderOrderNavList('待付款', 2)}
    			{this.renderOrderNavList('待发货', 3)}
    			{this.renderOrderNavList('待收货', 4)}
    		</View>
    	)
    },
    renderOrderNavList(title, num){
    	return(
			<TouchableOpacity 
				onPress={()=>{this.changeOrderState(num)}}
				style={styles.orderNavTextBox}
				activeOpacity={0.8}
			>
    			<View style={[styles.orderNavTextBox, this.state.orderState == num ? styles.chooseOrderNavTextBox : null]}>
    				<Text style={[styles.orderNavText,this.state.orderState == num ? styles.chooseOrderNavText : null]}>{title}</Text>
    			</View>
			</TouchableOpacity>
    	)
    },
    changeOrderState(num){
    	this.setState({orderState: num});
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

                <Request
                    ref="request"
                    isShowLoading={false}
                />
      		</View>
    	);
  	},
  	componentDidMount(){
  		this.getOrderListMsg();
  	},
  	getOrderListMsg(){
  		let _this = this;
  		this.props.dispatch(showLoading(this.props.isLoading));
        this.refs.request.PostService(API.ORDER_LIST, {
        	period: this.state.period,
        	status: this.state.orderState,
        	startDate: this.state.startDate,
        	endDate: this.state.endDate,
        	pageSize: Config.PAGESIZE,
            number: this.state.number,
            pageIndex: this.state.pageIndex,
        }, function(result){
        	console.log(result);
            _this.props.dispatch(hideLoading(_this.props.isLoading));
        })
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
	},
	chooseOrderNavTextBox:{
		borderBottomWidth: 2,
		borderColor: '#f65a44'
	},
	chooseOrderNavText:{
		color: '#f65a44',
	}
});

function selector(state) {
    return {  
        isLoading: state.isLoading
    }  
}

export default connect(selector)(order);