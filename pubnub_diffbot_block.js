export default request => {
    let xhr = require('xhr');
    let query = require('codec/query_string');

    let clientToken = '0ceea56cce6389791434273de90c295b';
    let apiUrl = 'https://api.diffbot.com/v3/analyze';

    let queryParams = {
        token: clientToken,
        url: request.message.url
    };

    let url = apiUrl + '?' + query.stringify(queryParams);

    return xhr.fetch(url)
        .then((response) => {
            let json = JSON.parse(response.body);
            request.message.diffbotResponse = json;
            return request.ok();
        })
        .catch((err) => {
            console.log('error happened for XHR.fetch', err);
            return request.ok();
        });
};