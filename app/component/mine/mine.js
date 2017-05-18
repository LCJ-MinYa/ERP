'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    ScrollView,
    Platform,
} from 'react-native';

import UiSize from '../../utils/uiSize';

class mine extends Component{
    renderMineHeader(){
        return(
            <View style={styles.headerImageView}>
                <Image
                  style={styles.headerBgStyle}
                  source={{uri: 'mine-header-back'}}
                />
                <Image
                  style={styles.headerImageStyle}
                  source={{uri: 'my-picture'}}
                />
                <Text style={styles.headerUserStyle}>用户名称</Text>
            </View>
        )
    }
    renderMineMiddle(){
        return(
            <View style={styles.middleViewStyle}>

            </View>
        )
    }
  	render() {
    	return (
    		<View style={styles.container}>
                <ScrollView
                    style={styles.scrollViewBox}
                    contentInset={{top: -1000}}
                    contentOffset={{y: 1000}}
                >
                    {/*我的头部个人信息*/}
                    {this.renderMineHeader()}

                    {/*我的中间部分*/}
                    {this.renderMineMiddle()}
                </ScrollView>
                <View style={styles.setBtn}>
                    <Text style={styles.setBtnIcon}>&#xe63f;</Text>
                </View>
            </View>
    	);
  	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    scrollViewBox:{
        flex: 1
    },
    headerImageView:{
        backgroundColor: '#f65a44',
        height: Platform.OS == 'ios' ? 1170 : 170,
        alignItems: 'center'
    },
    setBtn:{
        position: 'absolute',
        top: Platform.OS == 'ios' ? 25 : 10,
        right: 15,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    setBtnIcon:{
        fontSize: 18,
        color: '#fff',
        fontFamily: 'iconfont',
        paddingTop: 2
    },
    headerBgStyle:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: UiSize.width(),
        height: 80
    },
    headerImageStyle:{
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: '#f87563',
        borderRadius: 40,
        backgroundColor: '#fff',
        marginTop: Platform.OS == 'ios' ? 1030 : 30,
    },
    headerUserStyle:{
        fontSize: 16,
        color: '#fff',
        lineHeight: 50
    },
    middleViewStyle:{
        width: UiSize.width(),
        height: UiSize.p2d(400),
        backgroundColor: '#fff',
        marginTop: UiSize.p2d(10),
        marginBottom: UiSize.p2d(40)
    }
});

export default mine;