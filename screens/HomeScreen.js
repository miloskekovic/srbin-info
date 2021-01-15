/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatGrid } from 'react-native-super-grid';
import { Html5Entities } from 'html-entities';
import {
  View,
  EntireArticle,
  ArticleTitle,
  ArticleImage,
  ArticleDescription,
  ArticleButton,
  ArticleButtonText,
} from '../utils/components';
import I18n from '../i18n';
import { SettingsContext } from '../SettingsContext';
import * as parameters from '../utils/parameters';

const { mainPartOfURL } = parameters;
const screenWidth = Dimensions.get('window').width;

function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('udarnaVest');
  const [language] = useContext(SettingsContext);
  I18n.locale = language;
  const categories = [
    { label: I18n.t('breaking_news'), value: 'udarnaVest' },
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
    const content =
      article.indexOf(contentPattern) === -1
        ? ''
        : article.slice(
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

    newArticle.title = entities.decode(title);
    const partOfData = date.replace(/&nbsp;/g, ' ').split('  ');
    const newDate = partOfData[1].concat(' ').concat(partOfData[0]);
    newArticle.date = newDate;
    newArticle.content = entities.decode(content).substring(0, 250).concat('...');
    newArticle.image = image;
    newArticle.url = url;
    return content === '' ? null : newArticle;
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
            const newArticle = extractPartsOfArticle(article);
            if (newArticle !== null) {
              result.push(newArticle);
            }
          }
        }
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
    <View>
      <DropDownPicker
        items={categories}
        defaultValue={categories[0].value}
        containerStyle={{
          width: parameters.screenWidth * 0.97,
          height: parameters.screenHeight * 0.06,
          alignSelf: 'center',
          marginTop: parameters.screenHeight * 0.02,
          marginBottom: parameters.screenHeight * 0.01,
        }}
        dropDownMaxHeight={parameters.screenHeight * 0.5}
        labelStyle={{
          fontSize: parameters.fontMedium,
        }}
        style={{
          backgroundColor: 'silver',
          borderColor: 'black',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{
          backgroundColor: '#fafafa',
          width: parameters.screenWidth * 0.975,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          alignSelf: 'center',
          marginTop: parameters.screenHeight * 0.001,
        }}
        onChangeItem={(item) => setSelectedCategory(item.value)}
      />
      <FlatGrid
        itemDimension={screenWidth * 0.4}
        style={{ flex: 1 }}
        data={news}
        renderItem={({ item }) => (
          <EntireArticle>
            <ArticleTitle>{item.title}</ArticleTitle>
            <ArticleImage source={{ uri: item.image }} />
            <ArticleDescription>{item.content}</ArticleDescription>
            <ArticleButton
              onPress={() =>
                navigation.navigate('Article', {
                  article: item,
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
