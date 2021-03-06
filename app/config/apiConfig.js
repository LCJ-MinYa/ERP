'use strict';

export default {
	//公用接口
	GLOBAL_INFO: '/api/system/getGlobalInfo',

	//登录接口
	LOGIN: '/api/user/login',

	//product商品接口
	BANNER_NOTICE: '/api/product/getBannerNotice',
	PRODUCT_LIST: '/api/product/getProductList',
	FIRST_LEVEL_CLASS: '/api/product/getFirstLevelClass',
	OTHER_LEVEL_CLASS: '/api/product/getOtherLevelClass',
	PRODUCT_DETAIL: '/api/product/getProductDetail',
	RELEVANCE_PRODUCT: '/api/product/getRelevanceProduct',
	ADD_BROWSING_RECORD: '/api/personalcenter/addBrowsingRecord',
	CANCEL_FAVORITE: '/api/product/cancelFavorite',
	ADD_FAVORITE: '/api/product/addFavorite',

	//mine我的接口
	USER_INFO: '/api/personalcenter/getUserInfo',

	//msg消息接口
	NOREAD_MESSAGE_COUNT: '/api/message/getNoReadMessageCount',

	//order订单接口
	ORDER_LIST: '/api/order/getOrderList',

	//cart购物车接口
	CART_LIST: '/api/cart/getCartList',
};