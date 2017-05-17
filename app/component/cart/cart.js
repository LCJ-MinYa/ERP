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

let _this = null;
class cart extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: 'aa',
    //     tabBarIcon: ({tintColor}) =>{
    //         if(_this){
    //             return(
    //                 <View>
    //                     <Image
    //                       style={[styles.icon, {tintColor: tintColor}]}
    //                       source={{uri: 'cart'}}
    //                     />
    //                     <Text>{_this.props.cart}</Text>
    //                 </View>
    //             )
    //         }else{
    //             return null;
    //         }
    //     },
    // })
  	render() {
  		const {dispatch, cart} = this.props;
    	return (
    		<View>
      			<Text style={{marginTop: 100}} onPress={()=>{dispatch(addCart(cart))}}>购物车首页</Text>
      			<Text>{cart}</Text>
      		</View>
    	);
  	}
    componentDidMount(){
        _this = this;
    }
}

const styles = StyleSheet.create({

});

function selector(state) {
    return {  
        cart: state.cart,
    }  
}

export default connect(selector)(cart);