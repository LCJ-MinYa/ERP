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
                <View style={styles.orderListBox}>
                    <View style={styles.orderListMsgBox}>
                        <Text style={styles.billNumberStyle}>{rowdata.billNumber}</Text>
                        <Text style={styles.billDateStyle}>{rowdata.billDate}</Text>
                        <View style={styles.moneyStyle}>
                            <Text style={styles.billNumberStyle}>金额:</Text>
                            <Text style={styles.unPayTotalStyle}>¥{rowdata.unPayTotal}</Text>
                            <View style={styles.unPayTotalIconBox}><Text style={styles.unPayTotalIcon}>未付款</Text></View>
                        </View>
                        <Text style={styles.billStatusNameStyle}>{rowdata.billStatusName}</Text>
                    </View>

                    <View style={styles.orderListBtnBox}>
                        <View style={styles.btnBox}><Text style={styles.btnText}>取消</Text></View>
                        <View style={styles.btnBox}><Text style={styles.btnText}>付款</Text></View>
                        <View style={styles.btnBox}><Text style={styles.btnText}>再次购买</Text></View>
                    </View>
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
                    popGoLogin={this.popGoLogin}
                />
      		</View>
    	);
  	},
  	componentDidMount(){
  		this.getOrderListMsg();
  	},
    popGoLogin(){
        this.props.navigation.navigate('Login');
    },
  	getOrderListMsg(isRefresh){
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
        this.setState({isRefreshing: true}, ()=>{
            this.getOrderListMsg(true);
        });
    },
    loadMoreData(){
        if(this.state.isLoadMore || this.state.isShowFooter == 2){
            return;
        }
        this.state.isLoadMore = true;
        this.setState({isShowFooter: 1}, ()=>{
            this.getOrderListMsg();
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
        borderColor: '#eee',
        borderBottomWidth: 0.5
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
    orderListBox:{
        width: UISize.width(),
        marginBottom: 5,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    orderListMsgBox:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    billNumberStyle:{
        fontSize: 14,
        color: '#505050'
    },
    billDateStyle:{
        fontSize: 12,
        paddingVertical: 5,
        color: '#a5a5a5'
    },
    moneyStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    unPayTotalStyle:{
        color: '#f65a44',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    unPayTotalIconBox:{
        borderWidth: 1,
        borderColor: '#f89432',
        backgroundColor: '#f89432',
        borderRadius: 2
    },
    unPayTotalIcon:{
        padding: 2,
        color: '#fff',
        fontSize: 12,
    },
    billStatusNameStyle:{
        position: 'absolute',
        right: 10,
        top: 10,
        color: '#f65a44',
        fontSize: 14
    },
    orderListBtnBox:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    btnBox:{
        borderColor: '#efefef',
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        fontSize: 14,
        color: '#3f3f3f',
        padding: 4,
    }
});

export default order;