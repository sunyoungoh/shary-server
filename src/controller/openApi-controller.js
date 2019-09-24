var request = require('request');
var config = require('../config/config');

// 책 데이터 가져오기
exports.getBookData = (req, res) => {
    console.log(req.params.term);
    var api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(req.params.term); // json 결과
    var options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': config.client_id,
            'X-Naver-Client-Secret': config.client_secret
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).send(body);
        } else {
            res.status(response).end();
            console.log('error = ' + response.statusCode);
        }
    });
}


// 음악 데이터 가져오기
exports.getMusicData = (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://itunes.apple.com/search',
        qs: {
            term: req.params.term,
            meida: 'music',
            country: 'kr'
        }
    }

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).send(body);
        } else {
            res.status(response).end();
            console.log('error = ' + response.statusCode);
        }
    });
}

//movie api 검색 내용 불러오기
exports.getMovieData = (req, res) => {

    var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        qs:
        {
            language: 'ko-kr',
            api_key: config.MOVIE_KEY,
            query: req.params.title
        }
    };
    console.log(options)

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        return res.status(200).send(body);
    });

}
//movie api 출현진 불러오기 
exports.getCredits = (req, res) => {
    console.log('영화id',req.params.id)
    var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + req.params.id+'/credits',
        qs:
        {
            api_key: config.MOVIE_KEY,
            language: 'ko-kr'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        return res.status(200).send(body);
    });

}

//Tv api 검색 내용
exports.getTvData = (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/tv',
        qs:
        {
            language: 'ko-kr',
            api_key: config.MOVIE_KEY,
            query: req.params.title
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        return res.status(200).send(body);
    });

}

