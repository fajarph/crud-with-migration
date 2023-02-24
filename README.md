Getting Started

### `npm install`

Untuk menginstall beberapa package yang telah ada 

### `npm start`

Untuk menjalankan proyek tersebut, lalu buka di browser http://localhost:3000 oh iya sebelum itu kalian juga harus npm start di bagian backend nya dengan cara menggunakan 2 terminal yang satu untuk backend dan yang satu lagi untuk frontend

Langkah-Langkah
1. Buat database terlebih dahulu di folder config Database.js yang telah tersedia dan masukan username beserta password database anda.
2. Buat tabel dengan sequelize, karna models tabel nya telah tersedia maka anda tinggal menjalankan perintah sequelize db:migrate tanpa menjalankan sequelize init lagi.
3. Setelah buat tabel anda dapat membuka aplikasi database anda sendiri, contoh aplikasi database yang saya gunakan ialah dbeaver. Lalu buka tabel Country, Horoscope dan Hobby lalu isi data nya dengan cara manual setelah itu.
4. Karna anda tidak memiliki akun untuk login maka anda dapat membuat akun tersebut dengan cara, pergi ke file request.rest di folder backend lalu cari Create User yang telah saya sediakan dan jangan lupa install extensions REST Client okey, (oh ya sebelum itu kamu bisa pergi ke routes lalu ke userRoute lalu hapus terlebih dahulu middleware.verifyUser, middleware.adminOnly, validation.createUser kenapa harus di hapus karna agar kamu dapat membuat akun tersebut dan jangan lupa di kembalikan lagi sepeti semula setelah membuat akun berhasil) contoh nya itu seperti ini: 
	send request
	POST http://localhost:5000/users
	Content-Type: application/json
	{
	    "name": "admin",
	    "email": "admin@gmail.com",
	    "password": "12345678",
	    "confPassword": "12345678",
	    "role": "admin"
	}
	oh iya di proyek ini ada tiga role yaitu admin, student, dan teacher
	admin dia bisa mengakses ke semua halaman, sedangkan teacher hanya bisa mengakses halaman teacher dan student tidak bisa mengakses halaman admin dan student hanya bisa mengakses halaman student itu sendiri tidak bisa mengakses halaman admin maupun teacher.
5. Setelah akun berhasil terbuat anda dapat login sebagai admin dengan cara seperti contoh sebelum nya anda tinggal cari saja Login Admin lalu send request admin.
6. Dan yah anda dapat login dengan menggunakan user admin lalu anda dapat membuat user dengan role teacher dan student yang di mana semua role disini sudah memiliki akses nya masing masing seperti yang di jelasin sebelumnya THANK YOUUUU
