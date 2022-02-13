const express = require('express');

const app = express();

app.all('*', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader("Access-control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
})

app.get('/user/getUser', (request, response) => {
    console.log('收到消息' + request);
    const data = {
        user: 'test',
        password: '123'
    }
    response.send(JSON.stringify(data))
})

app.post('/user/getUser', (request, response) => {
    console.log('收到消息' + request);
    const data = {
        user: 'test',
        password: '123'
    }
    console.log(request)
    response.send(JSON.stringify(data))
})

app.listen(8080, () => {
    console.log('服务器8080已启动');
})