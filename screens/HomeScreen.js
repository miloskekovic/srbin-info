import React, { useState, useEffect } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import { Html5Entities } from 'html-entities';
import {
  EntireArticle,
  ArticleTitle,
  ArticleImage,
  ArticleDescription,
  ArticleButton,
  ArticleButtonText,
} from '../utils/components';
import I18n from '../i18n';
import * as parameters from '../utils/parameters';

const { mainPartOfURL } = parameters;
const screenWidth = Dimensions.get('window').width;

function HomeScreen() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('udarnaVest');
  const navigation = useNavigation();
  I18n.locale = 'de_de';
  const categories = [
    { label: I18n.t('breaking_news'), value: 'udarnaVest', hidden: true },
    { label: I18n.t('daily_news'), value: 'vestiDana' },
    { label: I18n.t('actual'), value: 'aktuelno' },
    { label: I18n.t('video'), value: 'video' },
  ];

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
    const newArticle = {};

    const titlePattern = ' title="';
    const datePattern = '<time class="entry-date updated srbin-module-date">';
    const contentPattern = '<p>';
    const imagePattern = 'background-image:url(';
    const urlPattern = '<a href="';

    const partOfTitle = article.slice(
      article.indexOf(titlePattern) + titlePattern.length,
      article.length,
    );
    const title = partOfTitle.slice(0, partOfTitle.indexOf('">'));

    const date = article.slice(
      article.indexOf(datePattern) + datePattern.length,
      article.indexOf('</time>'),
    );
    const content = article.slice(
      article.indexOf(contentPattern) + contentPattern.length,
      article.indexOf('</p>'),
    );
    const image = article.slice(
      article.indexOf(imagePattern) + imagePattern.length,
      article.indexOf(');'),
    );
    const url = article.slice(
      article.indexOf(urlPattern) + urlPattern.length,
      article.indexOf('" '),
    );

    newArticle.title = title;
    const newDate = date.replace(/&nbsp;/g, ' ');
    newArticle.date = newDate;
    newArticle.content = entities.decode(content);
    newArticle.image = image;
    newArticle.url = url;
    return newArticle;
  }

  const fetchDataFromURL = () => {
    const result = [];
    // https://srbin.info/category/pocetna/udarnavest/
    const url =
      selectedCategory === '' ? mainPartOfURL : parameters.categories.pocetna[selectedCategory];
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.text())
      .then((responseJson) => {
        const textRows = responseJson
          .substring(
            0,
            responseJson.indexOf('<nav class="navigation pagination" role="navigation">'),
          )
          .split('\n');
        for (let i = 0; i < textRows.length; i += 1) {
          if (textRows[i] === '<div class="srbin-module-thumb">') {
            let article = '';
            do {
              article = article.concat(textRows[i]);
              i += 1;
            } while (
              textRows[i] !== '<div class="srbin-module-thumb">' &&
              textRows[i] !== '<div class="paginatebottom">'
            );
            i -= 1;
            result.push(extractPartsOfArticle(article));
          }
        }
        return result;
      })
      .then((articles) => {
        articles.forEach((article) => {
          console.log('title:', article.title);
          console.log('date:', article.date == null ? '' : article.date);
          console.log('content:', article.content == null ? '' : article.content);
          console.log('image:', article.image);
          console.log('url:', article.url);
        });
      })
      .then(() => {
        setNews(result);
      })
      .catch((error) => {
        showError(error);
      });
  };
  useEffect(() => {
    fetchDataFromURL();
  }, [selectedCategory]);
  return (
    <View style={{ flex: 1, marginVertical: parameters.screenWidth * 0.03 }}>
      <DropDownPicker
        items={categories}
        defaultValue={categories[0].value}
        containerStyle={{ height: 40 }}
        style={{
          backgroundColor: 'silver',
          borderColor: 'black',
          marginHorizontal: parameters.screenWidth * 0.03,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{
          backgroundColor: '#fafafa',
          width: parameters.screenWidth * 0.94,
          alignSelf: 'center',
        }}
        onChangeItem={(item) => setSelectedCategory(item.value)}
      />
      <FlatGrid
        itemDimension={screenWidth * 0.33}
        style={{ marginTop: 10, flex: 1 }}
        data={news}
        renderItem={({ item }) => (
          <EntireArticle>
            <ArticleTitle>{item.title}</ArticleTitle>
            <ArticleImage source={{ uri: item.image }} />
            <ArticleDescription>{item.content}</ArticleDescription>
            <ArticleButton
              onPress={() =>
                navigation.navigate('OneNews', {
                  openedNews: item,
                })
              }>
              <ArticleButtonText>{'More >>'}</ArticleButtonText>
            </ArticleButton>
          </EntireArticle>
        )}
      />
    </View>
  );
}

export default HomeScreen;
