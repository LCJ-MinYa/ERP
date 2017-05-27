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
import CommonListView from '../common/commonListView';

let order = React.createClass({
    getInitialState: function() {
        let ds = new ListView.DataSource({
            rowHasChanged:(row1, row2) => row1 !== row2
        })
        return {
            isShowFooter: 0,//0不显示 1.加载中... 2.没有更多数据了
            isLoadMore: false,
            isRefreshing: false,
            headerTitle: "订单列表",
            orderState: 0,
            period: 0,
            startDate: '',
            endDate: '',
            number: '',
            pageIndex: 1,
            dataSource: ds,
            orderListData: [],
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
    renderRow(rowdata){
        return(
            <TouchableOpacity onPress={()=>{
                console.log('点击row');
            }}>
                <View style={{marginBottom: 50}}>
                    <Text>{rowdata.billNumber}</Text>
                </View>
            </TouchableOpacity>
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

                {/*订单内容*/}
                <CommonListView
                    arrayData={this.state.orderListData}
                    isShowRefresh={true}
                    renderRow={this.renderRow}
                    isRefreshing={this.state.isRefreshing}
                    doRefresh={this.doRefresh}
                    loadMoreData={this.loadMoreData}
                    isShowFooter={this.state.isShowFooter}
                />

                <Request
                    ref="request"
                />
      		</View>
    	);
  	},
  	componentDidMount(){
  		this.getOrderListMsg();
  	},
  	getOrderListMsg(isRefresh){
        console.log(this.state.pageIndex);
        let _this = this;
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
            if(result.data.length != 0){
                if(_this.state.pageIndex == 1){
                    _this.state.orderListData = result.data;
                }else{
                    _this.state.orderListData = _this.state.orderListData.concat(result.data);
                }
                _this.state.pageIndex += 1;
                _this.state.isLoadMore = false;
            }

            //判断是否是下啦刷新加载
            if(isRefresh){
                _this.setState({isRefreshing: false});
            }

            //判断是非还有更多数据
            if(_this.state.pageIndex < result.pageCount){
                _this.setState({isShowFooter: 0});
            }else{
                _this.setState({isShowFooter: 2});
            }

        });
  	},
    doRefresh(){
        this.state.pageIndex = 1;
        this.getOrderListMsg();
    },
    loadMoreData(){
        if(this.state.isLoadMore || this.state.isShowFooter == 2){
            return;
        }
        this.state.isLoadMore = true;
        this.setState({
            isShowFooter: 1,
            isRefreshing: true
        }, ()=>{
            this.getOrderListMsg(true);
        });
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
	},
});

export default order;