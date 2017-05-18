'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    ScrollView,
    Platform,
} from 'react-native';

import Request from '../../utils/request.js';
import API from '../../config/apiConfig.js';
import UISize from '../../utils/uiSize';

class mine extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo: {}
        };
    }
    renderMineHeader(){
        return(
            <View style={styles.headerImageView}>
                <Image
                  style={styles.headerBgStyle}
                  source={{uri: 'mine-header-back'}}
                />
                <Image
                  style={styles.headerImageStyle}
                  source={{uri: this.state.userInfo.headPortraitUrl ? this.state.userInfo.headPortraitUrl : 'my-picture'}}
                />
                <Text style={styles.headerUserStyle}>{this.state.userInfo.name}</Text>
            </View>
        )
    }
    renderMineMiddle(){
        return(
            <View style={styles.middleViewStyle}>
                {this.renderMiddleList('我的资金', 1)}
                {this.renderMiddleList('我的退货', 2)}
                {this.renderMiddleList('订过商品', 3)}
                {this.renderMiddleList('收藏商品', 4)}
                {this.renderMiddleList('收货地址', 5)}
                {this.renderMiddleList('浏览历史', 6)}
            </View>
        )
    }
    renderMiddleList(text, type){
        let middleListIcon;
        switch(type){
            case 1:
                middleListIcon = <Text style={[styles.middleListIconStyle,{color:'#ffa403'}]}>&#xe637;</Text>;
                break;
            case 2:
                middleListIcon = <Text style={[styles.middleListIconStyle,{color:'#4cc977'}]}>&#xe634;</Text>;
                break;
            case 3:
                middleListIcon = <Text style={[styles.middleListIconStyle,{color:'#5ca0e7', borderRightWidth: 0}]}>&#xe636;</Text>;
                break;
            case 4:
                middleListIcon = <Text style={[styles.middleListIconStyle,{color:'#ff6996'}]}>&#xe635;</Text>;
                break;
            case 5:
                middleListIcon = <Text style={[styles.middleListIconStyle,{color:'#46a4f4'}]}>&#xe632;</Text>;
                break;
            case 6:
                middleListIcon = <Text style={[styles.middleListIconStyle,{color:'#fe6505', borderRightWidth: 0}]}>&#xe633;</Text>;
                break;
        }
        return(
            <View style={styles.middleListViewStyle}>
                {middleListIcon}
                <Text style={styles.middleListTitleStyle}>{text}</Text>
            </View>
        )
    }
    renderAboutMine(){
        return(
            <View style={styles.aboutMineView}>
                <View style={styles.aboutMineTitleView}>
                    <Text style={styles.aboutMineTitleText}>关于我们</Text>
                </View>
                <View style={styles.aboutMineContent}>
                    <View style={styles.telBox}>
                        <View style={styles.telLeftView}>
                            <Text style={styles.telLeftIcon}>&#xe63d;</Text>
                        </View>
                        <View>
                            <Text style={styles.telTitle}>电话客服</Text>
                            <Text style={styles.telDec}>{this.state.userInfo.mobile ? this.state.userInfo.mobile : '028-88886666'}</Text>
                        </View>
                    </View>
                    <View style={styles.telBox}>
                        <View style={styles.telLeftView}>
                            <Text style={styles.telLeftIcon}>&#xe63c;</Text>
                        </View>
                        <View>
                            <Text style={styles.telTitle}>QQ客服</Text>
                            <Text style={styles.telDec}>{this.state.userInfo.qq ? this.state.userInfo.qq : '1049468118'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.aboutERPView}>
                    <Text style={styles.aboutERPText}>关于章鱼侠云订货</Text>
                    <Text style={styles.aboutERPIcon}>&#xe60b;</Text>
                </View>
            </View>
        )
    }
  	render() {
    	return (
    		<View style={styles.container}>
                <ScrollView
                    style={styles.scrollViewBox}
                    contentInset={{top: -1000}}
                    contentOffset={{y: 1000}}
                >
                    {/*我的头部个人信息*/}
                    {this.renderMineHeader()}

                    {/*我的中间部分*/}
                    {this.renderMineMiddle()}

                    {/*关于我们*/}
                    {this.renderAboutMine()}

                    <View style={styles.loginOutBtn}>
                        <Text style={styles.loginOutBtnText}>退出登录</Text>
                    </View>
                </ScrollView>

                <View style={styles.setBtn}>
                    <Text style={styles.setBtnIcon}>&#xe63f;</Text>
                </View>

                <Request
                    ref="request"
                    isShowLoading={false}
                />
            </View>
    	);
  	}
    componentDidMount(){
        this.getUserInfo()
    }
    getUserInfo(){
        let _this = this;
        this.refs.request.PostService(API.USER_INFO, {}, function(result){
            _this.setState({userInfo: result.data});
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    scrollViewBox:{
        flex: 1
    },
    headerImageView:{
        backgroundColor: '#f65a44',
        height: Platform.OS == 'ios' ? 1170 : 170,
        alignItems: 'center'
    },
    setBtn:{
        position: 'absolute',
        top: Platform.OS == 'ios' ? 25 : 10,
        right: 15,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    setBtnIcon:{
        fontSize: 18,
        color: '#fff',
        fontFamily: 'iconfont',
        paddingTop: 2
    },
    headerBgStyle:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: UISize.width(),
        height: 80
    },
    headerImageStyle:{
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: '#f87563',
        borderRadius: 40,
        backgroundColor: '#fff',
        marginTop: Platform.OS == 'ios' ? 1030 : 30,
    },
    headerUserStyle:{
        fontSize: 16,
        color: '#fff',
        lineHeight: 50
    },
    middleViewStyle:{
        width: UISize.width(),
        height: UISize.p2d(400),
        backgroundColor: '#fff',
        marginTop: UISize.p2d(10),
        marginBottom: UISize.p2d(40),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderColor: '#e1e1e1',
        borderBottomWidth: 0.5,
    },
    middleListViewStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        height: UISize.p2d(200),
        width: UISize.width() / 3,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#e1e1e1'
    },
    middleListIconStyle:{
        fontSize: 36,
        fontFamily: 'iconfont'
    },
    middleListTitleStyle:{
        color: '#323232',
        fontSize: 14,
        paddingTop: 5
    },
    aboutMineView:{
        flex: 1,
        height: UISize.p2d(300),
        marginLeft: UISize.p2d(20),
        marginRight: UISize.p2d(20),
        borderRadius: 5,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    aboutMineTitleView:{
        height: UISize.p2d(70),
        backgroundColor: '#ff8004',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutMineTitleText:{
        color: '#fff',
        fontSize: 14
    },
    aboutMineContent:{
        height: UISize.p2d(140),
        flexDirection: 'row',
    },
    telBox:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    telLeftView:{
        width: 32,
        height: 32,
        borderWidth: 0.5,
        borderColor: '#ababab',
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    telLeftIcon:{
        fontFamily: 'iconfont',
        fontSize: 28,
        color: '#aeaeae'
    },
    telTitle:{
        fontSize: 16,
        color: '#464646',
        paddingBottom: 5
    },
    telDec:{
        fontSize: 12,
        color: '#8a8a8a',
    },
    aboutERPView:{
        height: UISize.p2d(90),
        borderColor: '#e1e1e1',
        borderTopWidth: 0.5,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    aboutERPText:{
        color: '#474747',
        fontSize: 16
    },
    aboutERPIcon:{
        position: 'absolute',
        right: 15,
        fontFamily: 'iconfont',
        fontSize: 18,
        color: '#aeaeae'
    },
    loginOutBtn:{
        marginTop: UISize.p2d(40),
        marginBottom: UISize.p2d(20),
        height: UISize.p2d(96),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loginOutBtnText:{
        fontSize: 16,
        color: '#ff8004'
    }
});

export default mine;