'use strict';

import {
    AsyncStorage
} from 'react-native';

let getData = function(key){
    return AsyncStorage.getItem(key)
    .then((value)=>{
        console.log(value);
        return value;
    })
}
let setData = function(key, value){
    let JsonStringValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, JsonStringValue)
    .then(()=>{
        console.log("设置" + key + '的值为' + JsonStringValue);
    })
}
let deleteData = function(key){
    return AsyncStorage.removeItem(key)
    .then(()=>{
        console.log("删除成功");
    })
}

let clearAll = function(){
    return AsyncStorage.clear()
    .then(()=>{
        console.log('清楚全部数据');
    })
}

module.exports = {
    setData,
    deleteData,
    getData,
    clearAll
}