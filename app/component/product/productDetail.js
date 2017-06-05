'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Dimensions,
  	Text,
  	Image,
  	ScrollView,
  	TouchableWithoutFeedback
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Swiper from 'react-native-swiper';

let {width, height} = Dimensions.get('window');

class productDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            picData: []
        };
    }
    renderSwiperView(){
    	if(this.state.picData.length !== 0){
	    	return(
	    		<View style={styles.wrapper}>
					<Swiper
						showsPagination={true}
						height={width}
						width={width}
					>
				        {this.renderImageItemView()}
				  	</Swiper>
				  	<TouchableWithoutFeedback onPress={this.goCart.bind(this)}>
				  		<View>
				  			<Text style={styles.goCartView}>购物车</Text>
				  		</View>
	    			</TouchableWithoutFeedback>
	    		</View>
	    	)
    	}else{
    		return null;
    	}
    }
    renderImageItemView(){
		let imageItemArr = [];
		for (var i = 0; i < this.state.picData.length; i++) {
			imageItemArr.push(
		        <View style={styles.slide} key={i}>
		          	<Image
		          	  style={styles.slideImage}
		          	  source={{uri: this.state.picData[i]}}
		          	/>
		        </View>
			)
		}
		return imageItemArr;   	
    }
  	render() {
    	return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewStyle}>
                    {this.renderSwiperView()}
                </ScrollView>

                <View style={styles.footerView}>
                    <View style={styles.footerLeftView}>
                        <Text style={styles.footerLeftIcon}>&#xe64c;</Text>
                        <Text style={styles.footerLeftText}>收藏</Text>
                    </View>
                    <View style={[styles.footerLeftView, styles.footerRightView]}>
                        <Text style={styles.footerRightText}>加入购物车</Text>
                    </View>
                </View>
                <Request
                    ref="request"
                    popGoLogin={this.popGoLogin}
                />
            </View>
    	);
  	}
    popGoLogin(){
        this.props.navigation.navigate('Login');
    }
    goCart(){
        this.props.navigation.navigate("CartTab");
    }
  	componentDidMount(){
  		let id = this.props.navigation.state.params.productId;
  		this.doReqProductDetail(id);
  	}
  	doReqProductDetail(id){
  		this.getProductDetailData(id);
  		this.getRelevanceProductData(id);
  		this.doAddBrowsingRecord(id);
  	}
  	getProductDetailData(id){
  		let _this = this;
  		this.refs.request.PostService(API.PRODUCT_DETAIL, {
  			productId: id
  		}, function(result){
  			//console.log(result);
  			_this.setState({
  				picData: result.data.picData
  			})
  		})
  	}
  	getRelevanceProductData(id){
  		let _this = this;
  		this.refs.request.PostService(API.RELEVANCE_PRODUCT, {
  			productId: id
  		}, function(result){
  			//console.log(result);
  		}, true);
  	}
  	doAddBrowsingRecord(id){
  		let _this = this;
  		this.refs.request.PostService(API.ADD_BROWSING_RECORD, {productId: id}, function(){
            //console.log(result);
        }, true);
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee'
	},
	scrollViewStyle:{
		flex: 1
	},
	wrapper: {
		flex: 1,
		height: width,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	slide: {
	    height: width,
	    justifyContent: 'center'
  	},
  	slideImage: {
  		width: width,
  		height: width
  	},
  	footerView: {
  		width: width,
  		height: 44,
  		flexDirection: 'row',
  		position: 'absolute',
  		bottom: 0,
  		left: 0
  	},
  	footerLeftView:{
  		flex: 1,
  		height: 44,
  		backgroundColor: '#e6e6e6',
  		flexDirection: 'row',
  		justifyContent: 'center',
  		alignItems: 'center'
  	},
  	footerLeftIcon:{
  		fontFamily: 'iconfont',
  		fontSize: 18,
  		color: '#f65a44',
  		paddingRight: 2
  	},
  	footerLeftText:{
  		color: '#323232',
  		fontSize: 14
  	},
  	footerRightView:{
  		backgroundColor: '#f65a44'
  	},
  	footerRightText:{
  		fontSize: 14,
  		color: '#fff'
  	},
  	goCartView:{
  		position: 'absolute',
  		top: 10,
  		right: 20
  	}
});

export default productDetail;