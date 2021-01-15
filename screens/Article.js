/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Image, Dimensions, ScrollView } from 'react-native';
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

async function extractPartsOfArticle(article) {
  const entities = new Html5Entities();

  const subtitlePatternStart = '<h3 class="subtitle">';
  const subtitlePatternEnd = '</h3>';
  // const datePattern = '<time class="entry-date updated srbin-module-date">';
  const contentPatternStart = '<p>';
  const contentPatternEnd = '</p>';
  const imagePatternStart = 'data-src="';
  const imagePatternEnd = '"';

  /* const date = article.slice(
    article.indexOf(datePattern) + datePattern.length,
    article.indexOf('</time>'),
  ); */
  let subtitle;
  let content;
  let image;
  const result = [];
  for (let i = 0; i < article.length; i += 1) {
    let row = article[i];
    if (row.includes(subtitlePatternStart)) {
      let wholeSubtitleText = '';
      do {
        row = article[i];
        wholeSubtitleText = wholeSubtitleText.concat(row);
        i += 1;
      } while (!row.includes(subtitlePatternEnd));
      subtitle = wholeSubtitleText.slice(
        wholeSubtitleText.indexOf(subtitlePatternStart) + subtitlePatternStart.length,
        wholeSubtitleText.indexOf(subtitlePatternEnd),
      );
      const obj = {};
      obj['subtitle'.concat(i)] = entities.decode(subtitle);
      result.push(obj);
      i -= 1;
    } else if (row.includes(imagePatternStart)) {
      let wholeImageText = '';
      do {
        row = article[i];
        wholeImageText = wholeImageText.concat(row);
        i += 1;
      } while (!row.includes(imagePatternEnd));
      const firstPartOfImage = wholeImageText.slice(
        wholeImageText.indexOf(imagePatternStart) + imagePatternStart.length,
        wholeImageText.length,
      );
      image = firstPartOfImage.slice(0, firstPartOfImage.indexOf(imagePatternEnd));
      const obj = {};
      obj['image'.concat(i)] = image;
      result.push(obj);
      i -= 1;
    } else if (row.includes(contentPatternStart)) {
      let wholeContentText = '';
      do {
        row = article[i];
        wholeContentText = wholeContentText.concat(row);
        i += 1;
      } while (!row.includes(contentPatternEnd));
      content = wholeContentText.slice(
        wholeContentText.indexOf(contentPatternStart) + contentPatternStart.length,
        wholeContentText.indexOf(contentPatternEnd),
      );
      const obj = {};
      obj['content'.concat(i)] = entities.decode(content);
      result.push(obj);
      i -= 1;
    }
  }
  return result;
}

const Article = ({ route, navigation }) => {
  const { article } = route.params;
  const [loading, setLoading] = useState(true);
  const [partOfArticles, setPartOfArticles] = useState([]);

  async function fetchArticle() {
    const wholeArticle = await fetch(article.url, {
      method: 'GET',
    });
    const text = await wholeArticle.text();
    const textRows = text
      .substring(text.indexOf('<h3 class="subtitle">'), text.indexOf('class="donacija"'))
      .split('\n');
    const data = await extractPartsOfArticle(textRows);
    Promise.all(data).then((values) => {
      /* for (let i = 0; i < values.length; i += 1) {
        console.log(values[i]);
      } */
      setPartOfArticles(values);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchArticle();
  }, [loading]);

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
    <ScrollView style={{ flex: 1 }}>
      <OpenedEntireArticle>
        {Object.entries(partOfArticles).map(([keyName]) => {
          const object = partOfArticles[keyName];
          const key = Object.keys(object)[0];
          const value = Object.values(object)[0];
          if (key.includes('subtitle')) {
            return <OpenedArticleTitle key={key}>{value}</OpenedArticleTitle>;
          }
          if (key.includes('content')) {
            return <OpenedArticleContent key={key}>{value}</OpenedArticleContent>;
          }
          if (key.includes('image')) {
            // console.log('image', value);
            return <OpenedArticleImage key={key} source={{ uri: value }} />;
          }
          return null;
        })}
        <OpenedArticleButton onPress={() => navigation.goBack()}>
          <OpenedArticleButtonText>{'Back <<'}</OpenedArticleButtonText>
        </OpenedArticleButton>
      </OpenedEntireArticle>
    </ScrollView>
  );
};

export default Article;
