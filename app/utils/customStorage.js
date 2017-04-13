'use strict';

import {
    AsyncStorage
} from 'react-native';

var getData = function(key){
    AsyncStorage.getItem(key, (error, data)=>{
        alert(data);
    })
}
var setData = function(key, value){
    AsyncStorage.setItem(key, value, ()=>{
        alert("设置数据");
    });
}
var deleteData = function(){
    AsyncStorage.removeItem(key, ()=>{
        alert("删除数据");
    });
}

module.exports = {
    setData,
    deleteData,
    getData
}