'use strict';

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback,
    StatusBar,
    Platform,
    Linking
} from 'react-native';
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';
import Request from '../../utils/request';
import API from '../../config/apiConfig';
import Config from '../../config/config';
import ProductHeader from '../common/productHeader';
import ProductBanner from './productBanner';
import ProductTypeNav from './productTypeNav';
import ProductNotice from './productNotice';
import ProductCommonList from '../common/productCommonList';
const appKey = Platform.OS == 'ios' ? Config.APPKEY.IOS : Config.APPKEY.ANDROID;
let bannerNoticeReq = false;
let productReq = false;
let product = React.createClass({
    getInitialState: function() {
        return {
            isShowLoading: false,
            isShowSmallProductList: true,
            bannerNoticeData: {},
            productData: []
        };
    },
    componentWillMount() {
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [{
                text: '是',
                onPress: () => {
                    throw new Error('模拟启动失败,请重启应用')
                }
            }, {
                text: '否',
                onPress: () => {
                    markSuccess();
                }
            }, ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        } else {
            checkUpdate(appKey).then(info => {
                if (info.expired) {
                    Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [{
                        text: '确定',
                        onPress: () => {
                            info.downloadUrl && Linking.openURL(info.downloadUrl)
                        }
                    }, ]);
                } else if (info.upToDate) {
                    Alert.alert('提示', '您的应用版本已是最新.');
                } else {
                    Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [{
                        text: '是',
                        onPress: () => {
                            this.doUpdate(info)
                        }
                    }, {
                        text: '否',
                    }, ]);
                }
            }).catch(err => {
                Alert.alert('提示', '更新失败.');
            });
        }
    },
    doUpdate(info) {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [{
                text: '是',
                onPress: () => {
                    switchVersion(hash);
                }
            }, {
                text: '否',
            }, {
                text: '下次启动时',
                onPress: () => {
                    switchVersionLater(hash);
                }
            }, ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                />

                <ProductHeader popDoClick={(url)=>{this.popToNewView(url)}} />

                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isShowLoading}
                            onRefresh={this.doRefresh}
                            tintColor="#989898"
                            colors={['#989898']}
                            progressBackgroundColor="#eee"
                        />
                    }
                >
                    <ProductBanner ref="productBanner" bannerData={this.state.bannerNoticeData.banner}/>
                    <ProductTypeNav popDoClick={(url, params)=>{this.popToNewView(url, params)}} goodsLabelData={this.state.bannerNoticeData.goodsLabel}/>
                    <ProductNotice noticeData={this.state.bannerNoticeData.notice}/>

                    <View style={styles.listTitle}>
                        <Text style={styles.leftText}>推荐商品测试1.0.2</Text>
                        <TouchableWithoutFeedback onPress={this.changeProductList}>
                            <View>
                            {
                                this.state.isShowSmallProductList ? (
                                    <Text style={styles.rightIcon}>&#xe613;</Text>
                                ) : (
                                    <Text style={styles.rightIcon}>&#xe62e;</Text>
                                )
                            }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ProductCommonList
                        isShowSmallProductList={this.state.isShowSmallProductList}
                        productData={this.state.productData}
                        popDoClick={(url, params)=>{this.popToNewView(url, params)}}
                    />
                    <TouchableWithoutFeedback>
                        <View style={styles.goProductList}>
                            <Text style={styles.goProductListText}>查看全部推荐商品</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

                <Request
                    ref="request"
                    isShowLoading={this.state.isShowLoading}
                />
            </View>
        );
    },
    popToNewView(url, params) {
        this.props.navigation.navigate(url, params);
    },
    popGoLogin() {
        this.props.navigation.navigate('Login');
    },
    componentDidMount() {
        this.getInitMsg();
    },
    getInitMsg() {
        this.setState({
            isShowLoading: true
        }, () => {
            this.getBannerNoticeData();
            this.getProductData();
        });
    },
    getBannerNoticeData() {
        let _this = this;
        bannerNoticeReq = true;
        this.refs.request.PostService(API.BANNER_NOTICE, {}, function(result) {
            if (result.hasOwnProperty('banner') && result.banner.length === 0) {
                result.banner[0] = 'index_banner_1';
                result.banner[1] = 'index_banner_2';
            }
            _this.setState({
                bannerNoticeData: result
            }, () => {
                bannerNoticeReq = false;
                if (result.error_code == -12 || result.error_code == -15) {
                    _this.isRequestFinish('loginOut');
                } else {
                    _this.isRequestFinish();
                }
            });
        }, true);
    },
    getProductData() {
        let _this = this;
        productReq = true;
        this.refs.request.PostService(API.PRODUCT_LIST, {
            isRecommend: 1,
            includeOOS: 1,
            pageIndex: 1,
            pageSize: Config.PAGESIZE
        }, function(result) {
            if (result.data.length !== 0) {
                _this.setState({
                    productData: result.data
                }, () => {
                    productReq = false;
                    if (result.error_code == -12 || result.error_code == -15) {
                        _this.isRequestFinish('loginOut');
                    } else {
                        _this.isRequestFinish();
                    }
                });
            }
        }, true);
    },
    doRefresh() {
        this.getInitMsg();
    },
    isRequestFinish(loginOut) {
        if (loginOut) {
            setTimeout(() => {
                this.setState({
                    isShowLoading: false
                }, () => {
                    this.popGoLogin();
                });
            }, 500);
        }
        if (!bannerNoticeReq && !productReq) {
            setTimeout(() => {
                this.setState({
                    isShowLoading: false
                });
            }, 500);
        }
    },
    changeProductList() {
        this.setState({
            isShowSmallProductList: !this.state.isShowSmallProductList
        });
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    listTitle: {
        flex: 1,
        flexDirection: 'row',
        height: 32,
        marginTop: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftText: {
        paddingLeft: 10,
        color: '#f65a44',
        fontSize: 16
    },
    rightIcon: {
        fontFamily: 'iconfont',
        color: '#f7a900',
        paddingRight: 10,
        fontSize: 20
    },
    goProductList: {
        flex: 1,
        height: 32,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    goProductListText: {
        fontSize: 14,
        color: '#7b7b7b'
    },
    scrollView: {
        flex: 1
    }
});

export default product;