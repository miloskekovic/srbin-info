import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Dimensions, Alert } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import * as parameters from '../utils/parameters';
import {
  EntireArticle,
  ArticleTitle,
  ArticleImage,
  ArticleDescription,
  ArticleButton,
  ArticleButtonText,
} from '../utils/components';

const screenWidth = Dimensions.get('window').width;

const { mainPartOfURL } = parameters;
const { apiKey } = parameters;

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

const Search = () => {
  const [news, setNews] = useState({});
  const [term, setTerm] = useState('');
  const [newsByCountryAndCriteria, setNewsByCountryAndCriteria] = useState([]);
  const navigation = useNavigation();

  const searchByTerm = () => {
    const result = [];
    if (term !== '') {
      news.forEach((article) => {
        const { title } = article;
        const { urlToImage } = article;
        const { description } = article;
        const { content } = article;
        if (
          title.includes(term) ||
          (description != null && description.includes(term)) ||
          (content != null && content.includes(term))
        ) {
          result.push({
            title,
            urlToImage,
            description,
            content,
          });
        }
      });
    }
    setNewsByCountryAndCriteria(result);
  };

  const fetchDataFromURL = () => {
    const result = {};
    parameters.availableCountries.forEach((abc) => {
      const ct = abc.value;
      result[ct] = [];
      const secondPartOfUrl = 'country='.concat(ct).concat('&').concat('apiKey=').concat(apiKey);
      const newUrl = mainPartOfURL.concat(secondPartOfUrl);
      fetch(newUrl, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => responseJson.articles)
        .then((articles) => {
          articles.forEach((article) => {
            result[ct].push({
              title: article.title,
              urlToImage: article.urlToImage,
              description: article.description,
              content: article.content,
            });
          });
        })
        .catch((error) => {
          showError(error);
        });
    });
    setNews(result);
  };

  useEffect(() => {
    fetchDataFromURL();
  }, []);

  useEffect(() => {
    searchByTerm();
  }, [term]);

  return (
    <View style={{ flex: 1, padding: '5%' }}>
      <Text style={{ fontSize: 16, marginTop: '2.5%' }}>{'\u2022'} Search top news by term:</Text>
      <TextInput
        style={{
          width: screenWidth * 0.8,
          height: 40,
          borderColor: 'black',
          alignSelf: 'center',
          marginTop: '2.5%',
          borderWidth: 1,
          backgroundColor: 'lightgrey',
        }}
        placeholder="Search term..."
        onChangeText={(text) => setTerm(text)}
      />
      <FlatGrid
        itemDimension={screenWidth * 0.33}
        data={newsByCountryAndCriteria}
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
};

export default Search;
