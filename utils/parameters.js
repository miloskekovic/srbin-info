import { Dimensions } from 'react-native';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const mainPartOfURL = 'https://srbin.info/';
export const apiKey = 'fc436c186efa4228a7d7a6e3a4dc4072';
export const color1 = '#59426D';
export const color2 = '#5A538A';
export const color3 = '#4977AD';
export const color4 = '#4C99CF';
export const color5 = '#40C8C4';

function viewRem() {
  if (screenWidth > 400) {
    return screenHeight * 0.5;
  }
  if (screenWidth > 250) {
    return screenHeight * 0.6;
  }
  return screenHeight * 0.6;
}

export const articleHeight = viewRem();

function fontRem() {
  if (screenWidth > 400) {
    return 18;
  }
  if (screenWidth > 250) {
    return 14;
  }
  return 10;
}

export const fontSize = fontRem();
export const fontSmall = fontSize * 0.75;
export const fontMedium = fontSize;
export const fontLarge = fontSize * 1.25;

export const categories = {
  pocetna: {
    pocetna: mainPartOfURL,
    udarnaVest: mainPartOfURL.concat('category/pocetna/udarnavest/'),
    vestiDana: mainPartOfURL.concat('category/pocetna/vestidana/'),
    aktuelno: mainPartOfURL.concat('category/pocetna/aktuelno/'),
    video: mainPartOfURL.concat('category/video/'),
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
