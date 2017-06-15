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
    Platform,
    WebView
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import Swiper from 'react-native-swiper';
import WebViewContainer from '../common/webViewContainer';

let {width, height} = Dimensions.get('window');

class productDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            productData: {},
            showRelevanceProduct: false,
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
            <View style={styles.productMsgView}>
                <Text numberOfLines={2} style={styles.productFullName}>{this.state.productData.fullName}</Text>
                <Text numberOfLines={1} style={styles.productCode}>编号:{this.state.productData.code}</Text>
                <View style={styles.productPriceView}>
                    <Text style={styles.productTradePrice}>
                        批发价：
                        <Text style={styles.productTradePriceColor}>
                            ¥<Text style={styles.productTradePriceSize}>{this.state.productData.tradePrice}</Text>
                        </Text>
                    </Text>
                    <Text style={styles.productMarketPrice}>市场价：{this.state.productData.marketPrice}</Text>
                </View>
                <View style={[styles.productPriceView, {marginTop: 5}]}>
                    <Text style={styles.productTradePrice}>起订量：{this.state.productData.minQty}{this.state.productData.unit}</Text>
                    <Text style={styles.productMarketPrice}>库存：{this.state.productData.stockQty}{this.state.productData.unit}</Text>
                </View>
            </View>
        )
    }
    renderProductTabsView(){
        return(
            <View style={styles.productTabsView}>
                <View style={styles.productTabsTitleView}>
                    <TouchableWithoutFeedback onPress={this.changeRelevanceProduct.bind(this, false)}>
                        <View style={[styles.productTabsTitle, !this.state.showRelevanceProduct ? styles.productTabsChoose : null]}><Text style={styles.productTabsTitleText}>图文详情</Text></View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.changeRelevanceProduct.bind(this, true)}>
                        <View style={[styles.productTabsTitle, this.state.showRelevanceProduct ? styles.productTabsChoose : null]}><Text style={styles.productTabsTitleText}>商品参数</Text></View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    !this.state.showRelevanceProduct ? (
                        <WebViewContainer html={this.state.productData.description}/>
                    ) : (
                        <View>
                            <View style={styles.productParamsView}>
                                <Text style={styles.productParamsTitle}>名称</Text>
                                <Text numberOfLines={1} style={styles.productParamsDec} >{this.state.productData.fullName}</Text>
                            </View>
                        </View>
                    )  
                }
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

                    {/*商品详情和参数*/}
                    {this.renderProductTabsView()}
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
                    popGoLogin={this.popGoLogin.bind(this)}
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
    changeRelevanceProduct(showRelevanceProduct){
        if(showRelevanceProduct){
            this.setState({showRelevanceProduct: true});
        }else{
            this.setState({showRelevanceProduct: false});
        }
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
    },
    productMsgView:{
        padding: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    productFullName:{
        fontSize: 15,
        color: '#323232'
    },
    productCode:{
        fontSize: 12,
        color: '#898989',
        paddingVertical: 4,
    },
    productPriceView:{
        flexDirection: 'row',
    },
    productTradePrice:{
        fontSize: 13,
        color: '#646464'
    },
    productTradePriceColor:{
        color: '#f65a44'
    },
    productTradePriceSize:{
        fontSize: 15
    },
    productMarketPrice:{
        position: 'absolute',
        left: width * 0.6,
        fontSize: 13,
        color: '#979797'
    },
    productTabsView:{
        marginBottom: 44,
        backgroundColor: '#fff',
    },
    productTabsTitleView:{
        width: width,
        height: 36,
        flexDirection: 'row',
        borderColor: '#d6d7dc',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productTabsTitle:{
        flex: 1,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productTabsTitleText:{
        fontSize: 15,
        color: '#4d4d4d',
    },
    productTabsChoose:{
        borderBottomWidth: 1,
        borderColor: '#f65a44'
    },
    webView:{
        width: width,
        backgroundColor: '#fff',
    },
    productParamsView:{
        paddingHorizontal: 10,
        borderColor: '#f3f3f3',
        borderBottomWidth: 0.5,
        width: width,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    productParamsTitle:{
        width: 30,
        marginRight: 40,
        fontSize: 13,
        color: '#606060'
    },
    productParamsDec:{
        width: width - 90,
        fontSize: 13,
        color: '#20282b'
    }
});

export default productDetail;