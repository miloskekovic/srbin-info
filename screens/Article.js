/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Image, Dimensions, ScrollView, Alert } from 'react-native';
import { Html5Entities } from 'html-entities';
import {
  OpenedEntireArticle,
  OpenedArticleTitle,
  OpenedArticleImage,
  OpenedArticleContent,
  OpenedArticleButton,
  OpenedArticleButtonText,
  LoadingView,
} from '../utils/components';

const screenWidth = Dimensions.get('window').width;
const partOfArticles = [];

function showError(error) {
  Alert.alert(
    'Alert Title',
    `${error}`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => {} },
    ],
    { cancelable: true },
  );
}

function extractPartsOfArticle(article) {
  const entities = new Html5Entities();

  const subtitlePattern = '<h3 class="subtitle">';
  // const datePattern = '<time class="entry-date updated srbin-module-date">';
  const contentPattern = '<p>';
  const imagePattern = 'data-src="';

  /* const date = article.slice(
    article.indexOf(datePattern) + datePattern.length,
    article.indexOf('</time>'),
  ); */
  let subtitle;
  let content;
  let image;
  for (let i = 0; i < article.length; i += 1) {
    if (article[i].includes(subtitlePattern)) {
      const part = article.slice(
        article.indexOf(subtitlePattern) + subtitlePattern.length,
        article.length,
      );
      subtitle = part.slice(0, part.indexOf('</h3>'));
      partOfArticles.push('subtitle', entities.decode(subtitle));
    } else if (article[i].includes(contentPattern)) {
      content = article.slice(
        article.indexOf(contentPattern) + contentPattern.length,
        article.indexOf('</p>'),
      );
      partOfArticles.push('content', entities.decode(content));
    } else if (article[i].includes(imagePattern)) {
      image = article.slice(
        article.indexOf(imagePattern) + imagePattern.length,
        article.indexOf('"'),
      );
      partOfArticles.push('image', image);
    }
  }
}

const Article = ({ route, navigation }) => {
  const { article } = route.params;
  const [loading, setLoading] = useState(true);

  const fetchArticle = () => {
    fetch(article.url, {
      method: 'GET',
    })
      .then((response) => response.text())
      .then((responseJson) => {
        const textRows = responseJson
          .substring(
            responseJson.indexOf('<h3 class="subtitle">'),
            responseJson.indexOf('class="donacija"'),
          )
          .split('\n');
        extractPartsOfArticle(textRows);
      })
      .then(setLoading(false))
      .catch((error) => {
        showError(error);
      });
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  if (loading) {
    return (
      <LoadingView>
        <Image
          style={{ width: screenWidth / 3, height: screenWidth / 3 }}
          source={{ uri: 'https://i.gifer.com/YCZH.gif' }}
        />
      </LoadingView>
    );
  }
  return (
    // <View style={{ flex: 1, padding: '5%' }}>
    <ScrollView style={{ padding: '5%' }}>
      <OpenedEntireArticle>
        {Object.entries(partOfArticles).forEach((key, value) => {
          if (key === 'subtitle') {
            <OpenedArticleTitle>{value}</OpenedArticleTitle>;
          } else if (key === 'content') {
            <OpenedArticleContent>{value}</OpenedArticleContent>;
          } else if (key === 'image') {
            <OpenedArticleImage source={{ uri: value.image }} />;
          }
        })}
        <OpenedArticleButton onPress={() => navigation.goBack()}>
          <OpenedArticleButtonText>{'Back <<'}</OpenedArticleButtonText>
        </OpenedArticleButton>
      </OpenedEntireArticle>
    </ScrollView>
  );
};

export default Article;
