/**
 *  menginisialisasi atau memanggil express js dengan fungsi require,
 *  require adalah fungsi dari javascript ESM untuk memanggil sebuah library dari nodejs atau pun dari luar nodejs
 */ 
const express = require('express');

// variable app adalah sebuah representasi dari express, atau menyimpan fungsi fungsi dari expressjs
const app = express();

// variable ini adalah untuk kebutuhan server
const PORT = 9000;

// panggil logger atau panggil data log middleware dari file yang di tuju
// kenapa variable ini berbeda mempunyai {} di luarnya?
// ini di namakan desctructring
// Dalam konteks destructuring, kurung kurawal digunakan untuk mengekstrak nilai dari objek.
/**
 * contoh : const orang = {nama: "Naila sipit", umur: 16}
 * nah saya pengen ambil hanya nama tetapi biasannya kan cara ambilnya itu
 * orang.nama, nah desctructing itu jadi seperti
 * const {nama} = orang <- orang ini sebuah object yang tadi
 * maka 'nama' akan mengambil nilai dari orang.nama
 * 
 * jadi untuk konteks logger ini berarti mengambil fungsi langsung logger dari file middlewarenya
 */
const {logger} = require('./middleware/log.middleware');

/**
 * Mengaktifkan atau memanggil middleware json dari express, 
 * berarti express dari aplikasi kita menerima keluaran data berbentuk JSON
 */
app.use(express.json());

/**
 * mengaktifkan middleware di aplikasi dengan scope atau area GLOBAL di aplikasi ini
 */
app.use(logger);

/**
 * Mengaktifkan server express  denagn format port, domain, dan callback dari server
 */
app.listen(PORT, 'localhost', () => {
    console.log(`Server berjalan di port ${PORT}`);
});

/**
 * Ini adalah kumpulan data atau representasi dari database, 
 * nah ini kita pakai untuk data sementara namanya array.
 * Array ini mempunyai kumpulan objek di dalamnya yang biasa di panggil ARRAY OF OBJECT
 * berarti array ber isi object.
 * Object di array ini mencakup 3 field yaitu id,name, dan age
 */
let users = [
    { id: 1, name: 'Vikri', age: 17},
    { id: 2, name: 'Naila', age: 16},
    { id: 3, name: "Octa", age: 17},
];


/**
 * Ini adalah fungsi yang di gunakan untuk mengakses atau memanggil semua data dari array di atas
 * berarti fungsi ini akan mengembalikan semua data yang ada di array users
 * callback fungsi ini mempunyai pastinya dan harus ada request dan response
 */
app.get('/users', (request, response) => {
    response.status(200).json(users);
});

/**
 * Fungsi ini mempunyai parameter dari API yaitu id
 * berarti parameter ini butuh id dari user untuk di proses
 * nah format pembuatan parameter API ini harus ada titik dua didepan parameter
 * contoh saya ingin memanggil nama dari objek users tadi berarti /users/:nama
 * nanti hasilnya /users/Naila
 */
app.get('/users/:id',function(request, response) {
    /**
     * Ini adalah fungsi yang di gunakan untuk mengakses atau memanggil data dari array
     * dengan memanggil .find berarti mencari spesifik data dari users disini saya pengen ambil id dari parameter api nya
     * berarti saya pengen ambil id dari /users/1 nah nanti array dari users ini akan mencari objek dari isinya 
     * kalau bahasa manusianya
     * woi gue pengen cari data dari users pake field id, isi id nya itu 1
     * users akan mencari kumpulan data datanya dan mencari objectnya lalu akses valuenya 
     * kalau ada keluarin respon, kalua gada ya yaudah meledak
     * 
     * find ini punya parameter terserah namain apa yang penting lu pada ngerti dah fungsi parameter nya 
     * yang pasti parameter dari find ini adalah representasi dari isi arraynya berarti
     * 'data' yang dibawah ini itu isi objek dari array users, nah gua kasih kondisi nih data.id ini harus sama dengan dari paramater
     * nah di parameter nya ini dikasih validasi parseInt berarti dipaksa parameter ini harus bersifat number kalau gak number nanti error
     * 
     * parameter dari APi nya itu dipanggil dengan cara request.params nah bisa di spesifikan lagi request.params.id berarti ambil parameter
     * dengan namanya id
     */
    const user = users.find(data => data.id === parseInt(request.params.id));


    // kasih validasi jika user itu ada kasih response (200), kalau gak ada kasih response 400 (bad request)
    if(user) {
        response.json(user);
    } else {
        response.status(400).json({
            pesan: "Data user tidak ditemukan",
        });
    }
});

/**
 * Konsepnya sama seperti ambil data dengan id di atas tuh le, lu cernain dulu dah pada coba
 */
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

/**
 * POST berarti memposting atau menambahkan, nah untuk post ini kita harus membuat sebuah objek yang akan kita ingin buat
 * berarti kita panggil dari express dengan metode .post
 */
app.post('/user/post', function(request, response) {
    
    /**
     * Nah ini kita membuat sebuah data objek baru ini harus sesuai formatnya dengan array yang kita buat tadi di atas
     * nah perhatiin di id, id ini akan selalu bertambah 1 ketika pembuatan dengan logika:
     * ambil panjang atau jumlah data yang ada di array users lalu tambahkan 1 (1 ini adalah object baru yang dibuat)
     * 
     * untuk sisa datanya itu kita ambil dari body post API dengan cara
     * request.body nah kita bisa spesifikin lagi request.body.name berarti ambil body yang name aja
     * kalau request.body aja berarti ambil semua bodi
     */
    const newData = {
        id: users.length + 1, 
        name: request.body.name,
        age: request.body.age
    };

    /**
     * Setelah data udah oke kita push atau kita masukan ke users
     * formatnya 
     * array.push(data_baru)
     * 
     * berarti kalau kita baca push atau masukan data baru ke users
     */
    users.push(newData);

    
    // kembaliin data dengan 200 
    response.status(200).json(newData);
});