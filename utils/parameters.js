import { Dimensions } from 'react-native';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const mainPartOfURL = 'https://srbin.info/';
export const apiKey = 'fc436c186efa4228a7d7a6e3a4dc4072';

export const categories = {
  pocetna: {
    pocetna: 'mainPartOfURL',
    udarnaVest: 'mainPartOfURL'.concat('category/pocetna/udarnavest/'),
    vestiDana: 'mainPartOfURL'.concat('category/pocetna/vestidana/'),
    aktuelno: 'mainPartOfURL'.concat('category/pocetna/aktuelno/'),
    video: 'mainPartOfURL'.concat('category/video/'),
  },
  srbija: {
    srbija: 'mainPartOfURL'.concat('category/srbija/'),
    politika: 'mainPartOfURL'.concat('category/politika/'),
    drustvo: 'mainPartOfURL'.concat('category/drustvo/'),
    ekonomija: 'mainPartOfURL'.concat('category/ekonomija/'),
    kultura: 'mainPartOfURL'.concat('category/kultura/'),
    zanimljivosti: 'mainPartOfURL'.concat('category/drustvo/zanimljivosti/'),
  },
  svet: {
    svet: 'mainPartOfURL'.concat('category/svet/'),
    sloveni: 'mainPartOfURL'.concat('category/svet/sloveni-svet/'),
    region: 'mainPartOfURL'.concat('category/svet/region/'),
  },
  pravoslavlje: {
    pravoslavlje: 'mainPartOfURL'.concat('category/pravoslavlje/'),
  },
  misljenje: {
    misljenje: 'mainPartOfURL'.concat('category/pocetna/misljenje/'),
    analize: 'mainPartOfURL'.concat('category/pocetna/misljenje/analize/'),
    intervjui: 'mainPartOfURL'.concat('category/pocetna/intervju/'),
  },
  sport: {
    sport: 'mainPartOfURL'.concat('category/sport/'),
  },
  istorija: {
    istorija: 'mainPartOfURL'.concat('category/istorija/'),
    srpskaIstorija: 'mainPartOfURL'.concat('category/istorija/srpska-istorija/'),
    stradalnik: 'mainPartOfURL'.concat('category/istorija/stradalnik-istorija/'),
    svetskaIstorija: 'mainPartOfURL'.concat('category/istorija/svetska-istorija/'),
  },
};

export function fontSizer() {
  if (screenWidth > 400) {
    return 18;
  }
  if (screenWidth > 250) {
    return 14;
  }
  return 12;
}

export function articleHeight() {
  if (screenWidth > 400) {
    return 18;
  }
  if (screenWidth > 250) {
    return 14;
  }
  return 12;
}
