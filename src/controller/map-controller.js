const request = require('request');
const dotenv = require('dotenv').config()

var map = {
    getMap: (req, res) => {
        const option = {
            query  : req.query.name,
            coordinate: req.query.coordinate
        }
        console.log('request query = ' + req.query.query);
        console.log('request coordinate = ' + req.query.coordinate);
        request.get({
            uri:'https://naveropenapi.apigw.ntruss.com/map-place/v1/search', //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
            qs :option,
            headers:{
              'X-NCP-APIGW-API-KEY-ID':process.env.NAVER_CLIENT_ID,
              'X-NCP-APIGW-API-KEY':process.env.NAVER_CLIENT_SECRET
            }
          }, function(err, response, body) {
            console.log(body);
            res.send(body);
          });
    }
}

module.exports = map;