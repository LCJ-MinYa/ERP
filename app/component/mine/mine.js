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

import UISize from '../../utils/uiSize';

class mine extends Component{
    renderMineHeader(){
        return(
            <View style={styles.headerImageView}>
                <Image
                  style={styles.headerBgStyle}
                  source={{uri: 'mine-header-back'}}
                />
                <Image
                  style={styles.headerImageStyle}
                  source={{uri: 'my-picture'}}
                />
                <Text style={styles.headerUserStyle}>用户名称</Text>
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
                </ScrollView>
                <View style={styles.setBtn}>
                    <Text style={styles.setBtnIcon}>&#xe63f;</Text>
                </View>
            </View>
    	);
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
    }
});

export default mine;