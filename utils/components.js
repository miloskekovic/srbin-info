import styled from 'styled-components';
import * as parameters from './parameters';

const { articleHeight, fontSize } = parameters;

export const View = styled.View`
  flex: 1;
  margin: ${parameters.screenWidth * 0.01}px;
`;

export const LoadingView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ecf0f1;
`;

export const ArticleTitle = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${articleHeight * 0.2}px;
  font-size: ${fontSize}px;
  font-weight: bold;
  color: #ffa500;
`;

export const Image = styled.Image.attrs((props) => ({
  height: props.height || articleHeight,
  width: props.width || '100%',
}))`
  left: 0;
  right: 0;
`;

export const ArticleImage = styled.Image`
  height: ${articleHeight * 0.3}px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const ArticleDescription = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${articleHeight * 0.4}px;
  font-size: ${fontSize}px;
  text-align: justify;
`;

export const ArticleButton = styled.TouchableOpacity`
  width: 95%;
  margin-top: ${articleHeight * 0.01}px;
  margin-left: auto;
  margin-right: auto;
  height: ${articleHeight * 0.075}px;
  background-color: ${parameters.color4};
  color: red;
`;

export const ArticleButtonText = styled.Text`
  color: black;
  font-weight: bold;
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: ${fontSize * 1}px;
`;

export const CategoryButton = styled.TouchableOpacity`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  height: ${articleHeight * 0.1}px;
  background-color: ${parameters.color4};
  color: red;
`;

export const CategoryButtonText = styled.Text`
  font-size: 16px;
  text-decoration-line: 'underline';
`;

export const EntireArticle = styled.View.attrs((props) => ({
  height: props.height || articleHeight,
}))`
  background-color: ${parameters.color3};
  border-color: black;
  border-width: 2px;
  align-self: center;
  width: ${parameters.screenWidth / 2 - parameters.screenWidth * 0.02}px;
`;

export const OpenedArticleTitle = styled.Text`
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3%;
    font-size: ${fontSize * 1.5}px;
    color: ${parameters.color3}
    text-align: justify;
`;

export const OpenedArticlePublishedAt = styled.Text`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  font-size: ${fontSize * 3.0}px;
  color: #8b0000;
`;

export const OpenedArticleImage = styled.Image`
  height: ${parameters.screenHeight * 0.25}px;
  width: ${parameters.screenWidth * 0.95}px;
  align-self: center;
  margin-top: ${parameters.screenHeight * 0.02}px;
`;

export const OpenedArticleContent = styled.Text`
  width: ${parameters.screenWidth * 0.95}px;
  align-self: center;
  margin-top: ${parameters.screenHeight * 0.02}px;
  font-size: ${fontSize}px;
`;

export const OpenedArticleButton = styled.TouchableOpacity`
  width: ${parameters.screenWidth * 0.95}px;
  margin-vertical: ${parameters.screenHeight * 0.02}px;
  height: ${articleHeight * 0.1}px;
  background-color: ${parameters.color3};
  align-self: center;
`;

export const OpenedArticleButtonText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: ${fontSize * 1.5}px;
  align-self: center
  margin-top: auto;
  margin-bottom: auto;
  `;

export const OpenedEntireArticle = styled.View`
  width: ${parameters.screenWidth}px;
`;
