const fs = require('fs');
require('dotenv').config();

const dir = process.env.UPLOAD_DIR;

exports.uploadQuestion = async (req, res) => {
    res.json({msg:'upload success', file:req.file});
}
exports.uploadAnswer = async (req, res) => {
    res.json({msg:'upload success', file:req.file});
}
exports.uploadKeypoint = async (req, res) => {
    res.json({msg:'upload success', file:req.file});
}
exports.deleteQuestion = async (req, res) => {
    const { name } = req.params;
    try {
        fs.unlinkSync(dir+'/questions/'+name);
        res.json({msg: 'delete success'});
    } catch (error) {
        if(err.code == 'ENOENT'){
            console.log("파일 삭제 Error 발생");
            res.json({msg: 'delete failed'});
        }
    }
}
exports.deleteAnswer = async (req, res) => {
    const { name } = req.params;
    try {
        fs.unlinkSync(dir+'/answers/'+name);
        res.json({msg: 'delete success'});
    } catch (error) {
        if(err.code == 'ENOENT'){
            console.log("파일 삭제 Error 발생");
            res.json({msg: 'delete failed'});
        }
    }
}
exports.deleteKeypoint = async (req, res) => {
    const { name } = req.params;
    try {
        fs.unlinkSync(dir+'/keypoints/'+name);
        res.json({msg: 'delete success'});
    } catch (error) {
        if(err.code == 'ENOENT'){
            console.log("파일 삭제 Error 발생");
            res.json({msg: 'delete failed'});
        }
    }
}