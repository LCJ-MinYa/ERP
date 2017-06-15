'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Dimensions,
  	Text,
  	Image,
  	ScrollView,
  	TouchableWithoutFeedback,
    Platform
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Swiper from 'react-native-swiper';

let {width, height} = Dimensions.get('window');

class productDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            productData: {},
        };
    }
    renderSwiperView(){
    	if(this.state.productData.picData && this.state.productData.picData.length !== 0){
	    	return(
	    		<View style={styles.wrapper}>
					<Swiper
						showsPagination={true}
						height={width}
						width={width}
					>
				        {this.renderImageItemView()}
				  	</Swiper>
	    		</View>
	    	)
    	}else{
    		return null;
    	}
    }
    renderImageItemView(){
		let imageItemArr = [];
		for (var i = 0; i < this.state.productData.picData.length; i++) {
			imageItemArr.push(
		        <View style={styles.slide} key={i}>
		          	<Image
		          	  style={styles.slideImage}
		          	  source={{uri: this.state.productData.picData[i]}}
		          	/>
		        </View>
			)
		}
		return imageItemArr;   	
    }
    renderProductMsgView(){
        return(
            <View>
                <Text>{this.state.productData.fullName}</Text>
            </View>
        )
    }
  	render() {
    	return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewStyle}>
                    {this.renderSwiperView()}

                    {/*商品信息*/}
                    {this.renderProductMsgView()}
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

                <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
                    <View style={[styles.goCartView, styles.goBackView]}>
                        <Text style={styles.goCartText}>&#xe640;</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.goCart.bind(this)}>
                    <View style={styles.goCartView}>
                        <Text style={styles.goCartText}>&#xe600;</Text>
                    </View>
                </TouchableWithoutFeedback>

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
    goBack(){
        this.props.navigation.goBack(null);
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
  			_this.setState({
  				productData: result.data
  			})
  		})
  	}
  	getRelevanceProductData(id){
  		let _this = this;
  		this.refs.request.PostService(API.RELEVANCE_PRODUCT, {
  			productId: id
  		}, function(result){
  		}, true);
  	}
  	doAddBrowsingRecord(id){
  		let _this = this;
  		this.refs.request.PostService(API.ADD_BROWSING_RECORD, {productId: id}, function(){
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
  		top: Platform.OS === 'ios' ? 20 : 10,
  		right: 10,
        width: 42,
        height: 42,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center'
  	},
    goBackView:{
        left: 10,
    },
    goCartText:{
        fontFamily: 'iconfont',
        fontSize: 18,
        color: '#fff'
    }
});

export default productDetail;