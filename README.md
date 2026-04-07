# 🚀 Personal Portfolio Website

Web portfolio pribadi yang dibangun dengan HTML5, Tailwind CSS, dan Vanilla JavaScript.

---

## ✏️ Cara Kustomisasi

### 1. Informasi Pribadi — `index.html`

#### Nama
Cari semua teks `[Your Name]` dan ganti dengan nama kamu (ada di beberapa tempat: hero, about, footer).

#### Typed Text (teks yang beranimasi di hero)
Buka `assets/js/main.js`, cari baris ini dan edit sesuai keahlianmu:
```js
const phrases = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', ...];
```

#### Foto Profil
Di section About, ganti emoji 👨‍💻 dengan tag `<img>`:
```html
<!-- Sebelum -->
<div class="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-7xl">👨‍💻</div>

<!-- Sesudah -->
<img src="assets/img/foto.jpg" alt="Foto Profil" class="w-full h-full object-cover" />
```

#### Kontak
```html
[email]@gmail.com       → email kamu
+62 [phone_number]      → nomor WhatsApp kamu
Jakarta, Indonesia      → kota kamu
```

#### Link Sosial Media (section Hero)
```html
<a href="#">  → ganti # dengan URL GitHub, LinkedIn, Instagram, Twitter kamu
```

#### Tombol Download CV
```html
<a href="#">  → ganti # dengan path file CV kamu, contoh: href="assets/cv/cv-nama.pdf"
```

---

### 2. Statistik (section About)

```html
<div class="counter" data-target="50">   → jumlah projects
<div class="counter" data-target="3">    → tahun pengalaman
<div class="counter" data-target="20">   → jumlah klien
```

---

### 3. Skills

#### Skill Cards (grid ikon)
Cari blok `skill-card` di `index.html` dan edit nama, emoji, dan kategorinya:
```html
<div class="text-5xl mb-3">⚛️</div>
<div class="font-semibold">React.js</div>
<div class="text-gray-500 text-xs mt-1">Frontend</div>
```

#### Skill Bars (progress bar)
```html
<span class="font-semibold">Frontend Development</span>
<span class="text-primary">90%</span>
...
<div class="skill-bar" data-width="90">   → angka 90 = persentase skill
```

---

### 4. Projects

Setiap project card punya struktur ini:
```html
<div class="project-card" data-category="web">   <!-- web | mobile | ui -->
  <!-- Emoji / thumbnail -->
  <div class="text-6xl">🛒</div>
  <!-- Tech tags -->
  <span>React</span>
  <span>Node.js</span>
  <!-- Info -->
  <h3>Nama Project</h3>
  <p>Deskripsi singkat project...</p>
  <!-- Links -->
  <a href="#">  → link demo
  <a href="#">  → link GitHub
</div>
```

Untuk menambah project baru, copy salah satu blok `project-card` dan sesuaikan isinya.

---

### 5. Pengalaman & Pendidikan (Timeline)

Setiap item timeline:
```html
<h3>Nama Jabatan / Gelar</h3>
<span>2023 - Sekarang</span>          <!-- periode -->
<p class="text-secondary">Nama Perusahaan / Universitas</p>
<p>Deskripsi singkat...</p>
```

Warna dot timeline bisa diganti: `bg-primary` | `bg-secondary` | `bg-accent` | `bg-yellow-400`

---

### 6. Testimoni

```html
<p>Isi testimoni...</p>
<div>Inisial Nama</div>   <!-- huruf pertama nama -->
<div>Nama Lengkap</div>
<div>Jabatan, Perusahaan</div>
```

---

### 7. Warna & Tema — `index.html` (bagian `tailwind.config`)

```js
colors: {
  primary:   '#6C63FF',   // ungu  → warna utama
  secondary: '#FF6584',   // pink  → warna aksen 2
  accent:    '#43E97B',   // hijau → warna aksen 3
  dark:      '#0D0D1A',   // background utama
  card:      '#13132B',   // background card
}
```

---

### 8. Font

Ganti font di `index.html` bagian Google Fonts import dan `tailwind.config`:
```js
fontFamily: {
  inter: ['Inter', 'sans-serif'],
  space: ['Space Grotesk', 'sans-serif'],
}
```

---

## 📁 Struktur File

```
portfolio/
├── index.html          # Halaman utama (semua section ada di sini)
├── assets/
│   ├── css/
│   │   └── style.css   # Animasi & styling custom
│   ├── js/
│   │   └── main.js     # Semua interaksi & animasi JS
│   ├── img/            # Taruh foto profil & thumbnail project di sini
│   └── cv/             # Taruh file CV PDF di sini
└── README.md
```

---

## 🌐 Deploy

Bisa langsung deploy gratis ke:
- **GitHub Pages** — push ke repo, aktifkan Pages di Settings
- **Netlify** — drag & drop folder ke [netlify.com/drop](https://netlify.com/drop)
- **Vercel** — import repo dari GitHub
