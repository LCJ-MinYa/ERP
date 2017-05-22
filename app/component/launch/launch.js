'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import Storage from '../../utils/customStorage';
import Request from '../../utils/request';
import API from '../../config/apiConfig';

const resetTabRootAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'TabRoot'}),
    ]
});
const resetLoginAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login'}),
    ]
});

class launch extends Component {
  	render() {
    	return (
      		<View style={styles.container}>
      			<Text>这是加载页面</Text>
                <Request
                    ref="request"
                    isShowLoading={false}
                />
      		</View>
    	);
  	}
  	componentDidMount(){
        let _this = this;
		let token, profileId;
        Storage.getData('token')
        .then((value)=>{
            token = value;
            return Storage.getData('profileId')
        })
        .then((value)=>{
            profileId = value;
            if(token && profileId){
                this.refs.request.PostService(API.GLOBAL_INFO, {}, function(result){
                    if(result == "请求超时"){
                        console.log("网络差");
                        _this.props.navigation.dispatch(resetTabRootAction);
                    }else{
                        if(result.error_code == -12 || result.error_code == -15){
                            _this.props.navigation.dispatch(resetLoginAction);
                        }else{
                            //请求全局信息成功之后的处理
                            _this.props.navigation.dispatch(resetTabRootAction);
                        }
                    }
                });
            }else{
            	setTimeout(()=>{
            		this.props.navigation.dispatch(resetLoginAction);
            	},2000);
            }
        })
  	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	}
});


export default launch;