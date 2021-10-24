const express = require('express');
const router = express.Router();
const routerCtrl = require('./images.controller');
const multer  = require('multer');
require('dotenv').config();

const dir = process.env.UPLOAD_DIR;

function fileExt (file){
    var mimeType;

    switch (file.mimetype) {
    case "image/jpeg":
        mimeType = "jpg";
        break;
    case "image/png":
        mimeType = "png";
        break;
    case "image/gif":
        mimeType = "gif";
        break;
    case "image/bmp":
        mimeType = "bmp";
        break;
    default:
        mimeType = "jpg";
        break;
    }

    return file.fieldname + '-' + Date.now() + '.' + mimeType;
}

const storage = {
    question : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir + 'questions') // 파일 업로드 경로
        },
        filename: function (req, file, cb) {
                cb(null, fileExt(file)) //파일 이름 설정
        }
    }),
    answer : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir + 'answers') // 파일 업로드 경로
        },
        filename: function (req, file, cb) {
            cb(null, fileExt(file)) //파일 이름 설정
        }
    }),
    keypoint : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir + 'keypoints') // 파일 업로드 경로
        },
        filename: function (req, file, cb) {
            cb(null, fileExt(file)) //파일 이름 설정
        }
    })
};

const upload = {
    question : multer({ storage: storage.question }),
    answer : multer({ storage: storage.answer }),
    keypoint : multer({ storage: storage.keypoint })
};

router.post('/question', upload.question.single('img_question'), routerCtrl.uploadQuestion);
router.post('/answer', upload.answer.single('img_answer'), routerCtrl.uploadAnswer);
router.post('/keypoint', upload.keypoint.single('img_keypoint'), routerCtrl.uploadKeypoint);
router.delete('/question/:name', routerCtrl.deleteQuestion);
router.delete('/answer/:name', routerCtrl.deleteAnswer);
router.delete('/keypoint/:name', routerCtrl.deleteKeypoint);

module.exports = router;