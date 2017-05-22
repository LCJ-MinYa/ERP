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
    renderContent(bgColor, type, isShowBadge, title, dec){
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
                        {this.renderBadge(isShowBadge)}
                    </View>
                    <View>
                        <Text style={styles.orderMsgTitle}>{title}</Text>
                        <Text numberOfLines={1} style={styles.orderMsgDec}>{dec}</Text>
                    </View>
                </View>
            </View>
        )
    },
    renderBadge(isShowBadge){
        if(isShowBadge){
            return(
                <View style={styles.orderMsgBadgeView}>
                    <Text style={styles.orderMsgBadge}>1</Text>
                </View>
            )
        }
    },
  	render() {
    	return (
    		<View style={styles.container}>
                <CommonHeader
                    isShowBack={false}
                    headerTitle={this.state.headerTitle}
                />

                {this.renderContent('#f79e16', 'order', true, '订单消息', '关于订单审核、发货状态变化的及时通知')}
                {this.renderContent('#0095d7', 'notice', false, '通知公告', '供货商公告，比如促销信息，放假通知等')}

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

export default msg;