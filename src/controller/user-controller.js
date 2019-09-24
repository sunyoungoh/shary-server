const User = require('../models/user');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config()

function createToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.jwtSecret, {
        expiresIn: 60 * 60 // 86400 expires in 24 hours
    });
}


exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            'msg': 'You need to send email and password'
        });
    }

    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }

        if (user) {
            return res.status(400).json({
                'msg': '이미 존재하는 아이디입니다.'
            });
        }

        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    'msg': err
                });
            }
            return res.status(201).json(user);
        });
    });
};

exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            'msg': 'You need to send email and password'
        });
    }

    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return res.status(400).send({
                'msg': err
            });
        }

        if (!user) {
            return res.status(400).json({
                'msg': '존재하지 않는 이메일입니다.'
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                console.log(req.body.email);
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({
                    'msg': '이메일과 비밀번호가 일치하지 않습니다.'
                });
            }
        });
    });
};


exports.updateUser = (req, res) => {
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, {
        $set: req.body
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            'msg': '닉네임변경 성공',
            'result': user
        });
    });
}

exports.getLike = (req, res) => {
    console.log('#### 좋아요 확인할 리뷰 id : ', req.params.id);
    User.findOne({
        _id: req.user._id,
        like: req.params.id
    }, function (err, result) {
        console.log(result);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!result) {
            return res.json({
                like: false
            });
        }
        if (result) {
            return res.status(200).json({
                like: true
            });
        }
    });
}


exports.addLike = (req, res) => {
    console.log('좋아요 누른 리뷰', req.body.like);
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $addToSet: {
            like: req.body.like
        }
    }, {
        new: true,
        safe: true,
        upsert: true
    }, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "Failed",
                message: "Database Error",
                data: error
            })
        }
        return res.status(201).json({
            status: "Success",
            message: "좋아요 등록 완료!",
            data: result
        })
    })
}


// 리뷰 삭제
exports.deleteLike = (req, res) => {
    console.log('좋아요 취소할 리뷰', req.params.id);
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $pull: {
            like: req.params.id
        }
    }, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "Failed",
                message: "Database Error",
                data: error
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "좋아요 취소 완료!",
            data: result
        })
    })
}


exports.getMyProfile = (req, res) => {

    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!user) {
            return res.status(404).json({
                error: 'user not found'
            });
        }
        if (user) {
            let filterUser = {
                email: user.email,
                nickname: user.nickname
            }
            return res.status(200).json(filterUser);
        }
    });
}

exports.getProfile = (req, res) => {
    console.log("getProfile");
    let user_id = req.params.id;
    User.findById(user_id, {
        profileImg: 1
    }, (err, user) => {

        if (err) {
            return res.status(400).send({
                'msg': err
            });
        }
        if (user.profileImg == null || user.profileImg == '') {
            return;
        }
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join('uploads', user.profileImg.filename)).on('error', (err) => res.status(400).send({
            'msg': err
        })).pipe(res)



    })

}