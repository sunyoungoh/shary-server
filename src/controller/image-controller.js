var Image = require('../models/image');
var User = require('../models/user');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'uploads/')
    },
    filename: function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now())
    }
  });
var upload=  multer({storage:storage})

var uploadImg = (req,res)=>{
    console.log("업로드 이미지");
    let user_id = req.user._id;
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc

    User.findByIdAndUpdate(user_id,{'$set':{profileImg: newImage}}, { 'upsert': true, 'new': true },(err,result)=>{
      if(err){
        return res.status(400).json({ 'msg': err });
      }
      return res.json({'success': true});
    })


}
var getProfile = (req,res)=>{
    let user_id = req.params.id;
    User.findById(user_id,{profile_img:1},(err,user)=>{
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        if(user.profile_img == null ||user.profile_img == ''){
            return;
        }
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join('uploads', user.profile_img.filename)).pipe(res);
    })
}


module.exports.uploadImg = uploadImg;
module.exports.upload = upload;
module.exports.getProfile = getProfile;