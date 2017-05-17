'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import Storage from '../../utils/customStorage.js';

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
      		</View>
    	);
  	}
  	componentDidMount(){
		let token, profileId;
        Storage.getData('token')
        .then((value)=>{
            token = value;
            return Storage.getData('profileId')
        })
        .then((value)=>{
            profileId = value;
            if(token && profileId){
            	setTimeout(()=>{
            		this.props.navigation.dispatch(resetTabRootAction);
            	},2000);
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