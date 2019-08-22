import React, {Component} from 'react';
import {connect} from 'react-redux'
import {categoryArticlesNewCustomView} from '../../../../data-store/actions/articles-actions';

import {FlatList, Image, StyleSheet, View} from 'react-native';
import ArticlesListItemCardHorizontal from '../ArticlesListItemCardHorizontal';
import ArticlesListHeaderCategory from './ArticlesListHeaderCategory';

import ListEmbedMHVideo from '../../../Videos/ListEmbedMHVideo';

import LoadMorArticlesButom from '../../../Loading/LoadMorArticlesButom';
import nextButtonIcon from "../../../../assets/swiperIcons/Yellow-Swipe-Arrow-Right.png"
import prevButtonIcon from "../../../../assets/swiperIcons/Yellow-Swipe-Arrow-Left.png"

class ArticlesListCustomView extends Component {

    componentDidMount() {

        let customView = this.props.item.customView;
        if (this.props.item != undefined && customView != undefined) {
            for (var i in customView) {
                let categoryCode = customView[i].categoryCode;
                let tagCode = customView[i].tagCode;

                let listOfCategory = this.filterWichArticlesShow(this.props.articlesList, categoryCode, tagCode);
                if (listOfCategory.length < 4) {
                    //alert(listOfCategory.length);
                    // Muestro los que tengo y pido mas articulos en esa categoria o tag
                    this.props.getArticlesNew(customView[i]);
                }
            }
        }

    }

    filterWichArticlesShow = (articlesList, categoryCode, tagCode) => {

        let articlesSlugNew = [];
        if (categoryCode != undefined) {
            for (var i in articlesList) {
                if (articlesList[i].categories.indexOf(categoryCode) >= 0) {
                    console.log(JSON.stringify(articlesList[i].categories));
                    articlesSlugNew.push(articlesList[i]);
                }
            }
        } else if (tagCode != undefined) {
            for (var i in articlesList) {
                if (articlesList[i].tags.indexOf(tagCode) >= 0) {
                    articlesSlugNew.push(articlesList[i]);
                }
            }
        }
        return articlesSlugNew;
    }

    renderArticles = (listCategory, index, categoryCode, tagCode) => {
        let articlesCustomCategory = [];
        for (var i = 0; i < 4; i++) {
            articlesCustomCategory.push(<ArticlesListItemCardHorizontal key={index + ((i + 1) * 1000)}
                                                                        article={listCategory[i]}
                                                                        categoryCode={categoryCode}
                                                                        tagCode={tagCode}/>);
        }
        return articlesCustomCategory;
    }


    render() {
        let listData = [];
        let customView = this.props.item.customView;
        let video;
        if (this.props.item.video != undefined) {
            video = (<ListEmbedMHVideo jsonVideo={this.props.item.video}/>);
        }
        if (this.props.item != undefined && customView != undefined) {
            for (var i in customView) {
                let categoryCode = customView[i].categoryCode;
                let tagCode = customView[i].tagCode;

                listData.push(<ArticlesListHeaderCategory key={i} imageHeader={customView[i].subTagImage} index={i}/>);
                let listOfCategory = this.filterWichArticlesShow(this.props.articlesList, categoryCode, tagCode);
                // muestro los articulos que tenga o la vista vacia mientras carga
                listData.push(this.renderArticles(listOfCategory, i, categoryCode, tagCode))
                listData.push(<LoadMorArticlesButom itemSet={customView[i]} actualPage={true} text={"VER MÁS AQUÍ"}
                                                    image={true}/>)
            }
        }

        return (
            <View style={{flex: 1}}>
                {video}

                <FlatList style={{flex: 1}}
                          data={listData}
                          renderItem={({item, index}) =>
                              item
                          }
                          keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticlesNew: (item) => {
            console.log("get slug");
            //dispatch(resetLoading());
            //dispatch(setCategoryCode(item));
            dispatch(categoryArticlesNewCustomView(item))
        }

    }
}

const mapStateToProps = (state) => {
    return {
        item: state.articles.item,
        categoryCode: state.articles.categoryCode,
        tagCode: state.articles.tagCode,
        page: state.articles.page,
        articlesList: state.articles.articlesList

    }
}

const ArticlesListCustom = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticlesListCustomView);


export default ArticlesListCustom;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});
