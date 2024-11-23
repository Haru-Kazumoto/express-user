const express = require('express');
const app = express();
const PORT = 9000;

const {logger} = require('./middleware/log.middleware');

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


// mengambil semua data
app.get('/users', (request, response) => {
    response.status(200).json(users);
});

// mengambil data dari id
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

// mengambil data dari property name
app.get('/user/:name', function(request, response) { 
    const user = users.find(data => data.name === request.params.name);

    if(user) {
        response.json(user);
    } else {
        response.status(400).json(
            {
                pesan: "Data tidak ditemukan"
            }
        );
    }
});

app.post('/user/post', function(request, response) {
    // membuat data baru
    const newData = {
        id: users.length + 1, 
        name: request.body.name,
        age: request.body.age
    };

    // ambil kumpulan data, lalu kita masukan data baru
    // atau push newData ke users
    users.push(newData);

    //kembalikan data yang sudah jadi
    response.status(200).json(newData);
});