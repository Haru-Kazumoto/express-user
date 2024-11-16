const express = require('express');
const app = express();
const PORT = 9000;

const {logger} = require('./middleware/log.middleware');
const e = require('express');

// middleware untuk penerimaan json dari express
app.use(express.json());
app.use(logger);

app.listen(PORT, 'localhost', () => {
    console.log(`Server berjalan di port ${PORT}`);
});

app.get('/hello', (request,response) => {
    return response.send('halo dari expressjs');
});

//representasi dari database
let users = [
    { id: 1, name: 'Vikri', age: 17},
    { id: 2, name: 'Naila', age: 16},
    { id: 3, name: "Octa", age: 17},
];

app.get('/users', (request, response) => {
    response.status(200).json(users);
});

app.get('/users/:id',function(request, response) {

    const user = users.find(data => data.id === parseInt(request.params.id));

    if(user) {
        response.json(user);
    } else {
        response.status(400).json({
            pesan: "Data user tidak ditemukan",
        });
    }
});

app.post('/users', (request, response) => {
    const newUser = {
        id: users.length + 1,
        ...request.body
    };

    users.push(newUser);

    response.status(200).json(newUser);
});

// app.put('/users/:id', (request, response) => {
//     const user = users.find(
//         data => data.id === parseInt(request.params.id)
//     );

//     if(user){
//         user.name = request.body.name;
//         user.age = request.body.age;

//         response.json(user);
//     } else {
//         response.status(404).json({
//             pesan: "User tidak ditemukan"
//         });
//     }
// })