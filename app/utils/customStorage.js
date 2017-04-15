'use strict';

let Global = {};

let getData = function(key){
    for(let i in Global){
        if(key == i){
            return Global[i];
        }
    }
    return undefined;
}
let setData = function(key, value){
    Global[key] = value;
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
    clearAll,
    Global
}