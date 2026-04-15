// ============================================================
// FILE: assets/js/main.js
// FUNGSI: Semua animasi dan interaksi di halaman portfolio
// ============================================================


// ============================================================
// 1. GLOW ORBS — Lingkaran cahaya blur di background
// ============================================================
// Membuat 3 elemen div dengan class 'glow-orb' dan menambahkannya
// ke dalam body. Tampilannya diatur di CSS (warna, posisi, animasi float).
['orb-1','orb-2','orb-3'].forEach(cls => {
  const orb = document.createElement('div');
  orb.className = `glow-orb ${cls}`;
  document.body.appendChild(orb);
});


// ============================================================
// 2. CUSTOM CURSOR — Kursor mouse yang diganti dengan desain sendiri
// ============================================================
const cursor = document.getElementById('cursor');         // titik kecil
const follower = document.getElementById('cursor-follower'); // lingkaran besar yang mengikuti
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

// Setiap kali mouse bergerak, posisi titik kecil langsung ikut
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Lingkaran besar bergerak lebih lambat (efek lag/smooth)
// Menggunakan requestAnimationFrame agar animasi berjalan tiap frame
function animateFollower() {
  // Interpolasi: follower bergerak 12% dari jarak ke mouse setiap frame
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower); // panggil terus setiap frame
}
animateFollower();

// Saat hover ke elemen interaktif (link, button, card),
// kursor membesar dan berubah warna
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = 'rgba(108,99,255,0.5)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = '#6C63FF';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});


// ============================================================
// 3. PARTICLES CANVAS — Titik-titik bergerak di background
// ============================================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d'); // ambil context 2D untuk menggambar
let particles = [];

// Sesuaikan ukuran canvas dengan ukuran layar
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas); // update saat layar di-resize

// Class Particle — blueprint untuk setiap titik
class Particle {
  constructor() { this.reset(); }

  // Set posisi dan properti acak
  reset() {
    this.x      = Math.random() * canvas.width;
    this.y      = Math.random() * canvas.height;
    this.size   = Math.random() * 2 + 0.5;           // ukuran titik
    this.speedX = (Math.random() - 0.5) * 0.5;       // kecepatan horizontal
    this.speedY = (Math.random() - 0.5) * 0.5;       // kecepatan vertikal
    this.opacity = Math.random() * 0.5 + 0.1;        // transparansi
    this.color  = ['#6C63FF','#FF6584','#43E97B'][Math.floor(Math.random()*3)]; // warna acak
  }

  // Gerakkan titik setiap frame, reset jika keluar layar
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  // Gambar titik di canvas
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Buat 120 partikel sekaligus
for (let i = 0; i < 120; i++) particles.push(new Particle());

// Gambar garis penghubung antar partikel yang berdekatan (< 100px)
// Semakin dekat, semakin terang garisnya
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist/100) * 0.15; // makin dekat makin terlihat
        ctx.strokeStyle = '#6C63FF';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

// Loop animasi: bersihkan canvas → update → gambar → ulangi
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ============================================================
// 4. NAVBAR SCROLL — Navbar berubah tampilan saat di-scroll
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  // Tambah class 'scrolled' jika sudah scroll > 50px (diatur di CSS)
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Tampilkan tombol back-to-top jika sudah scroll > 400px
  const btn = document.getElementById('back-to-top');
  btn.classList.toggle('visible', window.scrollY > 400);
});


// ============================================================
// 5. MOBILE MENU — Buka/tutup menu di layar kecil (HP)
// ============================================================
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});
// Tutup menu otomatis saat salah satu link diklik
document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'));
});


// ============================================================
// 6. TYPED TEXT — Teks yang mengetik dan menghapus otomatis
// ============================================================
const phrases = ['Web Developer', 'PHP Developer', 'Laravel Developer', 'Frontend Developer', 'Fresh Graduate'];
let phraseIdx = 0;   // index kalimat yang sedang ditampilkan
let charIdx   = 0;   // index karakter yang sedang diketik
let isDeleting = false; // sedang menghapus atau mengetik?
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    // Hapus satu karakter dari belakang
    typedEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length; // pindah ke kalimat berikutnya
      setTimeout(typeEffect, 500);
      return;
    }
    setTimeout(typeEffect, 60); // kecepatan hapus
  } else {
    // Tambah satu karakter
    typedEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000); // jeda sebelum mulai hapus
      return;
    }
    setTimeout(typeEffect, 100); // kecepatan ketik
  }
}
typeEffect();


// ============================================================
// 7. SCROLL REVEAL — Elemen muncul dengan animasi saat di-scroll
// ============================================================
// IntersectionObserver memantau apakah elemen masuk ke area tampilan layar
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // tambah class 'visible' → CSS animasi jalan

      // Jalankan animasi skill bar jika ada di dalam elemen ini
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });

      // Jalankan counter jika ada
      entry.target.querySelectorAll('.counter').forEach(counter => {
        animateCounter(counter);
      });
    }
  });
}, { threshold: 0.15 }); // trigger saat 15% elemen terlihat

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Observer khusus untuk section skills dan about
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      entry.target.querySelectorAll('.counter').forEach(counter => {
        animateCounter(counter);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('#skills, #about').forEach(el => skillObserver.observe(el));


// ============================================================
// 8. COUNTER ANIMATION — Angka naik dari 0 ke target
// ============================================================
function animateCounter(el) {
  if (el.dataset.animated) return; // cegah animasi jalan dua kali
  el.dataset.animated = true;

  const target   = parseInt(el.dataset.target); // angka tujuan
  const duration = 2000;                         // durasi 2 detik
  const step     = target / (duration / 16);     // kenaikan per frame (~60fps)
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (target === 100 ? '' : '+');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + (target === 100 ? '' : '+');
    }
  }, 16);
}


// ============================================================
// 9. PROJECT FILTER — Filter project berdasarkan kategori
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Hapus class 'active' dari semua tombol, tambahkan ke yang diklik
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter; // ambil nilai filter: 'all', 'web', dll

    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'block' : 'none';
      if (show) card.style.animation = 'fadeUp 0.5s ease forwards';
    });
  });
});


// ============================================================
// 10. BACK TO TOP — Scroll ke atas saat tombol diklik
// ============================================================
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================================
// 11. CONTACT FORM — Feedback animasi saat form dikirim
// ============================================================
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault(); // cegah reload halaman
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
  btn.style.background = '#43E97B'; // hijau saat sukses
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
    btn.style.background = '';
    e.target.reset(); // kosongkan form
  }, 3000);
});


// ============================================================
// 12. TILT EFFECT — Kartu project miring mengikuti posisi mouse
// ============================================================
document.querySelectorAll('.project-card > div').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;   // posisi mouse relatif ke kartu
    const y       = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    // Hitung sudut kemiringan berdasarkan posisi mouse
    const rotateX =  (y - centerY) / 20;
    const rotateY = (centerX - x)  / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});


// ============================================================
// 13. ACTIVE NAV LINK — Highlight menu sesuai section yang sedang dilihat
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    // Jika posisi scroll sudah melewati section (dikurangi 100px offset)
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? '#6C63FF' : '';
  });
});


// ============================================================
// 14. SMOOTH SCROLL — Klik link anchor scroll dengan mulus
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ============================================================
// 15. PARALLAX HERO — Konten hero bergerak sedikit mengikuti mouse
// ============================================================
document.addEventListener('mousemove', e => {
  // Hitung posisi mouse relatif ke tengah layar (-0.5 sampai 0.5)
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const hero = document.querySelector('.hero-content');
  // Gerakkan konten hero 30% dari pergerakan mouse (efek halus)
  if (hero) hero.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
