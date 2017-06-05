'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	ListView,
  	TouchableOpacity,
  	Dimensions
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import CommonHeader from '../common/commonHeader.js';
let {width, height} = Dimensions.get('window');
let firstClassArr = [];
let productClass = React.createClass({
	getInitialState: function() {
		let firstClassData = new ListView.DataSource({
			rowHasChanged:(row1, row2) => row1 !== row2
		})
        let getSectionData = (dataBlob,sectionID) => {
            return dataBlob[sectionID];
        }
        let getRowData = (dataBlob,sectionID,rowID) => {
            return dataBlob[sectionID + ":" + rowID];
        }
		let otherClassData = new ListView.DataSource({
			getSectionData: getSectionData,
            getRowData: getRowData,
			rowHasChanged:(row1, row2) => row1 !== row2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

		})
		return {
			headerTitle: '商品分类',
			firstClassData: firstClassData,
			otherClassData: otherClassData,
			isShowLoading: true,
			isShowOtherClass: true,
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
							dataSource={this.state.firstClassData}
							renderRow={this.renderFirstRow}
							enableEmptySections={true}
						/>
					</View>

					<View style={styles.otherClassBox}>
						{
							this.state.isShowOtherClass ? (
								<ListView
									contentContainerStyle={styles.otherClassStyle}
									dataSource={this.state.otherClassData}
									renderRow={this.renderOtherRow}
									renderSectionHeader={this.renderSectionHeader}
									enableEmptySections={true}
									stickySectionHeadersEnabled={false}
								/>
							) : (
								<View style={styles.noMoreOtherClass}>
									<Text style={styles.noMoreOtherClassIcon}>&#xe67f;</Text>
									<Text style={styles.noMoreOtherClassText}>暂无更多分类，去看看别的吧</Text>
								</View>
							)
						}
					</View>
				</View>

				<Request
					ref="request"
					isShowLoading={this.state.isShowLoading}
					popGoLogin={this.popGoLogin}
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
    popGoLogin(){
        this.props.navigation.navigate('Login');
    },
	renderFirstRow(rowData, sectionID, rowID, highlightRow){
		return(
			<TouchableOpacity onPress={()=>{
				if(this.lastSelect || this.lastSelect == 0){
					firstClassArr[this.lastSelect].isSelect = false;
				}
				firstClassArr[rowID].isSelect = true;
				let newArr = JSON.parse(JSON.stringify(firstClassArr));
				this.setState({firstClassData: this.state.firstClassData.cloneWithRows(newArr)})
				this.lastSelect = rowID;
				this.getOtherLevelClassMsg(rowData, rowID);
			}}>
				<View style={[styles.firstCellBox, rowData.isSelect ? styles.firstCellActive : '']}>
					<Text 
						style={[styles.textStyle, rowData.isSelect ? styles.activeClass : '']}
						numberOfLines={1}
					>
						{rowData.name}
					</Text>
				</View>
			</TouchableOpacity>
		)
	},
	renderOtherRow(rowData){
		return(
			<Text style={styles.otherClassText}>{rowData.name}</Text>
		)
	},
	renderSectionHeader(sectionData, sectionId){
		return(
			<View style={styles.otherClassTitleBox}>
				<Text style={styles.otherClassTitle}>{sectionData.name}</Text>
			</View>
		)
	},
  	componentDidMount(){
  		this.getFirstLevelClassMsg();
  	},
  	getFirstLevelClassMsg(){
  		let _this = this;
  		this.refs.request.PostService(API.FIRST_LEVEL_CLASS, {}, function(result){
  			for (var i = 0; i < result.data.length; i++) {
  				if(i == 0){
  					result.data[i].isSelect = true;
  				}else{
  					result.data[i].isSelect = false;
  				}
  			}
  			_this.lastSelect = 0;
  			firstClassArr = result.data;
  			_this.setState({firstClassData: _this.state.firstClassData.cloneWithRows(result.data)});
  			_this.getOtherLevelClassMsg(result.data[0], 0, true);
  		});
  	},
  	getOtherLevelClassMsg(obj, index, isFirst){
  		let _this = this;
  		//只有一级，判断是非首次加载，首次加载(关闭loading，不显示二三级)
  		if(obj.isEnd){
  			if(!isFirst){
  				this.setState({isShowOtherClass: false})
  				this.clickGoProduct(obj);
  			}else{
  				this.setState({
  					isShowLoading: false,
  					isShowOtherClass: false
  				});
  			}
  			return;
  		}
  		//有二三级，判断是非请求过数据，请求过直接用之前的数据,没有则显示loading准备请求
  		if(firstClassArr[index].hasOwnProperty('data')){
  			let data = firstClassArr[index].data;
  			this.setState({
  				isShowOtherClass: true,
  				otherClassData: _this.state.otherClassData.cloneWithRowsAndSections(data.dataBlob, data.sectionIDs, data.rowIDs)
  			});
  			return;
  		}else{
  			this.setState({isShowLoading: true});
  		}
  		//开始请求
  		this.refs.request.PostService(API.OTHER_LEVEL_CLASS, {
  			classId: obj.id
  		},function(result){
  			_this.dealOtherLevelClassMsg(result, index);
  		});
  	},
  	dealOtherLevelClassMsg(result, index){
  		let dataBlob = {}, sectionIDs = [], rowIDs = [];

        for (var i = 0; i < result.data.length; i++) {
	        //1.拿到所有的sectionId
            sectionIDs.push(i);

            //2.把组中的内容放入dataBlob内容中
            dataBlob[i] = result.data[i];

            //3.设置该组中每条数据的结构
            rowIDs[i] = [];

        	//4.取出该组中所有的数据
            let subClass = result.data[i].subClass;

        	//5.遍历subClass,设置每组的列表数据
            for (var j = 0 ; j < subClass.length ; j++){
            	//改组中的每条对应的rowId
                rowIDs[i].push(j);

            	//把每一行中的内容放入dataBlob对象中
                dataBlob[i+':'+j] = subClass[j];
            }
        }
		firstClassArr[index].data = {
			dataBlob: dataBlob,
			sectionIDs: sectionIDs,
			rowIDs: rowIDs
		}
		this.setState({
			isShowLoading: false,
			isShowOtherClass: true,
			otherClassData: this.state.otherClassData.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
		});
  	},
  	clickGoProduct(obj){

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
	firstCellBox:{
		borderBottomWidth: 0.5,
		borderBottomColor: '#e1e1e1',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	firstCellActive:{
		backgroundColor: '#fff'
	},
	activeClass:{
		color: '#f65a44',
	},
	textStyle:{
		paddingLeft: 5,
		paddingRight: 5,
		fontSize: 14,
		color: '#323232'
	},
	noMoreOtherClass:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	noMoreOtherClassIcon:{
		fontFamily: 'iconfont',
		color: '#787878',
		fontSize: 26
	},
	noMoreOtherClassText:{
		color: '#787878',
		fontSize: 14,
		paddingTop: 5
	},
	otherClassStyle:{
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start'
	},
	otherClassTitleBox:{
		width: width * 0.75,
		height: 40,
		justifyContent: 'center'
	},
	otherClassTitle:{
		color: '#858585',
		fontSize: 14,
		padding: 10,
		paddingLeft: 20
	},
	otherClassText:{
		backgroundColor: '#f2f2f2',
		color: '#323232',
		fontSize: 14,
		marginLeft: 20,
		marginRight: 10,
		marginBottom: 10,
		padding: 8,
		borderRadius: 2
	}
});

export default productClass;