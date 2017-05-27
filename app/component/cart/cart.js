'use strict';

import React, { Component } from 'react';

import {
  	StyleSheet,
  	View,
  	Text,
  	Image,
    TouchableWithoutFeedback
} from 'react-native';

import { connect,Provider } from 'react-redux';
import { addCart,showLoading,hideLoading } from '../../action'

import CommonHeader from '../common/commonHeader';

let cart = React.createClass({
    /*static navigationOptions = ({ navigation }) => ({
        title: '购物车',
        tabBarIcon: ({tintColor}) =>{
            return(
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.navigate("CartTab");
                    setTimeout(function(){
                        _this.a();
                    }, 200);
                }}>
                    <View>
                        <Image
                          style={[styles.icon, {tintColor: tintColor}]}
                          source={{uri: 'cart'}}
                        />
                        <Text>{navigation.state.params && navigation.state.params.cart}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        },
    })*/
    getInitialState: function() {
        return {
            headerTitle: '购物车',
        };
    },
  	render() {
  		const {dispatch, cart} = this.props;
    	return (
    		<View style={styles.container}>
                {/*购物车header*/}
                <CommonHeader
                    isShowBack={false}
                    isShowRight={true}
                    rightText={'清空'}
                    headerTitle={this.state.headerTitle}
                />
      		</View>
    	);
  	},
    componentDidMount(){
    },
    popToNewView(url, params){
        if(!url){
            this.props.navigation.goBack(url);
        }else{
            this.props.navigation.navigate(url);
        }
    }

})

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function selector(state) {
    return {  
        cart: state.cart
    }  
}

export default connect(selector)(cart);