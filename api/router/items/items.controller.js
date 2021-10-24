const Joi = require('joi');
const Item = require('../../models/items');
const { Types: { ObjectId } } = require('mongoose');

exports.Register = async (req, res) => { // 아이템 등록
    console.log(req.body);
    const schema = Joi.object().keys({
        category: Joi.object().keys({
            main: Joi.array(),
            middle: Joi.array(),
            sub: Joi.array(),
            difficulty: Joi.string().min(1).max(1)
        }),
        describtion: Joi.object().keys({
            previous : Joi.string().min(4).max(4),
            question : Joi.string().required(),
            answer : Joi.string().required(),
            keypoint : Joi.string().required()
        })
    })

    const result = schema.validate(req.body); // 스키마 유효성 검사
    
    if(result.error) { //스키마 유효성 검사 실패
        console.log("ERR:params");
        res.status(400).end();
        return;
    }

    let item = null; // 데이터 저장
    try {
        item = await Item.Register(req.body);
    } catch (e) {
        console.log("ERR:register");
        console.log(e);
        res.status(500).json({msg: '[err]' + e.message});
        return;
    }

    res.status(200)
    .json({msg: 'success'});
}

exports.getAll = async (req, res) => { // 아이템 전부 검색
    let items;

    try {
        items = await Item.find().exec()
    } catch (e) {
        res.status(500).end();
        return;
    }

    res.status(200).json(items);
    return;
}

// 카테고리 별 검색
exports.getCategory = async (req, res) => {
    let items;

    try {
        items = await Item.findByCategory(req.params);
    }catch (e) {
        console.log(e);
        res.status(500).end();
        return;
    }

    res.status(200).json(items);

    return;
}

// 아이템 수정
exports.update = async (req, res) => {
    const { id } = req.params;

    if(!ObjectId.isValid(id)) {
        res.status(400).end(); // Bad Request
        return;
    }

    let item;

    try {
        item = await Item.findByIdAndUpdate(id, req.body, {
            new: true
        })
    } catch (e){
        res.status(500).end();
        return;
    }

    res.status(200).json(item);
    
    return;
}

// 아이템 삭제
exports.delete = async (req, res) => {
    const { id } = req.params; // URL 파라미터에서 id 값을 읽어옵니다.

    try {
        await Item.findByIdAndRemove(id).exec();
    } catch (e) {
        if(e.name === 'CastError') {
            res.status(400).end();
            return;
        }
    }

    res.status(204).end(); // No Content
    return;
};