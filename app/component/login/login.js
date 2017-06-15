'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
    Dimensions,
    TextInput,
    TouchableHighlight,
} from 'react-native';

import Experience from './experienceEnter';

import { NavigationActions } from 'react-navigation'
import Storage from '../../utils/customStorage';
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import Toast from 'react-native-root-toast';

let {width, height} = Dimensions.get('window');

let login = React.createClass({
    getInitialState: function() {
        return {
            userName: '',
            password: '',
            isShowExperience: false
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
                        autoCapitalize={'none'}
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
                        autoCapitalize={'none'}
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

                <TouchableHighlight
                    onPress={this.clickExperience}
                    style={[styles.btnBox, styles.experienceBtn]}
                    underlayColor='#fff'
                >
                    <Text style={[styles.btnText, styles.experienceBtnText]}>体验</Text> 
                </TouchableHighlight>

                <Experience
                    isShowExperience={this.state.isShowExperience}
                    closeExperience={this.closeExperience}
                    experienceLogin={(userName, password)=>{this.popExperienceLogin(userName, password)}}
                />

                <Request
                    ref="request"
                    loadingText={'登录中...'}
                />
            </View>
    	);
  	},
    clickLogin(){
        let userName = this.state.userName;
        let password = this.state.password;
        if(!userName){
            Toast.show("请输入登录账号", {
                position: 0,
                shadow: false,
            });
        }else if(!password){
            Toast.show("请输入登录密码", {
                position: 0,
                shadow: false,
            });
        }else{
            this.sendLoginRequest(userName, password);
        }
    },
    sendLoginRequest(userName, password){
        console.log('进入发送请求');
        let _this = this;
        this.refs.request.PostService(API.LOGIN, {
            userName: userName,
            password: password
        },function(result){
            console.log('发送请求成功回调');
            Storage.setData("token",result.data.token);
            Storage.setData("profileId",result.data.profileId);
            _this.props.navigation.navigate("ProductTab");
        });      
    },
    clickExperience(){
        this.setState({isShowExperience: true});
    },
    closeExperience(){
        this.setState({isShowExperience: false});
    },
    popExperienceLogin(userName, password){
        console.log('回到login');
        this.setState({isShowExperience: false}, ()=>{
            console.log('关闭modal');
            this.sendLoginRequest(userName, password);
        });
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
    },
    experienceBtn:{
        marginTop: 20,
        backgroundColor: '#fff',
        borderColor: '#f65a44',
        borderWidth: 0.5
    },
    experienceBtnText:{
        color: '#f65a44'
    }
});

export default login;