const express = require('express');
const router = express.Router();
const routerCtrl = require('./items.controller');

router.post('/', routerCtrl.Register);
router.get('/', routerCtrl.getAll);
router.get('/:main/:middle/:sub', routerCtrl.getCategory);
router.patch('/:id', routerCtrl.update); //아이템 업데이트
router.delete('/:id', routerCtrl.delete) //아이템 삭제


module.exports = router;