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
    //     title: '购物车',
    //     tabBarIcon: ({tintColor}) =>{
    //         return(
    //             <TouchableWithoutFeedback onPress={()=>{
    //                 navigation.navigate("CartTab");
    //                 setTimeout(function(){
    //                     _this.a();
    //                 }, 200);
    //             }}>
    //                 <View>
    //                     <Image
    //                       style={[styles.icon, {tintColor: tintColor}]}
    //                       source={{uri: 'cart'}}
    //                     />
    //                     <Text>{navigation.state.params && navigation.state.params.cart}</Text>
    //                 </View>
    //             </TouchableWithoutFeedback>
    //         )
    //     },
    // })
  	render() {
        console.log('render');
  		const {dispatch, cart, isLoading} = this.props;
    	return (
    		<View>
      			<Text style={{marginTop: 100}} onPress={()=>{
                    dispatch(addCart(cart));
                    //this.props.navigation.setParams({cart: this.props.cart});
                }}>购物车首页</Text>
      			<Text>{cart}</Text>
      		</View>
    	);
  	}
    componentDidMount(){

    }
}

const styles = StyleSheet.create({
    icon:{
        width: 24,
        height: 24
    }
});

function selector(state) {
    return {  
        cart: state.cart,
        isLoading: state.isLoading
    }  
}

export default connect(selector)(cart);