'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    TouchableWithoutFeedback
} from 'react-native';

import { connect,Provider } from 'react-redux';
import { addCart,showLoading,hideLoading } from '../../action'
import UISize from '../../utils/uiSize';
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import CommonHeader from '../common/commonHeader';
import CommonListView from '../common/commonListView';

let cart = React.createClass({
    /*static navigationOptions = ({ navigation }) => ({
        title: '购物车',
        tabBarIcon: ({tintColor}) =>{
            return(
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.navigate("CartTab");
                    setTimeout(function(){
                        _this.a();
                    }, 200);
                }}>
                    <View>
                        <Image
                          style={[styles.icon, {tintColor: tintColor}]}
                          source={{uri: 'cart'}}
                        />
                        <Text>{navigation.state.params && navigation.state.params.cart}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        },
    })*/
    getInitialState: function() {
        return {
            headerTitle: '购物车',
            cartData: [],
            isRefreshing: false
        };
    },
    renderSubmitOrder(){
        return(
            <View style={styles.submitOrderBox}>
                <View style={styles.submitOrderLeft}>
                    <Text style={styles.submitOrderLeftTitle}>合计:¥598.00</Text>
                    <Text style={styles.submitOrderLeftDec}>共1种 数量1</Text>
                </View>
                <View style={styles.submitOrderRight}>
                    <Text style={styles.submitOrderRightText}>提交订单</Text>
                </View>
            </View>
        )
    },
    renderCartList(){
        return(
            <CommonListView
                arrayData={this.state.cartData}
                isShowRefresh={true}
                renderRow={this.renderRow}
                isRefreshing={this.state.isRefreshing}
                doRefresh={this.doRefresh}
            />
        )
    },
    renderRow(rowdata){
        return(
            <Text>{rowdata.fullName}</Text>
        )
    },
  	render() {
  		const {dispatch, cart} = this.props;
    	return (
    		<View style={styles.container}>
                {/*购物车header*/}
                <CommonHeader
                    isShowBack={false}
                    isShowRight={true}
                    rightText={'清空'}
                    headerTitle={this.state.headerTitle}
                />

                {/*购物车列表*/}
                {this.renderCartList()}

                {/*提交订单*/}
                {this.renderSubmitOrder()}

                <Request
                    ref="request"
                />
      		</View>
    	);
  	},
    componentDidMount(){
        this.getCartListMsg();
    },
    getCartListMsg(isRefresh){
        let _this = this;
        this.refs.request.PostService(API.CART_LIST, {}, function(result){
            console.log(result);
            if(result.data.length !== 0){
                _this.setState({cartData: result.data});
            }
            if(isRefresh){
                _this.setState({isRefreshing: false});
            }
        })
    },
    doRefresh(){
        this.setState({isRefreshing: true}, ()=>{
            this.getCartListMsg(true);
        })
    },
    popToNewView(url, params){
        if(!url){
            this.props.navigation.goBack(url);
        }else{
            this.props.navigation.navigate(url);
        }
    }

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    submitOrderBox:{
        width: UISize.width(),
        height: UISize.p2d(100),
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderColor: '#e1e1e1',
        flexDirection: 'row'
    },
    submitOrderLeft:{
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 15
    },
    submitOrderLeftTitle:{
        color: '#f65a44',
        fontSize: 16,
        paddingBottom: 5
    },
    submitOrderLeftDec:{
        color: '#323232',
        fontSize: 12
    },
    submitOrderRight:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f65a44'
    },
    submitOrderRightText:{
        color: '#fff',
        fontSize: 14
    }
});

function selector(state) {
    return {  
        cart: state.cart
    }  
}

export default connect(selector)(cart);