import React, { useState, useEffect } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
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
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation();
  I18n.locale = 'de_de';
  const categories = [
    { label: I18n.t('breaking_news'), value: 'udarnavest', hidden: true },
    { label: I18n.t('daily_news'), value: 'vestidana' },
    { label: I18n.t('actual'), value: 'aktuelno' },
    { label: I18n.t('video'), value: 'video' },
  ];

  function showError(error) {
    Alert.alert(
      'Alert Title',
      error,
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

  const fetchDataFromURL = () => {
    const news = [];
    const url =
      selectedCategory === '' ? mainPartOfURL : parameters.categories.pocetna[selectedCategory];
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => responseJson.articles)
      .then((articles) => {
        articles.forEach((article) => {
          news.push({
            title: article.title,
            urlToImage: article.urlToImage,
            description: article.description == null ? '' : article.description,
            publishedAt: article.publishedAt == null ? '' : article.publishedAt,
            content: article.content == null ? '' : article.content,
          });
        });
      })
      .then(() => {
        setItems(news);
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
        data={items}
        renderItem={({ item }) => (
          <EntireArticle>
            <ArticleTitle>{item.title}</ArticleTitle>
            <ArticleImage source={{ uri: item.urlToImage }} />
            <ArticleDescription>{item.description}</ArticleDescription>
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
