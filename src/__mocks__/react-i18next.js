module.exports = {
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (s) => s,
            i18n: {
                changeLanguage: () => new Promise(() => null)
            }
        };
    }
};
