'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Modal,
  	Text,
  	TouchableOpacity
} from 'react-native';

import CommonHeader from '../common/commonHeader';
import UISize from '../../utils/uiSize';

let experienceEnter = React.createClass({
	propTypes:{
		isShowExperience: React.PropTypes.bool.isRequired,
	},
	getDefaultProps: function() {
		return {
			isShowExperience: false,
		};
	},
    getInitialState: function() {
        return {
            headerTitle: '选择行业',
        };
    },
  	render() {
    	return (
      		<Modal
      			animationType={'slide'}
      			visible={this.props.isShowExperience}
      		>
      			<View style={styles.container}>
	                {/*购物车header*/}
	                <CommonHeader
	                    isShowBack={false}
	                    isShowRight={true}
	                    rightText={'关闭'}
	                    headerTitle={this.state.headerTitle}
	                    doRightBtn={this.closeExperience}
	                />

	                {/*体验行业列表*/}
	                <View style={styles.contentBox}>
	                	{this.renderList('#0894ec', 1, '饮料啤酒', 'client01', 'client')}
	                	{this.renderList('#dc216c', 2, '服装鞋帽', 'client03', 'client')}
	                	{this.renderList('#f96498', 3, '个护化妆', 'client12', 'client')}
	                	{this.renderList('#fd8318', 4, '家居家纺', 'client09', 'client')}
	                </View>
      			</View>
      		</Modal>
    	);
  	},
  	renderList(iconColor, type ,title, userName, password){
  		let icon;
  		switch(type){
  			case 1:
  				icon = <Text style={[styles.listIcon, {color: iconColor}]}>&#xe7fb;</Text>;
  				break;
  			case 2:
  				icon = <Text style={[styles.listIcon, {color: iconColor}]}>&#xe61b;</Text>;
  				break;
  			case 3:
  				icon = <Text style={[styles.listIcon, {color: iconColor}]}>&#xe650;</Text>;
  				break;
  			case 4:
  				icon = <Text style={[styles.listIcon, {color: iconColor}]}>&#xe651;</Text>;
  				break;
  		}
  		return(
  			<TouchableOpacity activeOpacity={0.8} onPress={()=>{
  				this.experienceLogin(userName, password)
  			}}>
	        	<View style={styles.listContentBox}>
	        		{icon}
	        		<Text style={styles.listText}>{title}</Text>
	        	</View>
        	</TouchableOpacity>
  		)
  	},
  	closeExperience(){
  		this.props.closeExperience();
  	},
  	experienceLogin(userName, password){
  		this.props.experienceLogin(userName, password);
  	}
})

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#eee'
	},
	contentBox:{
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row'
	},
	listContentBox:{
		width: (UISize.width() - 50) / 4,
		marginLeft: 10,
		marginTop: 20,
		borderWidth: 0.5,
		borderColor: '#e3e3e3',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 5
	},
	listIcon:{
		fontFamily: 'iconfont',
		fontSize: 28,
		paddingBottom: 8
	},
	listText:{
		fontSize: 12,
		color: '#414141'
	}
});


export default experienceEnter;