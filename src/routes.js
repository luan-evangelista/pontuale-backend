const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./auth');

const routes = express.Router();


routes.post('/authenticate', (req, res) => {
    const { email, password } = req.body;

    const user = [{
        id: 1,
        name: 'Luan Evangelista Vieira',
        email: 'luan@pontua.com.br',
        company: 'Pontua',
        password: '123456'
    }];

    const users = user.find(users => users.email === email && users.password === password);
    if (users) {
        return res.status(200).json({
            user,
            token: jwt.sign({user : user}, 'PRIVATEKEY'),
        });
    }
    
    return res.status(401).json({ message: 'Email ou Senha Incorreta' });
});


routes.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = [{
        id: 1,
        name: 'Luan Evangelista Vieira',
        email: 'luan@pontua.com.br',
        company: 'Pontua',
        password: '123456'
    }];

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        return res.status(200).json({
            user,
            token: jwt.sign({user : user}, 'PRIVATEKEY'),
        });
    }

    return res.status(401).json({ message: 'Acesso inválido' });
});

// Private route

routes.use(authMiddleware);

routes.get('/users', async (req, res) => {
    return res.json([
        {
            id: 1,
            name: 'Luan Evangelista',
            email: 'luan@pontua.com.br',
        },
        {
            id: 2,
            name: 'Douglas',
            email: 'douglas@pontua.com.br',
        },
        {
            id: 3,
            name: 'Sebastião',
            email: 'sebastião@pontua.com.br',
        },
        {
            id: 4,
            name: 'Gigo',
            email: 'gigo@pontua.com.br',
        }
    ]);
});


module.exports = routes;
