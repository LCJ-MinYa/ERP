'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	ListView,
  	RefreshControl,
  	Text
} from 'react-native';

let commonListView = React.createClass({
	propTypes:{
		isShowRefresh: React.PropTypes.bool.isRequired,
	},
	getDefaultProps: function() {
		return {
			isShowRefresh: false,
			isShowFooter: 0,
		};
	},
	getInitialState: function() {
		let ds = new ListView.DataSource({
			rowHasChanged:(row1, row2) => row1 !== row2
		})
		return {
			dataSource: ds,
		};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.arrayData.length !== 0){
			this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.arrayData)})
		}
	},
	shoudeShowRefresh(){
		if(this.props.isShowRefresh){
			return(
                <RefreshControl
                    refreshing={this.props.isRefreshing}
                    onRefresh={this.props.doRefresh}
                    tintColor="#989898"
                    colors={['#989898']}
                    progressBackgroundColor="#eee"
                />
			)
		}
	},
	renderFooterView(){
		if(this.props.isShowFooter == 0){
			return null;
		}else if(this.props.isShowFooter == 1){
			return this.footerView("加载更多...");
		}else if(this.props.isShowFooter == 2){
			return this.footerView("没有更多数据...");
		}
	},
	footerView(footerText){
		return(
			<View style={styles.footerBoxView}>
				<Text>{footerText}</Text>
			</View>
		)
	},
  	render() {
    	return (
            <ListView
                contentContainerStyle={styles.listViewContentBox}
                dataSource={this.state.dataSource}
                renderRow={this.props.renderRow}
                enableEmptySections={true}
                refreshControl={this.shoudeShowRefresh()}
                onEndReached={this.props.loadMoreData}
                onEndReachedThreshold={0}
                renderFooter={this.renderFooterView}
                removeClippedSubviews={false}
            />
    	);
  	}
})

const styles = StyleSheet.create({
	listViewContentBox: {
		
	},
	footerBoxView:{
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default commonListView;