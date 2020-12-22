import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, ScrollView, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import * as parameters from '../utils/parameters';
import {
  EntireArticle,
  ArticleTitle,
  ArticleImage,
  ArticleDescription,
  ArticleButton,
  ArticleButtonText,
  CategoryButton,
  CategoryButtonText,
  LoadingView,
} from '../utils/components';

const { categories } = parameters;
const screenWidth = Dimensions.get('window').width;

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

async function fetchFunction(categoryUrl) {
  const newArray = [];
  try {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    data.articles.forEach((article) => {
      newArray.push({
        title: article.title,
        urlToImage: article.urlToImage,
        description: article.description == null ? '' : article.description,
        content: article.content == null ? '' : article.content,
      });
    });
  } catch (error) {
    showError(error);
  }
  return newArray;
}

const Categories = () => {
  const [newsByCategories, setNewsByCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [carouselVisibilities, setCarouselVisibilities] = useState({
    entertainment: false,
    general: false,
    health: false,
    science: false,
    sports: false,
    technology: false,
  });
  const navigation = useNavigation();

  async function fetchDataFromURL() {
    const allArticles = {};
    const categs = Object.keys(categories);
    categs.forEach((category) => {
      const subCategs = Object.keys(category);
      allArticles[category] = {};
      Object.entries(subCategs).forEach((key, value) => {
        // console.log(`${key}: ${value}`);
        const subcategory = key;
        allArticles[category][subcategory] = [];
        const subcategoryUrl = `${value}`;
        // const result = await fetchFunction(subcategoryUrl);
        allArticles[category][subcategory].push(fetchFunction(subcategoryUrl));
      });
    });
    Promise.all(allArticles).then((results) => {
      setNewsByCategories(results);
      setLoading(false);
    });
  }

  function renderItemFunction({ item }) {
    // console.log(newsByCountries[selectedCountry]['entertainment'])
    return (
      <View style={{ backgroundColor: '#547980' }}>
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
      </View>
    );
  }

  function showCarouselForCategory(category) {
    if (carouselVisibilities[category] === true) {
      return (
        <Carousel
          // ref={(c) => setCarousel1(c)}
          data={newsByCategories[category]}
          renderItem={renderItemFunction}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.33}
          containerCustomStyle={{ marginTop: '5%', marginBottom: '5%' }}
          inactiveSlideShift={0}
          // onSnapToItem={(index) => setEntertainmentIndex({ index })}
          useScrollView
        />
      );
    }
    return null;
  }

  function onCategoryClick(category) {
    const modifiedVisibilities = carouselVisibilities;
    if (carouselVisibilities[category] === false) {
      modifiedVisibilities[category] = true;
    } else {
      modifiedVisibilities[category] = false;
    }
    setCarouselVisibilities(modifiedVisibilities);
  }

  useEffect(() => {
    fetchDataFromURL();
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
      <Text style={{ fontSize: 16 }}>{'\u2022'} Top 5 news by categories</Text>
      <CategoryButton onPress={() => onCategoryClick(categories[0])}>
        <CategoryButtonText>{'\u2022'} Entertainment</CategoryButtonText>
      </CategoryButton>
      {showCarouselForCategory(categories[0])}
      <CategoryButton onPress={() => onCategoryClick(categories[1])}>
        <CategoryButtonText>{'\u2022'} General</CategoryButtonText>
      </CategoryButton>
      {showCarouselForCategory(categories[1])}
      <CategoryButton onPress={() => onCategoryClick(categories[2])}>
        <CategoryButtonText>{'\u2022'} Health</CategoryButtonText>
      </CategoryButton>
      {showCarouselForCategory(categories[2])}
      <CategoryButton onPress={() => onCategoryClick(categories[3])}>
        <CategoryButtonText>{'\u2022'} Science</CategoryButtonText>
      </CategoryButton>
      {showCarouselForCategory(categories[3])}
      <CategoryButton onPress={() => onCategoryClick(categories[4])}>
        <CategoryButtonText>{'\u2022'} Sport</CategoryButtonText>
      </CategoryButton>
      {showCarouselForCategory(categories[4])}
      <CategoryButton onPress={() => onCategoryClick(categories[5])}>
        <CategoryButtonText>{'\u2022'} Technology</CategoryButtonText>
      </CategoryButton>
      {showCarouselForCategory(categories[5])}
    </ScrollView>
  );
};

export default Categories;
