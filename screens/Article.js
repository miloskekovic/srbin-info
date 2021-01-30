/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
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
import * as parameters from '../utils/parameters';

async function extractPartsOfArticle(article) {
  const entities = new Html5Entities();

  const subtitlePatternStart = '<h3 class="subtitle">';
  const subtitlePatternEnd = '</h3>';
  // const datePattern = '<time class="entry-date updated srbin-module-date">';
  const contentPatternStart = '<p>';
  const contentPatternEnd = '</p>';
  const imagePatternStart = 'data-src="';
  const imagePatternEnd = '"';
  const videoPatternStart = '<p><div class="video';
  const videoPatternEnd = '</div></p>';
  const twitterPatternStart = '<blockquote class="twitter-tweet">';
  const twitterPatternEnd = '</blockquote>';

  /* const date = article.slice(
    article.indexOf(datePattern) + datePattern.length,
    article.indexOf('</time>'),
  ); */
  let subtitle;
  let content;
  let image;
  let video;
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
    } else if (row.includes(twitterPatternStart)) {
      let wholeTwitterText = '';
      do {
        row = article[i];
        wholeTwitterText = wholeTwitterText.concat(row);
        i += 1;
      } while (!row.includes(twitterPatternEnd));
      const twitter = wholeTwitterText.slice(
        wholeTwitterText.indexOf(twitterPatternStart),
        wholeTwitterText.indexOf(twitterPatternEnd) + twitterPatternEnd.length,
      );
      const obj = {};
      obj['twitter'.concat(i)] = twitter;
      result.push(obj);
    } else if (row.includes(contentPatternStart)) {
      if (row.includes(imagePatternStart)) {
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
      } else if (row.includes(videoPatternStart)) {
        let wholeVideoText = '';
        do {
          row = article[i];
          wholeVideoText = wholeVideoText.concat(row);
          i += 1;
        } while (!row.includes(videoPatternEnd));
        video = wholeVideoText.slice(0, wholeVideoText.length);
        const obj = {};
        obj['video'.concat(i)] = video;
        console.log('video', video);
        result.push(obj);
        i -= 1;
      } else {
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
          style={{ width: parameters.screenWidth / 3, height: parameters.screenHeight / 3 }}
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
            return <OpenedArticleImage key={key} source={{ uri: value }} />;
          }
          if (key.includes('video')) {
            console.log(parameters.screenWidth);
            const src = value.replace('500', '100%').replace('281', '100%');
            return (
              <WebView
                style={{
                  alignSelf: 'center',
                  width: parameters.screenWidth * 0.97,
                  height: parameters.screenHeight * 0.4,
                  marginTop: parameters.screenHeight * 0.02,
                }}
                key={key}
                source={{ html: src }}
                javaScriptEnabled
              />
            );
          }
          if (key.includes('twitter')) {
            console.log('twitter', value);
            const JS =
              '<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>';
            const source = JS + value;

            return (
              <WebView
                style={{
                  backgroundColor: 'transparent',
                  height: parameters.screenHeight * 0.4,
                }}
                key={key}
                source={{ html: source }}
                javaScriptEnabled
              />
            );
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
