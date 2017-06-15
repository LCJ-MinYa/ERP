'use strict';

import React, { Component } from 'react';
import {
    View,
    WebView
} from 'react-native';

const script = `<script>
    function _autoHeight(){
        window.location.hash = Date.now();
        document.title = document.documentElement.offsetHeight;
        document.body.style.height = document.documentElement.offsetHeight;
    }
    window.addEventListener('load', _autoHeight)
</script>`;

let safeHtml = function (html) {
    if (!html) {
        return '';
    }
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title></title>
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
                <style media="screen">
                    html,body{overflow: hidden;min-height:64px;}
                    img{max-width: 100%}
                </style>
            </head>
            <body>
                ${html}
                ${script}
            </body>
        </html>
    `
}

export default class webViewContainer extends Component {
    constructor(props) {
        super();
        this.state = {
            height: Number(props.height) || 0
        };
    }
    onNavigationStateChange(navState) {
        let h = Number(navState.title)|| 0;
        if (h) {
            this.setState({height: h});
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.props.html == nextProps.html && this.state.height == nextState.height) {
          return false;
        }
        return true;
    }
    render() {
        let {
            html,
            style,
            scrollEnabled,
            ...props
        } = this.props;
        let page = safeHtml(html || '');
        if (!page) {
            return (<View/>)
        }
    return (
            <WebView
                {...props}
                style={[style, {height: Number(this.state.height)}]}
                scrollEnabled={false}
                source={{html: page, baseUrl: '', title: ''}}
                ref={(c) => {this.webview = c}}
                automaticallyAdjustContentInsets={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={false}
                scalesPageToFit={true}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            />
        );
    }
}