# Petunjuk Aplikasi

### Framework yang Digunakan pada Server:
1. NodeJS

### Database dan ORM yang Digunakan pada Server:
1. Database : ```PostgreSQL```
2. ORM : ```Sequelize```

### Petunjuk Penginstallan Aplikasi:
1. Clone file dari ```https://github.com/brilianrn/TechnicalTest-EVO-Smart-Life.git```
2. Masuk ke folder ```TechnicalTestEVOSmartLife```
3. Jalankan perintah ```npm install``` pada command line
4. Masuk ke dalam folder ```config``` dan buka file ```config.json```
5. Ubah bagian ```"development"``` pada ```username``` dan ```password``` sesuai dengan settingan yang ada di PC Anda
6. Jalankan perintah ```npx sequelize db:create``` pada command line
7. Jalankan perintah ```npx sequelize db:migrate``` pada command line
8. Jalankan perintah ```npx sequelize db:seed:all``` pada command line
9. Jalankan perintah ```npm i -g nodemon``` pada command line
10. Jalankan perintah ```nodemon app.js``` pada command line
