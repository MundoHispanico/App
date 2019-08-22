import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux'
import {Container, Spinner} from 'native-base';

import LogoCuadrado from '../../assets/logo/LogoCuadradoMHSinFondo.png';
import ArticlesList from './Articles/ArticlesList/ArticlesList';
import HeaderDefault from '../Menu/HeaderDefault';
import ErrorPage from './Error/ErrorPage';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import nextButtonIcon from '../../assets/swiperIcons/Yellow-Swipe-Arrow-Right.png';
import prevButtonIcon from '../../assets/swiperIcons/Yellow-Swipe-Arrow-Left.png';

import LoadingMoreArticles from '../Loading/LoadingMoreArticles'
import {Actions} from 'react-native-router-flux';


class HomePageView extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    onSwipe(gestureName) {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
            case SWIPE_RIGHT:
                Actions.ArticleRequest({
                    typeView: 1,
                    articleSend: this.props.articlesList[0],
                    categoryCode: this.props.categoryCode,
                    tagCode: this.props.tagCode
                })
        }
    }

    goToFirstArticle() {
        Actions.ArticleRequest({
            typeView: 1,
            articleSend: this.props.articlesList[0],
            categoryCode: this.props.categoryCode,
            tagCode: this.props.tagCode
        })
    }

    renderArrows() {
        if (this.props.status !== "ok" || typeof this.props.articlesList === 'undefined') {
            return null;
        }
        let nextButton = (
            <TouchableOpacity onPress={() => this.goToFirstArticle()}>
                <Image source={nextButtonIcon} style={{height: 30, width: 30, marginRight: 10}}/>
            </TouchableOpacity>
        );
        let prevButton = (
            <TouchableOpacity onPress={() => this.goToFirstArticle()}>
                <Image source={prevButtonIcon} style={{height: 30, width: 30, marginLeft: 10}}/>
            </TouchableOpacity>
        )
        return (
            <View style={{position: 'absolute', top: 180, zIndex: 10, width: '100%'}}>
                <View style={{
                    flex: 1,
                    zIndex: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    {prevButton}
                    {nextButton}
                </View>
            </View>
        )
    }

    render() {

        let content;
        let loading;
        if (this.props.isLoading) {
            console.warn("is loading");
            if (this.props.status === "ok" && this.props.articlesList != undefined) {
                console.log("is loading pero tiene articulos");
                loading = (<LoadingMoreArticles/>)
                content = (
                    <GestureRecognizer onSwipe={(direction, state) => this.onSwipe(direction, state)}>
                        <ArticlesList articlesList={this.props.articlesList}
                                      typeView={this.props.typeView}
                                      categoryCode={this.props.categoryCode}
                                      tagCode={this.props.tagCode}/>
                    </GestureRecognizer>
                )
            } else {
                console.warn("is loading sin articulos");
                content = (
                    <Container style={{flex: 1, alignItems: "center", backgroundColor: "#C52D27"}}>
                        <Image style={{
                            width: 200,
                            resizeMode: 'contain'
                        }} source={LogoCuadrado}/>
                        <Spinner color='white'/>
                    </Container>
                )
            }
        } else if (this.props.status === "ok" && this.props.articlesList != undefined) {
            console.warn("mostrar lista");

            content = (
                <GestureRecognizer onSwipe={(direction, state) => this.onSwipe(direction, state)}>
                    <ArticlesList articlesList={this.props.articlesList}
                                  typeView={this.props.typeView}
                                  categoryCode={this.props.categoryCode}
                                  tagCode={this.props.tagCode}/>
                </GestureRecognizer>

            )
        } else if (this.props.status === "error") {
            console.log("error page");
            content = (<ErrorPage type={this.props.errorRequest}/>)
        } else {
            console.log("error default");
            content = (<ErrorPage type={this.props.errorRequest}/>)

        }

        return (
            <Container style={{flex: 1}}>
                <HeaderDefault back={false}/>
                {this.renderArrows()}
                <ScrollView style={styles.container}>
                    {content}
                </ScrollView>
                {loading}
            </Container>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        articlesList: state.articles.articlesList,
        status: state.articles.status,
        errorRequest: state.articles.errorRequest,
        isLoading: state.articles.isLoading,
        slug: state.articles.slug,
        typeView: state.articles.typeView,
        authorList: state.articles.authorList,
        categoryCode: state.articles.categoryCode,
        tagCode: state.articles.tagCode,
        item: state.articles.item

    }
}

const HomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageView);

export default HomePage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
