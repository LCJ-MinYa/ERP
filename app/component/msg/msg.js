'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    ScrollView
} from 'react-native';
import UISize from '../../utils/uiSize';
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import CommonHeader from '../common/commonHeader';

import { connect } from 'react-redux';
import { setMessageCount } from '../../action/message';

let msg = React.createClass({
    getInitialState: function() {
        return {
            headerTitle: "消息"
        };
    },
    renderContent(bgColor, type, badgeCount, title, dec){
        let icon;
        if(type == 'order'){
            icon = <Text style={styles.orderMsgIcon}>&#xe605;</Text>;
        }else{
            icon = <Text style={styles.orderMsgIcon}>&#xe605;</Text>;
        }
        return(
            <View>
                <View style={styles.orderMsgBox}>
                    <View style={[styles.orderMsgIconView,{backgroundColor: bgColor}]}>
                        {icon}
                        {this.renderBadge(badgeCount)}
                    </View>
                    <View>
                        <Text style={styles.orderMsgTitle}>{title}</Text>
                        <Text numberOfLines={1} style={styles.orderMsgDec}>{dec}</Text>
                    </View>
                </View>
            </View>
        )
    },
    renderBadge(badgeCount){
        if(badgeCount){
            return(
                <View style={styles.orderMsgBadgeView}>
                    <Text style={styles.orderMsgBadge}>{badgeCount}</Text>
                </View>
            )
        }
    },
  	render() {
        const { message } = this.props;
    	return (
    		<View style={styles.container}>
                <CommonHeader
                    isShowBack={false}
                    headerTitle={this.state.headerTitle}
                />
                <ScrollView>
                    {this.renderContent('#f79e16', 'order', message, '订单消息', '关于订单审核、发货状态变化的及时通知')}
                    {this.renderContent('#0095d7', 'notice', false, '通知公告', '供货商公告，比如促销信息，放假通知等')}
                </ScrollView>
                <Request
                    ref="request"
                    isShowLoading={false}
                />
      		</View>
    	);
  	},
    componentDidMount(){
        this.getInitMsg();
    },
    getInitMsg(){
        let _this = this;
        this.refs.request.PostService(API.NOREAD_MESSAGE_COUNT, {}, function(result){
            _this.props.dispatch(setMessageCount(_this.props.message, result.data));
        })
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    orderMsgBox:{
        flexDirection: 'row',
        height: UISize.p2d(160),
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: UISize.p2d(24)
    },
    orderMsgIconView:{
        marginLeft: UISize.p2d(40),
        marginRight: UISize.p2d(40),
        width: UISize.p2d(80),
        height: UISize.p2d(80),
        borderRadius: UISize.p2d(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderMsgIcon:{
        fontFamily: 'iconfont',
        fontSize: 20,
        color: '#fff'
    },
    orderMsgBadgeView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        position: 'absolute',
        top: -5,
        right: -5
    },
    orderMsgBadge:{
        color: '#fff',
        fontSize: 14,
    },
    orderMsgTitle:{
        paddingBottom: 8,
        fontSize: 16,
        color: '#323232'
    },
    orderMsgDec:{
        fontSize: 14,
        color: '#646464',
    }
});

function selector(state) {
    return {  
        message: state.message
    }  
}

export default connect(selector)(msg);