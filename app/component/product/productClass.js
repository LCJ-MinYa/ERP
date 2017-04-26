'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	ListView
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import CommonHeader from '../common/commonHeader.js';

let productClass = React.createClass({
	getInitialState: function() {
		let firstClassData = new ListView.DataSource({
			rowHasChanged:(row1, row2) => row1 !== row2
		})
		let otherClassData = new ListView.DataSource({
			rowHasChanged:(row1, row2) => row1 !== row2
		})
		return {
			headerTitle: '商品分类',
			firstClassData: firstClassData,
			otherClassData: otherClassData,
			isShowLoading: true,
		};
	},
	render() {
		return (
		  	<View style={styles.container}>
		  		<CommonHeader
		  			popDoClick={(url, params)=>{this.popToNewView(url, params)}}
		  			headerTitle={this.state.headerTitle}
		  		/>

		  		<View style={styles.classBox}>
			  		<View style={styles.firstClassBox}>
						<ListView
							contentContainerStyle={styles.firstClass}
							dataSource={this.state.firstClassData}
							renderRow={this.renderFirstRow}
							enableEmptySections={true}
						/>
					</View>

					<View style={styles.otherClassBox}>
						<ListView
							contentContainerStyle={styles.otherClass}
							dataSource={this.state.otherClassData}
							renderRow={this.renderOtherRow}
							enableEmptySections={true}
						/>
					</View>
				</View>

				<Request
					ref="request"
					isShowLoading={this.state.isShowLoading}
				/>
		  	</View>
		);
	},
	popToNewView(url, params){
		if(!url){
			this.props.navigation.goBack(url);
		}else{
			this.props.navigation.navigate(url);
		}
	},
	renderFirstRow(rowData){
		return(
			<Text>{rowData.name}</Text>
		)
	},
	renderOtherRow(rowData){
		return(
			<Text>{rowData.name}</Text>
		)
	},
  	componentDidMount(){
  		this.getFirstLevelClassMsg();
  	},
  	getFirstLevelClassMsg(){
  		let _this = this;
  		this.refs.request.PostService(API.FIRST_LEVEL_CLASS, {}, function(result){
  			console.log(result);
  			_this.setState({firstClassData: _this.state.firstClassData.cloneWithRows(result.data)});
  			_this.getOtherLevelClassMsg(result.data[4], 0, true);
  		});
  	},
  	getOtherLevelClassMsg(obj, index, isFirst){
  		let _this = this;
  		if(obj.isEnd){
  			if(!isFirst){
  				this.clickGoProduct(obj);
  			}else{
  				this.setState({isShowLoading: false});
  			}
  			return;
  		}
  		this.refs.request.PostService(API.OTHER_LEVEL_CLASS, {
  			classId: obj.id
  		},function(result){
  			console.log(result);
  			_this.setState({isShowLoading: false});
  			_this.setState({otherClassData: _this.state.otherClassData.cloneWithRows(result.data)});
  		});
  	}
});

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff'
	},
	classBox:{
		flex: 1,
		flexDirection: 'row'
	},
	firstClassBox:{
		flex: 1,
		backgroundColor: '#f2f2f2'
	},
	otherClassBox:{
		flex: 3,
	},
	firstClass:{

	},
	otherClass:{

	}
});

export default productClass;