const axios = require('axios')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const URL = `https://api.apilayer.com/exchangerates_data/latest?symbols=&base=SGD`

    const response = await axios.get(URL, {headers: {apiKey: 'U0pJ3hyaJ6c78eroU7OsAc2fx6Yc88mT'}})
    const {success, rates} = response.data;

    if (!success) {
        context.res = {
            status: 404,
            body: {message: 'Error'}
        };
        return;
    }

    const asianCurrenciesTop10GDPPerCapita = ['SGD', 'QAR', 'AED', 'CNY', 'BND', 'HKD', 'TWD', 'BHD', 'SAR', 'KRW']

    const filteredRates = Object.keys(rates).filter((key) => asianCurrenciesTop10GDPPerCapita.includes(key)).reduce((obj, key) => {
        return Object.assign(obj, {
            [key]: rates[key]
        });
    }, {})

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: filteredRates
    };
}