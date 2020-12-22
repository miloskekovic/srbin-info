import I18n, { getLanguages } from 'react-native-i18n';

import srCyrlRS from './languages/sr-Cyrl-RS';
import srLatnRS from './languages/sr-Latn-RS';
import en from './languages/en-us';
import de from './languages/de-de';
import fr from './languages/fr-fr';
import it from './languages/it-it';

I18n.fallbacks = true;

I18n.translations = {
  srCyrlRS,
  srLatnRS,
  en,
  de,
  fr,
  it,
};

getLanguages()
  .then((languages) => {
    console.log('getLanguages', languages);
  })
  .catch((error) => {
    console.log('getLanguages error: ', error);
  });

export default I18n;
