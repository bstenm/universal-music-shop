import * as yup from 'yup';

yup.setLocale({
    mixed: {
        default: 'invalid',
        required: 'required'
    },
    string: {
        // eslint-disable-next-line no-template-curly-in-string
        min: ({ min }: { min: number }) => ({ key: 'tooShort', options: { min } }),
        // eslint-disable-next-line no-template-curly-in-string
        max: ({ max }: { max: number }) => ({ key: 'tooLong', options: { max } }),
        email: 'invalidEmail'
    }
});

export const yupLocale = yup;
