'use strict';

import {
    AsyncStorage
} from 'react-native';

var getData = function(key){
    AsyncStorage.getItem(key, (error, data)=>{
        console.log(data);
    })
}
var setData = function(key, value){
    AsyncStorage.setItem(key, value, ()=>{
        console.log("设置数据");
    });
}
var deleteData = function(){
    AsyncStorage.removeItem(key, ()=>{
        console.log("删除数据");
    });
}

module.exports = {
    setData,
    deleteData,
    getData
}