import styled from 'styled-components';
import * as parameters from './parameters';

const { screenHeight } = parameters;
const { screenWidth } = parameters;
export const color1 = '#594F4F';
export const color2 = '#547980';
export const color3 = '#45ADA8';
export const color4 = '#9DE0AD';

const fontRem = screenWidth / 100;
const viewRem = screenHeight / 3;

export const View = styled.View`
  flex: 1;
  margin: ${screenWidth * 0.05}px;
`;

export const LoadingView = styled.View`
  flex: 1;
  align-items: 'center';
  justify-content: 'center';
  background-color: '#ecf0f1';
`;

export const ArticleTitle = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${viewRem * 0.25}px;
  font-size: ${fontRem * 2.5}px;
  color: yellow;
`;
export const ArticleImage = styled.Image`
  height: ${viewRem * 0.35}px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const ArticleDescription = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${viewRem * 0.25}px;
  font-size: ${fontRem * 2.2}px;
  text-align: justify;
`;

export const ArticleButton = styled.TouchableOpacity`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${viewRem * 0.1}px;
  background-color: ${color4};
  color: red;
`;

export const ArticleButtonText = styled.Text`
  color: black;
  font-weight: bold;
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: ${fontRem * 2.5}px;
`;

export const CategoryButton = styled.TouchableOpacity`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${viewRem * 0.1}px;
  background-color: ${color4};
  color: red;
`;

export const CategoryButtonText = styled.Text`
  font-size: 16px;
  text-decoration-line: 'underline';
`;

export const EntireArticle = styled.View.attrs((props) => ({
  height: props.height || viewRem,
}))`
  background-color: ${color3};
  border-color: ${color1};
  align-items: center;
  justify-content: center;
`;

export const OpenedArticleTitle = styled.Text`
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3%;
    font-size: ${fontRem * 4}px;
    color: ${color3}
    text-align: justify;
`;

export const OpenedArticlePublishedAt = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  font-size: ${fontRem * 3}px;
  color: #8b0000;
`;

export const OpenedArticleImage = styled.Image`
  height: 35%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
`;

export const OpenedArticleContent = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  font-size: ${fontRem * 3}px;
`;

export const OpenedArticleButton = styled.TouchableOpacity`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  height: 5%;
  background-color: ${color3};
`;

export const OpenedArticleButtonText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: ${fontRem * 3}px;
  align-self: center
  margin-top: auto;
  margin-bottom: auto;
  `;

export const OpenedEntireArticle = styled.View`
  height: 100%;
  margin-horizontal: 1%;
`;
