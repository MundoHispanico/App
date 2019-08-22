import React, {Component} from 'react';
import { connect } from 'react-redux'
import { resetLoading, categoryArticlesNew} from '../../data-store/actions/articles-actions';

  const LoadMoreArticlesFuncView = () => {
    return this.props.getArticlesByCategoryLoadMore(this.props.item, this.props.page)
  }

const mapDispatchToProps = (dispatch) => {
  return {
      getArticlesByCategoryLoadMore : (item, page) => {
        dispatch(resetLoading());
        dispatch(categoryArticlesNew(item, page))
      }
    }
  }

const mapStateToProps = (state) => {
  return {
    item : state.articles.item,
    page : state.articles.page,
  }
}

const LoadMoreArticlesFunc = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadMoreArticlesFuncView);


export default LoadMoreArticlesFunc;

