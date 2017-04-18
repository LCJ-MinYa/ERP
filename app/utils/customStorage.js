'use strict';

import {
    AsyncStorage
} from 'react-native';

let setData = function(key, value){
    return AsyncStorage.setItem(key, value);
}

let getData = function(key){
    return AsyncStorage.getItem(key);
}

let deleteData = function(key){
    return AsyncStorage.removeItem(key);
}

let clearAll = function(){
    return AsyncStorage.clear();
}

module.exports = {
    setData,
    deleteData,
    getData,
    clearAll
}