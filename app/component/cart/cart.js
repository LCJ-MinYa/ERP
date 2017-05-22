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

class cart extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: 'CartTab',
    //     tabBarIcon: ({tintColor}) =>(
    //         <View>
    //             <Image
    //               style={[styles.icon, {tintColor: tintColor}]}
    //               source={{uri: 'cart'}}
    //             />
    //             <Text>{navigation.state.params && navigation.state.params.cart}</Text>
    //         </View>
    //     ),
    // })
  	render() {
  		const {dispatch, cart, isLoading} = this.props;
    	return (
    		<View>
      			<Text style={{marginTop: 100}} onPress={()=>{
                    dispatch(addCart(cart));
                    //this.props.navigation.setParams({cart: this.props.cart});
                }}>购物车首页</Text>
                <Text onPress={()=>{
                    dispatch(showLoading(isLoading));
                }}>打开加载</Text>
                <Text onPress={()=>{
                    dispatch(hideLoading(isLoading));
                }}>关闭加载</Text>
      			<Text>{cart}</Text>
      		</View>
    	);
  	}
    componentDidMount(){
        console.log(this);
    }
}

const styles = StyleSheet.create({

});

function selector(state) {
    return {  
        cart: state.cart,
        isLoading: state.isLoading
    }  
}

export default connect(selector)(cart);