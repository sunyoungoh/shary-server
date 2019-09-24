var express = require('express'),
    routes = express.Router();
var passport = require('passport');

const KakaoStrategy = require("passport-kakao").Strategy;

const kakaoKey = {
    clientID: "9e4ff89c213d34be116b6915b6e7c10b",
    clientSecret: "",
    callbackURL: "http://localhost:5000/api/auth/kakao/callback"
};


passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    })
);


routes.get("/kakao", passport.authenticate("kakao-login"));
routes.get(
    "/kakao/callback",
    passport.authenticate("kakao-login", {
        successRedirect: "/",
        failureRedirect: "/api/auth/fail"
    })
);


module.exports = routes;