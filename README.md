# 🚀 TASKFLOW — RESTful Task Management API

[![Node.js](https://img.shields.io/badge/Node.js-v24.x-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Layered_MVC-blue?style=flat)](#-mimari-ve-proje-yapısı)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**TASKFLOW**, katmanlı backend mimarisi (Layered MVC) ilkelerine sadık kalınarak geliştirilmiş, yüksek performanslı ve sürdürülebilir bir **Node.js REST API** servisidir. Esnek filtreleme, sayfalama (pagination) ve detaylı durum raporlaması özellikleriyle görev yönetimi süreçlerini uçtan uca simüle eder.

---

## ✨ Öne Çıkan Özellikler

- **Katmanlı MVC Mimarisi:** Router, Controller ve Service katmanlarının tamamen birbirinden ayrıldığı (Separation of Concerns) temiz kod yapısı.
- **RESTful CRUD Operasyonları:** Görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme işlevleri.
- **Gelişmiş Sorgu Yönetimi:** Status, priority ve dinamik metin arama (`search`) filtreleri.
- **Sayfalama (Pagination):** Büyük veri setleri için performanslı `page` ve `limit` kontrolü.
- **Raporlama Servisi:** Tamamlanan, bekleyen ve öncelik seviyelerine göre görevlerin anlık istatistiksel özetleri.
- **Merkezi Hata Yönetimi:** Express `next(error)` middleware yapısı ile tutarlı ve güvenli HTTP durum kodları.
- **Dosya Tabanlı Kalıcılık:** Veritabanı bağımlılığı olmadan `tasks.json` üzerinden esnek ve hızlı veri saklama.

---

## 🛠️ Teknolojiler ve Bağımlılıklar

- **Runtime:** Node.js (v24+)
- **Framework:** Express.js
- **Geliştirme Aracı:** Nodemon (Hot-reloading)
- **Veri Biçimi:** JSON

---

## 📁 Mimari ve Proje Yapısı

```text
taskflow-backend/
├── src/
│   ├── controllers/      # İstek/Yanıt mantığı ve HTTP kontrolü
│   │   ├── taskController.js
│   │   └── reportController.js
│   ├── services/         # İş mantığı (Business Logic) ve veri erişimi
│   │   └── taskService.js
│   ├── routes/           # Endpoint yönlendirmeleri
│   │   ├── taskRoutes.js
│   │   └── reportRoutes.js
│   └── data/             # Veri depolama katmanı
│       └── tasks.json
├── app.js                # Express uygulama yapılandırması & Middleware
├── server.js             # Sunucu başlatma noktası (Entry point)
├── package.json          # Proje bağımlılıkları ve scriptler
├── API_DOCUMENTATION.md  # Detaylı endpoint dokümantasyonu
├── TEST_SCENARIOS.md     # Test senaryoları ve Postman rehberi
└── README.md             # Proje genel tanıtımı
