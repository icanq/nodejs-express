const express = require('express');
const app = express();
const fs = require('fs')

const PORT = 3000;

const logger = (req, res, next) => {
  console.log('Ada request ke ' + req.url);
  next()
};

// untuk mengaktifkan middleware yang telah dibuat barusan secara global
app.use(logger);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// untuk memisahkan router kita ke file yang berbeda
const api = express.Router()

app.use('/api', api)

api.get('/users', (req, res) => {
  fs.readFile('./db/data.json', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data))
  })
});

api.get('/users/:id', (req, res) => {
  fs.readFile('./db/data.json', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data)
    const user = users.find(user => user.id === Number(req.params.id))
    if (!user) res.send('User tidak ditemukan')
    res.send(user)
  })
});

api.post('/users', (req, res) => {
  const { username, email, bod } = req.body
  if (!username || !email || !bod) res.send('Data tidak lengkap')
  fs.readFile('./db/data.json', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data)
    
    // apabila kita sudah menggunakan database yang sebenarnya, kita tidak perlu lagi menambahkan id secara manual dan juga mengganti logika penambahan data sesuai dengan database yang kita gunakan
    const newUser = {
      id: users.length + 1,
      username,
      email,
      bod
    }
    users.push(newUser)
    fs.writeFile('./db/data.json', JSON.stringify(users), (err) => {
      if (err) throw err;
      res.send('Data berhasil ditambahkan')
    })
  })
});

api.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, bod } = req.body
  
  // kita bisa menggunakan cara ini untuk mengubah data
  fs.readFile('./db/data.json', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data)
    // logika ini nanti akan berubah sesuai dengan database yang kita gunakan
    const user = users.find(user => user.id === Number(req.params.id))
    
    if (!user) res.send('User tidak ditemukan')

    if (username && username !== user.username) user.username = username
    if (email && email !== user.email) user.email = email
    if (bod && bod !== user) user.bod = bod

    fs.writeFile('./db/data.json', JSON.stringify(users), (err) => {
      if (err) throw err;
      res.send('Data berhasil diubah')
    })
  })
});

api.delete('/users/:id', (req, res) => {
  fs.readFile('./db/data.json', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data)
    const newUsers = users.filter(user => user.id !== Number(req.params.id))
    fs.writeFile('./db/data.json', JSON.stringify(newUsers), (err) => {
      if (err) throw err;
      res.send('Data berhasil dihapus')
    })
  })
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});