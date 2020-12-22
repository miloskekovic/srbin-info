import * as React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  OpenedEntireArticle,
  OpenedArticleTitle,
  OpenedArticlePublishedAt,
  OpenedArticleImage,
  OpenedArticleContent,
  OpenedArticleButton,
  OpenedArticleButtonText,
} from '../utils/components';

function Article({ navigation, route }) {
  // const {params} = route;
  const { title } = route.params.openedNews;
  const { publishedAt } = route.params.openedNews;
  const { urlToImage } = route.params.openedNews;
  const dateToStr = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}
    /${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };
  return (
    <View style={{ flex: 1 }}>
      <OpenedEntireArticle>
        <OpenedArticleTitle>{title}</OpenedArticleTitle>
        <OpenedArticlePublishedAt>{dateToStr(publishedAt)}</OpenedArticlePublishedAt>
        <OpenedArticleImage source={{ uri: urlToImage }} />
        <OpenedArticleContent>{route.params.openedNews.content}</OpenedArticleContent>
        <OpenedArticleButton onPress={() => navigation.navigate('Top News')}>
          <OpenedArticleButtonText>{'<< Back to list'}</OpenedArticleButtonText>
        </OpenedArticleButton>
      </OpenedEntireArticle>
    </View>
  );
}

Article.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      openedNews: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Article;
