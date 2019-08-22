import * as types from './action-types';
import { urlMundoHispanicoJson, 
		apiRoute, 
		postsRoute, 
		categoriesRoute,
		slugRoute, 
		usersRoute } from '../../localData/urlMundoHispanico';
import { AsyncStorage } from 'react-native';
//import * as fb from '../../firebase/firebasejs';
import { ArticleListLocal } from '../../localData/ListArticlesSample';
import firebase from 'react-native-firebase';



export function getAuthors() {
	var local = false;
	if(local){
		return dispatch => {
			dispatch({ 
				type: types.INIT_AUTHORS,
				authorList : authorListLocal,
			});
		}
	}else{
		return dispatch => {
			return fetch(`https://mundohispanico.com/api/get_author_index/`)
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson)
				dispatch({ 
					type: types.INIT_AUTHORS,
					authorList : responseJson,
				});
			})
			.catch((error) =>{
				console.log(error);
				dispatch({ 
					type: types.INIT_AUTHORS,
					authorList : null,
				});
			});
		}
	}
}
	
export function resetLoading() {
	console.log("reset Loading");
	return dispatch => {
			dispatch({ 
				type: types.RESET_LOADING, 
				isLoading : true
			});
	}
}

export function setCategoryCode(item){
	console.log("setCategory");
	return dispatch => {
			dispatch({ 
				type: types.SET_CATEGORY_CODE, 
				item : item
			});
	}
}


export function categoryArticlesNew(item,page) {
	if(page == undefined){
		page = 1;
	}
	let categoryCode = item.categoryCode;
	let tagCode = item.tagCode;
	let url;

	let extraUrl = `per_page=15&page=${page}`;
	if(categoryCode != undefined){
		if(categoryCode == 9782973){
			url = `${urlMundoHispanicoJson}${apiRoute}${postsRoute}?${extraUrl}`;
			typeView = "Home";
		}else{
			typeView = "Category"
			url = `${item.url}${categoryCode}&${extraUrl}`;
		}
	}else if(tagCode != undefined){
		typeView = "Category"
		url = `${item.url}${tagCode}&${extraUrl}`;
	}

	console.log(url)
	return dispatch => {
		return fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("load articles "+JSON.stringify(responseJson))
			dispatch({ 
				type: types.PUSH_ARTICLES, 
				status : "ok",
				errorRequest : undefined,
				isLoading : false,
				articlesPush : responseJson,
				categoryCode : categoryCode,
				tagCode : tagCode,
				typeView : typeView,
				page : page,
				item : item
			});
		})
		.catch((error) =>{
			dispatch({ 
				type: types.PUSH_ARTICLES, 
				status : "error",
				isLoading : false,
				errorRequest : error,
				articlesPush : undefined,
				categoryCode : categoryCode,
				tagCode : tagCode,
				typeView : typeView,
				page : page,
				item : item

		});
		});
	}
}

export function categoryArticlesNewCustomView(item,page) {
	if(page == undefined){
		page = 1;
	}
	let categoryCode = item.categoryCode;
	let tagCode = item.tagCode;
	let url;

	let extraUrl = `per_page=8&page=${page}`;
	if(categoryCode != undefined){
		if(categoryCode == 9782973){
			url = `${urlMundoHispanicoJson}${apiRoute}${postsRoute}?${extraUrl}`;
			typeView = "Home";
		}else{
			typeView = "Category"
			url = `${item.url}${categoryCode}&${extraUrl}`;
		}
	}else if(tagCode != undefined){
		typeView = "Category"
		url = `${item.url}${tagCode}&${extraUrl}`;
	}

	console.log(url)
	return dispatch => {
		return fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("load articles "+JSON.stringify(responseJson))
			dispatch({ 
				type: types.PUSH_ARTICLES_CUSTOM_VIEW, 
				status : "ok",
				errorRequest : undefined,
				isLoading : false,
				articlesPush : responseJson,
				categoryCode : categoryCode,
				tagCode : tagCode,
				typeView : typeView,
				page : page,
				item : item
			});
		})
		.catch((error) =>{
			dispatch({ 
				type: types.PUSH_ARTICLES_CUSTOM_VIEW, 
				status : "error",
				isLoading : false,
				errorRequest : error,
				articlesPush : undefined,
				categoryCode : categoryCode,
				tagCode : tagCode,
				typeView : typeView,
				page : page,
				item : item

		});
		});
	}
}

export function categoryArticlesBySlug(categorySlug) {
	alert(categorySlug);
	return dispatch => {
		return fetch(`${urlMundoHispanicoJson}${apiRoute}${postsRoute}?${categoriesRoute}=${categorySlug}`)
		.then((response) => response.json())
		.then((responseJson) => {
			alert(JSON.stringify(responseJson));
			dispatch({ 
				type: types.INIT_ARTICLES, 
				articlesList : responseJson,
				status : "ok",
				errorRequest : undefined,
				isLoading : false,
				categorySlug : categorySlug,
				typeView : "Category"
			});
		})
		.catch((error) =>{
			dispatch({ 
				type: types.INIT_ARTICLES, 
				articlesList : undefined,
				status : "error",
				errorRequest : error,
				isLoading : false,
				categorySlug : categorySlug,
				typeView : "Category"
		});
		});
	}
}


export function resetLoadingArticle() {
	console.log("reset Loading");
	return dispatch => {
			dispatch({ 
				type: types.RESET_LOADING_ARTICLE, 
				isLoadingArticle : true
			});
	}
}


export function getMenuItems(menuItems) {
	return dispatch => {
		dispatch({ 
			type: types.INIT_MENU, 
			menuItems : menuItems
		});
	}

}

export function article(slug) {
	return dispatch => {
		return fetch(`${urlMundoHispanicoJson}${apiRoute}${postsRoute}?${slugRoute}${slug}`)
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.length > 0){
				dispatch({ 
					type: types.ARTICLE, 
					article : responseJson[0],
					statusArticle : "ok",
					errorRequestArticle : undefined,
					isLoadingArticle : false,
					slugArticle : slug
				});
			}else{
				dispatch({ 
					type: types.ARTICLE, 
					article : null,
					statusArticle : "notFound",
					errorRequestArticle : "notFound",
					isLoadingArticle : false,
					slugArticle : slug
				});
			}
		})
		.catch((error) =>{
			console.log(error);
			dispatch({ 
				type: types.INIT_ARTICLES, 
				article : undefined,
				statusArticle : "error",
				errorRequestArticle : error,
				isLoadingArticle : false,
				slugArticle : slug
		});
		});
	}
}


export function setIDFA(IDFA) {
	console.log("setting IDFA");
	return dispatch => {
			dispatch({ 
				type: types.SET_IDFA, 
				IDFA : IDFA
			});
	}
}
