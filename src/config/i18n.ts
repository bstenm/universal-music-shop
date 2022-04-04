// TODO: production version using cdn not working
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { DEV_MODE } from 'config/constants';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const apiKey = process.env.REACT_APP_I18NEXT_API_KEY;

// eslint-disable-next-line max-len
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: DEV_MODE,
        fallbackLng: 'en',
        ns: ['default'],
        defaultNS: 'default',
        supportedLngs: ['en', 'es', 'zh'],
        backend: {
            loadPath
        }
    });

// import i18next from 'i18next';
// // Has to be placed above the other "i18next" dependencies to avoid typescript errors
// // import ChainedBackend from 'i18next-chained-backend';
// import HttpBackend from 'i18next-http-backend';
// import { DEV_MODE } from 'config/constants';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';
// // import LocalStorageBackend from 'i18next-localstorage-backend';

// const apiKey = process.env.REACT_APP_I18NEXT_API_KEY;

// // const version = 1;

// // eslint-disable-next-line max-len
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;
// // const loadPath = `https://cdn.i18nexus.com/versions/${version}/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next
//     .use(HttpBackend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         debug: DEV_MODE,
//         fallbackLng: 'en',
//         ns: ['default'],
//         defaultNS: 'default',
//         supportedLngs: ['en', 'es', 'zh'],
//         backend: {
//             loadPath
//         }
//     });
