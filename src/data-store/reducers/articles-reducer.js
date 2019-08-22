import * as types from '../actions/action-types';

const initialState = [];
export default function articlesReducer(state = initialState, action) {
	switch (action.type) {
		case types.INIT_MENU:
			return Object.assign({}, state, {
				menuItems : action.menuItems
			})
		case types.ARTICLE:
			return Object.assign({}, state, {
				article : action.article,
				statusArticle : action.statusArticle,
				errorRequestArticle : action.errorRequestArticle,
				isLoadingArticle : action.isLoadingArticle,
				slugArticle : action.slugArticle
			})
		case types.INIT_AUTHORS:
			return Object.assign({}, state, {
				authorList : action.authorList
			})
		case types.SET_IDFA:
			return Object.assign({}, state, {
				IDFA : action.IDFA
			})
		case types.RESET_LOADING:
		console.log("loading");
			return Object.assign({}, state, {
				isLoading : action.isLoading
			})
		case types.RESET_LOADING_ARTICLE:
		console.log("loading");
			return Object.assign({}, state, {
				isLoadingArticle : action.isLoadingArticle
			})
		case types.SET_CATEGORY_CODE:
			console.log("Category code");
			// recorro la lista de articulos para kostrar los que ya estan descargados de la misma categoria
			let categoryCode = action.item.categoryCode;
			let tagCode = action.item.tagCode;
		
			return Object.assign({}, state, {
					item : action.item,
					categoryCode : categoryCode,
					tagCode : tagCode
				})
		case types.PUSH_ARTICLES:
			// si categoryCode es igual al codigo de home lo agrego a cara articulo
			var articlesListNew = [];
			var list = []
			var pushArticles = action.articlesPush;
				// agrego al array los articulos que ya existen
			if(state.articlesList != undefined && state.articlesList.length > 0){
				for(var i in state.articlesList){
					list.push(state.articlesList[i])
				}
			}
			// agrego al array los articulos nuevos
			if(pushArticles != undefined && pushArticles.length > 0){
				for(var i in pushArticles){
					delete pushArticles[i].content;
					delete pushArticles[i]._links;
					if(action.categoryCode == 9782973){
						pushArticles[i].categories.push(9782973);
					}
					list.push(pushArticles[i])
				}
			}
			
			let isInArray = [];
				for(var i in list){
					console.log("id articulo Lista - "+list[i].id);

				// ciclo para dejar articulos que no esten repetidos
					if(isInArray.indexOf(list[i].id) == -1){
						// si no estaba ya en el array lo ingreso y agrego al array de busqeuda para que no repita
						isInArray.push(list[i].id);
						articlesListNew.push(list[i]);
					}
				}

			return Object.assign({}, state, {
				articlesList : articlesListNew,
				articlesPush : action.articlesPush,
				isLoading : action.isLoading,
				categoryCode : action.categoryCode,
				tagCode : action.tagCode,
				errorRequest : action.errorRequest,
				typeView : action.typeView,
				page : action.page,
				item : action.item,
				status : action.status
			})
		case types.PUSH_ARTICLES_CUSTOM_VIEW:
			// si categoryCode es igual al codigo de home lo agrego a cara articulo
			var articlesListNew = [];
			var list = []
			var pushArticles = action.articlesPush;
				// agrego al array los articulos que ya existen
			if(state.articlesList != undefined && state.articlesList.length > 0){
				for(var i in state.articlesList){
					list.push(state.articlesList[i])
				}
			}
			// agrego al array los articulos nuevos
			if(pushArticles != undefined && pushArticles.length > 0){
				for(var i in pushArticles){
					delete pushArticles[i].content;
					delete pushArticles[i]._links;
					if(action.categoryCode == 9782973){
						pushArticles[i].categories.push(9782973);
					}
					list.push(pushArticles[i])
				}
			}
			
			let isInArray2 = [];
				for(var i in list){
					console.log("id articulo Lista - "+list[i].id);

				// ciclo para dejar articulos que no esten repetidos
					if(isInArray2.indexOf(list[i].id) == -1){
						// si no estaba ya en el array lo ingreso y agrego al array de busqeuda para que no repita
						isInArray2.push(list[i].id);
						articlesListNew.push(list[i]);
					}
				}

				console.log("nueva peticion")
			return Object.assign({}, state, {
				articlesList : articlesListNew,
				articlesPush : action.articlesPush,
				errorRequest : action.errorRequest,
				typeView : action.typeView,
				status : action.status
			})
		case types.PUSH_ARTICLES_LOW:
			return Object.assign({}, state, {
				articlesList : action.articlesPush,
				articlesPush : action.articlesPush,
				isLoading : action.isLoading,
				categoryCode : action.categoryCode,
				tagCode : action.tagCode,
				errorRequest : action.errorRequest,
				typeView : action.typeView,
				page : action.page,
				item : action.item,
				status : action.status
			})
			default:
		return state;
	}

}

const adHomeCategoryToArticles = (articles) => {


	return articles;
}