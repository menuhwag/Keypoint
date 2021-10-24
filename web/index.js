const express = require('express');
require('dotenv').config();
const app = express();

const api_url = process.env.APIURL;

console.log(api_url);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 홈페이지
app.get('/', (req, res) => {
    res.render('index');
})

// 메인 페이지
app.get('/main', (req, res) => {
    res.render('main', { api_url });
})


// 등록 페이지
app.get('/register', (req, res) => {
    res.render('register', { api_url });
})


// 수정 페이지
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', {id});
})

const port = 4000;

app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
})