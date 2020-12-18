import I18n, {getLanguages} from 'react-native-i18n';

import sr_Cyrl_RS from "./languages/sr-Cyrl-RS";
import sr_Latn_RS from "./languages/sr-Latn-RS";
import en_us from "./languages/en-us";
import de_de from "./languages/de-de";

I18n.fallbacks = true;

I18n.translations = {
    sr_Cyrl_RS,
    sr_Latn_RS,
    en_us,
    de_de,
};

getLanguages()
    .then((languages) => {
        console.log('getLanguages', languages);
    })
    .catch((error) => {
        console.log('getLanguages error: ', error);
    })

export default I18n;