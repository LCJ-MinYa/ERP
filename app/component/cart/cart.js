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
                listViewStyle={styles.commonListViewStyle}
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
            <View style={styles.cartListBox}>
                {/*列表内容*/}
                <View style={styles.cartListContent}>
                    <Image
                      style={styles.cartListImg}
                      source={{uri: rowdata.picUrl}}
                    />
                    <View style={styles.cartListContentRight}>
                        <Text style={styles.cartListfullName} numberOfLines={1}>{rowdata.fullName}</Text>
                        <Text style={styles.cartListCode}>{rowdata.code}</Text>
                        <Text style={styles.cartListCode}>{rowdata.properties}</Text>
                        <Text style={styles.cartListCode}>库存:{rowdata.stockQty}/{rowdata.baseUnit}</Text>
                        <Text style={styles.cartListPrice}>
                            <Text style={styles.cartListCurrency}>￥</Text>
                            {rowdata.discountPrice}/{rowdata.baseUnit}
                        </Text>
                    </View>
                </View>
                {/*列表内容操作*/}
                <View style={styles.cartListHandle}>
                    <View style={styles.cartListDel}>
                        <Text style={styles.cartListDelIcon}>&#xe631;</Text>
                    </View>
                </View>
            </View>
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
        backgroundColor: '#eee',
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
    },
    commonListViewStyle:{
        paddingBottom: UISize.p2d(100)
    },
    cartListBox:{
        width: UISize.width(),
        backgroundColor: '#fff',
        marginBottom: UISize.p2d(16)
    },
    cartListContent:{
        flexDirection: 'row',
        minHeight: UISize.p2d(240),
        paddingLeft: UISize.p2d(24),
        paddingRight: UISize.p2d(24),
        alignItems: 'center'
    },
    cartListImg:{
        width: UISize.p2d(180),
        height: UISize.p2d(180)
    },
    cartListContentRight:{
        marginLeft: UISize.p2d(36),
        paddingBottom: UISize.p2d(24),
        paddingTop: UISize.p2d(24),
    },
    cartListfullName:{
        color: '#323232',
        fontSize: 14,
        width: UISize.width() - UISize.p2d(264)
    },
    cartListCode:{
        color: '#9f9f9f',
        fontSize: 12,
        paddingTop: 2,
        paddingBottom: 2
    },
    cartListPrice:{
        color: '#f65a44',
        fontSize: 14,
    },
    cartListCurrency:{
        color: '#f65a44',
        fontSize: 12
    },
    cartListHandle:{
        flexDirection: 'row',
        width: UISize.width(),
        height: UISize.p2d(80),
        borderTopWidth: 0.5,
        borderColor: '#e1e1e1',
        paddingLeft: UISize.p2d(24),
        paddingRight: UISize.p2d(24),
        alignItems: 'center'
    },
    cartListDel:{
        width: UISize.p2d(60),
        height: UISize.p2d(60),
        borderRadius: UISize.p2d(30),
        borderColor: '#e5e5e5',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartListDelIcon:{
        fontFamily: 'iconfont',
        fontSize: 16,
        color: '#d1d1d1'
    }
});

function selector(state) {
    return {  
        cart: state.cart
    }  
}

export default connect(selector)(cart);