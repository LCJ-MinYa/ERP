'use strict';

import React, {
	Component
} from 'react';
import {
	Provider
} from 'react-redux';
import {
	createStore
} from 'redux';

import AppReducer from './Reducers';
import RootMain from './component/main/rootMain';

class App extends React.Component {
	/* 
	 * 1.创建store对象,将store传递给Provider
	 * 2.所有的应用组件做为Provider的子组件
	 * 3.Provider自身实现了将store作为props传递给子组件
	 */
	store = createStore(AppReducer);
	render() {
		return (
			<Provider store={this.store}>
        		<RootMain ref="RootMain"/>
      		</Provider>
		);
	}
}

export default App;