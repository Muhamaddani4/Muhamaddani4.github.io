// --- Inisialisasi AOS (Animasi Scroll) ---
AOS.init({
  duration: 800, // Durasi animasi (ms)
  once: true,    // Animasi cuma jalan sekali pas discroll
});

document.addEventListener("DOMContentLoaded", () => {
  // Ambil elemen dari HTML
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const navbar = document.getElementById("myNavbar");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const copyrightYearSpan = document.getElementById("copyrightYear");
  
  // (Variabel authSection dihapus karena tidak dipakai)

  // --- 1. Logika Dark Mode ---
  // Cek apakah user sebelumnya milih dark mode (disimpan di browser)
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
  }

  // Event saat tombol diklik
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    // Simpan pilihan user ke localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // --- 2. Logika Hamburger Menu (Responsive) ---
  hamburgerIcon.addEventListener("click", () => {
    // Tambah/Hapus class "responsive" di navbar
    if (navbar.className === "navbar") {
      navbar.className += " responsive";
    } else {
      navbar.className = "navbar";
    }
  });

  // --- 3. Widget Jam & Tanggal (Realtime) ---
  function updateDateTime() {
    const now = new Date();

    // Array nama hari & bulan Indonesia
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const h = hari[now.getDay()];
    const tgl = now.getDate();
    const bln = bulan[now.getMonth()];
    const th = now.getFullYear();

    // Format Jam 2 digit (misal: 09:05:01)
    const jam = String(now.getHours()).padStart(2, '0');
    const menit = String(now.getMinutes()).padStart(2, '0');
    const detik = String(now.getSeconds()).padStart(2, '0');

    // Masukkan ke elemen HTML (Pastikan ID di HTML ada: 'jam' dan 'tanggal')
    const elemenJam = document.getElementById("jam");
    const elemenTanggal = document.getElementById("tanggal");

    if (elemenJam && elemenTanggal) {
        elemenJam.textContent = `${jam}:${menit}:${detik}`;
        elemenTanggal.textContent = `${h}, ${tgl} ${bln} ${th}`;
    }
  }

  // Jalankan fungsi update waktu
  setInterval(updateDateTime, 1000); // Update tiap 1 detik
  updateDateTime(); // Jalankan langsung pas load biar gak nunggu 1 detik

  // --- 4. Copyright Year Otomatis ---
  if (copyrightYearSpan) {
      const currentYear = new Date().getFullYear();
      copyrightYearSpan.textContent = currentYear;
  }
});