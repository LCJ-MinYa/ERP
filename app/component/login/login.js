'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
    Dimensions,
    TextInput,
    TouchableHighlight
} from 'react-native';

import customStorage from '../../utils/customStorage.js';
import Request from '../../utils/request.js';
var {width, height} = Dimensions.get('window');

var login = React.createClass({
    getInitialState: function() {
        return {
            userName: '',
            password: '' 
        };
    },
  	render() {
    	return (
      		<View style={styles.page}>
                <Text style={styles.title}>
                    章鱼侠云订货
                </Text>
                <Text style={styles.titleDetail}>
                    — 随时随地，轻松订货 —
                </Text>
                <View style={styles.inputBox}>
                    <Text style={styles.userIcon}>&#xe61f;</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='请输入登录账号'
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=>{
                            this.setState({
                                userName: text
                            })
                        }}
                    />
                </View>
                <View style={[styles.inputBox,styles.lastInputBox]}>
                    <Text style={styles.userIcon}>&#xe620;</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='请输入登录密码'
                        password={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=>{
                            this.setState({
                                password: text
                            })
                        }}
                    />
                </View>
                <TouchableHighlight
                    onPress={this.clickLogin}
                    style={styles.btnBox}
                    underlayColor='#f65a44'
                >
                    <Text style={styles.btnText}>登录</Text> 
                </TouchableHighlight>

                <Request ref="request"/>
            </View>
    	);
  	},
    clickLogin(){
        let userName = this.state.userName;
        let password = this.state.password;
        if(!userName){
            alert("请输入登录账号");
        }else if(!password){
            alert("请输入登录密码");
        }else{
            this.refs.request.PostService('/api/user/login', {
                userName: userName,
                password: password
            },function(result){
                console.log(result);
            });
        }
    }
})

const styles = StyleSheet.create({
    page:{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    },
    title:{
        color: '#f65a44',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: height * 0.2
    },
    titleDetail:{
        color: '#f65a44',
        fontSize: 18,
        marginTop: 15
    },
    inputBox:{
        flexDirection: 'row',
        height: 42,
        marginTop: height * 0.08,
        width: width * 0.7,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
    },
    userIcon:{
        fontFamily: 'iconfont',
        fontSize: 24,
        color: '#ccc',
        paddingLeft: 5,
        paddingRight: 5
    },
    inputStyle:{
        width: width * 0.5,
        height: 42,
        marginLeft: 10,
        fontSize: 14
    },
    lastInputBox:{
        marginTop: 10,
    },
    btnBox:{
        width: width * 0.7,
        height: 40,
        marginTop: 40,
        backgroundColor: '#f65a44',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    btnText:{
        fontSize: 20,
        color: '#fff'
    }
});


export default login;