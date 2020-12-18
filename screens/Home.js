import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Article, ArticleTitle, ArticleImage, ArticleDescription, ArticleButton, ArticleButtonText } from '../utils/components';
import I18n from '../i18n'
import * as parameters from '../utils/parameters'

const mainPartOfURL = parameters.mainPartOfURL;
const apiKey = parameters.apiKey;
const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(screenWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

function Home (){
  const [country, setCountry] = useState('gb');
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  I18n.locale = 'de_de';
  const typesOfNews=[
      {label: I18n.t('home_page'), value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
      {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
      {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
  ];

  const fetchDataFromURL = (value) => {
    const news = [];
      console.log(`You choosed ${value}`);
      console.log('Širina zaslona:', screenWidth);
      let searchCriteria = 'country='.concat(value).concat('&').concat('apiKey=').concat(apiKey);
      let newUrl = mainPartOfURL.concat(searchCriteria)
      fetch(newUrl, {
             method: 'GET'
          })
          .then((response) => response.json())
          .then((responseJson) => responseJson.articles)
          .then((articles) => {
            articles.map(article => {
              news.push({
                title: article.title,
                urlToImage: article.urlToImage,
                description: article.description == null ? '' : article.description,
                publishedAt: article.publishedAt == null ? '' : article.publishedAt,
                content: article.content == null ? '' : article.content,
              })
            })
          })
          .then(()=>{
            setItems(news)
          })
          .catch((error) => {
             console.error(error);
          });
  }
  useEffect(() => {
    console.log('Effect triggered')
    fetchDataFromURL(country)
  }, [])
  return (
    <View style={{padding: '1%', flex: 1,}}>
        <DropDownPicker
          items={typesOfNews}
          defaultValue={typesOfNews[0].value}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.setState({
              country: item.value
          })}
        />
        <FlatGrid
          itemDimension={screenWidth * 0.33}
          data={items}
          renderItem={({ item }) => (
            <Article>
              <ArticleTitle>{item.title}</ArticleTitle>
              <ArticleImage source={{uri: item.urlToImage}} />
              <ArticleDescription>{item.description}</ArticleDescription>
              <ArticleButton onPress={() => navigation.navigate('OneNews', {selectedCountry: country, openedNews: item})}>
                <ArticleButtonText>{'More >>'}</ArticleButtonText>
              </ArticleButton>
            </Article>
          )}
        />
      </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      padding: 2,
      flex: 1,
    },
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-start',
      borderRadius: 5,
      padding: 10,
      height: 300,
    },
    itemTitle: {
      color: '#fff',
      fontSize: 12,
      height: '20%',
      textAlign: "justify" ,
    },
    itemImage: {
      width: '100%',
      height: '40%',
      resizeMode: 'stretch',
      alignSelf: 'center'
    },
    itemDescription: {
      fontWeight: '100',
      fontSize: 12,
      color: '#fff',
      height: '30%',
    },
    more: {
      fontSize: 12,
      color: '#000',
      alignSelf: "flex-end",
    },
  });

  export default Home;