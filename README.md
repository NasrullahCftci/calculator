# 🧮 Hesap Makinesi

Modern ve responsive bir hesap makinesi uygulaması. HTML, CSS ve JavaScript ile geliştirilmiştir.

## ✨ Özellikler

- ✅ Modern ve şık arayüz
- ✅ Responsive tasarım (mobil ve masaüstü uyumlu)
- ✅ Temel aritmetik işlemler (+, -, *, /)
- ✅ Ondalık sayı desteği
- ✅ Klavye desteği
- ✅ Güvenli hesaplama (eval() kullanılmadan)

## 🚀 Canlı Demo

[Hesap Makinesini Dene](https://nasrullahcftci.github.io/calculator/)

## 📱 Mobil Uygulama Olarak Kullanım

### PWA (Progressive Web App)
Bu uygulama PWA olarak çalışır, yani mobil cihazınıza uygulama gibi yükleyebilirsiniz:

**Android:**
1. Chrome'da siteyi açın
2. Menü (⋮) > "Ana ekrana ekle"
3. Artık bir uygulama gibi kullanabilirsiniz!

**iOS (iPhone/iPad):**
1. Safari'de siteyi açın
2. Paylaş butonu (□↑) > "Ana Ekrana Ekle"
3. Artık bir uygulama gibi kullanabilirsiniz!

**Özellikler:**
- ✅ Offline çalışma
- ✅ Ana ekranda kısayol
- ✅ Tam ekran deneyim
- ✅ Hızlı yükleme

### APK Oluşturma (Android Uygulama Paketi)

#### Yöntem 1: PWABuilder (En Kolay - Önerilen)
1. https://www.pwabuilder.com/ adresine gidin
2. URL'yi girin: `https://nasrullahcftci.github.io/calculator/`
3. "Start" > "Package For Stores" > "Android" > "Generate"
4. APK'yı indirin ve yükleyin!

#### Yöntem 2: Capacitor (Gelişmiş)
```bash
# Gerekli paketleri yükle
npm install

# Capacitor'ı başlat
npx cap init

# Android platformunu ekle
npx cap add android

# Projeyi senkronize et
npx cap sync

# Android Studio'da aç
npx cap open android

# Android Studio'da: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

**Gereksinimler:**
- Node.js (v16+)
- Android Studio
- Java JDK 11+

## 💻 Kullanım

### Tarayıcıda Çalıştırma

1. Projeyi klonlayın:
```bash
git clone https://github.com/NasrullahCftci/calculator.git
cd calculator
```

2. `src/index.html` dosyasını tarayıcınızda açın

### Klavye Kısayolları

- **0-9**: Rakam girişi
- **+, -, *, /**: İşlem seçimi
- **Enter**: Hesapla
- **Escape**: Temizle
- **.**: Ondalık nokta

## 🛠️ Teknolojiler

- HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- Vanilla JavaScript (ES6+)

## 📱 Responsive Tasarım

- Masaüstü: 400px optimal genişlik
- Tablet: Otomatik uyum
- Mobil: 360px+ desteklenir

## 📄 Lisans

MIT License - Özgürce kullanabilirsiniz!

## 👨‍💻 Geliştirici

[NasrullahCftci](https://github.com/NasrullahCftci)
