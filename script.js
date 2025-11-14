// Hesap makinesi state yönetimi
const calculatorState = {
  currentValue: '',           // Display'deki mevcut değer
  previousValue: '',          // Önceki operand
  operation: null,            // Seçili operatör (+, -, *, /)
  shouldResetDisplay: false   // Yeni giriş için display reset flag'i
};

// Display elementini al
const displayElement = document.getElementById('display');

/**
 * Rakam ekleme fonksiyonu
 * Display'e rakam ekler ve state'i günceller
 * @param {string} number - Eklenecek rakam (0-9)
 */
function appendNumber(number) {
  // Eğer display reset edilmesi gerekiyorsa, mevcut değeri temizle
  if (calculatorState.shouldResetDisplay) {
    calculatorState.currentValue = '';
    calculatorState.shouldResetDisplay = false;
  }
  
  // Rakamı mevcut değere ekle
  calculatorState.currentValue += number;
  
  // Display'i güncelle
  updateDisplay();
}

/**
 * Ondalık nokta ekleme fonksiyonu
 * Mevcut sayıya ondalık nokta ekler
 * Çift nokta kontrolü yapar
 */
function appendDecimal() {
  // Eğer display reset edilmesi gerekiyorsa, "0." ile başla
  if (calculatorState.shouldResetDisplay) {
    calculatorState.currentValue = '0';
    calculatorState.shouldResetDisplay = false;
  }
  
  // Eğer currentValue boşsa, "0." ile başla
  if (calculatorState.currentValue === '') {
    calculatorState.currentValue = '0';
  }
  
  // Eğer zaten ondalık nokta varsa, ekleme
  if (calculatorState.currentValue.includes('.')) {
    return;
  }
  
  // Ondalık noktayı ekle
  calculatorState.currentValue += '.';
  
  // Display'i güncelle
  updateDisplay();
}

/**
 * Operasyon seçme fonksiyonu
 * Seçilen operatörü (+, -, *, /) saklar ve state'i günceller
 * @param {string} operator - Seçilen operatör (+, -, *, /)
 */
function setOperation(operator) {
  // Eğer currentValue boşsa, işlem yapma
  if (calculatorState.currentValue === '') {
    return;
  }
  
  // Eğer daha önce bir operasyon varsa ve yeni bir sayı girildiyse, önce hesapla
  if (calculatorState.previousValue !== '' && !calculatorState.shouldResetDisplay) {
    calculate();
  }
  
  // Mevcut değeri previousValue'ya kaydet
  calculatorState.previousValue = calculatorState.currentValue;
  
  // Operatörü state'e kaydet
  calculatorState.operation = operator;
  
  // Display reset flag'ini ayarla
  calculatorState.shouldResetDisplay = true;
  
  // Operatör sembolünü display'de göster (opsiyonel - şu an sadece sayıyı gösteriyoruz)
  // Display'de operatör göstermek istersek burada ekleyebiliriz
}

/**
 * Güvenli hesaplama fonksiyonu
 * eval() kullanmadan matematiksel işlemleri gerçekleştirir
 * @param {string} num1 - İlk operand
 * @param {string} operator - Operatör (+, -, *, /)
 * @param {string} num2 - İkinci operand
 * @returns {number|string} - Hesaplama sonucu veya hata durumunda 'Error'
 */
function performCalculation(num1, operator, num2) {
  // String değerleri float'a çevir
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  
  // Operatöre göre hesaplama yap
  switch(operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      // Sıfıra bölme kontrolü
      if (b === 0) {
        return 'Error';
      }
      return a / b;
    default:
      return num2;
  }
}

/**
 * Hesaplama fonksiyonu
 * Equals (=) tuşuna basıldığında çağrılır
 * performCalculation fonksiyonunu kullanarak sonucu hesaplar
 */
function calculate() {
  // Eğer operasyon veya previousValue yoksa, işlem yapma
  if (calculatorState.operation === null || calculatorState.previousValue === '') {
    return;
  }
  
  // Eğer currentValue boşsa, işlem yapma
  if (calculatorState.currentValue === '') {
    return;
  }
  
  // Hesaplamayı gerçekleştir
  const result = performCalculation(
    calculatorState.previousValue,
    calculatorState.operation,
    calculatorState.currentValue
  );
  
  // Sonucu display'de göster
  if (result === 'Error') {
    // Hata durumunda
    calculatorState.currentValue = 'Error';
    calculatorState.previousValue = '';
    calculatorState.operation = null;
    calculatorState.shouldResetDisplay = false;
    
    // Display'i güncelle (updateDisplay helper'ı kullan)
    updateDisplay();
  } else {
    // Başarılı hesaplama
    calculatorState.currentValue = result.toString();
    calculatorState.previousValue = '';
    calculatorState.operation = null;
    calculatorState.shouldResetDisplay = true;
    
    // Display'i güncelle
    updateDisplay();
  }
}

/**
 * Temizleme fonksiyonu
 * Tüm state'i başlangıç değerlerine sıfırlar
 * Clear (C) tuşuna basıldığında çağrılır
 */
function clear() {
  // Tüm state özelliklerini başlangıç değerlerine sıfırla
  calculatorState.currentValue = '';
  calculatorState.previousValue = '';
  calculatorState.operation = null;
  calculatorState.shouldResetDisplay = false;
  
  // Display'i güncelle (updateDisplay helper'ı kullan)
  updateDisplay();
}

/**
 * Display güncelleme helper fonksiyonu
 * State'teki currentValue'yu display'de gösterir
 * Boş display durumunu ve overflow'u yönetir
 */
function updateDisplay() {
  // Eğer currentValue boşsa, "0" göster
  if (calculatorState.currentValue === '') {
    displayElement.textContent = '0';
    displayElement.style.fontSize = ''; // Font boyutunu sıfırla
    return;
  }
  
  // Display'i güncelle
  displayElement.textContent = calculatorState.currentValue;
  
  // Overflow kontrolü - 15 karakterden fazlaysa font boyutunu küçült
  if (calculatorState.currentValue.length > 15) {
    // Uzun sayılar için font boyutunu dinamik olarak küçült
    // Her ekstra karakter için %5 küçültme, minimum %60'a kadar
    const scaleFactor = Math.max(0.6, 1 - (calculatorState.currentValue.length - 15) * 0.05);
    displayElement.style.fontSize = `${scaleFactor * 48}px`;
  } else {
    // Normal font boyutuna dön (CSS'teki varsayılan değer)
    displayElement.style.fontSize = '';
  }
}

/**
 * Klavye desteği fonksiyonu
 * Klavye tuşlarını hesap makinesi fonksiyonlarına yönlendirir
 * @param {KeyboardEvent} event - Klavye event'i
 */
function handleKeyboardInput(event) {
  const key = event.key;
  
  // Rakam tuşları (0-9)
  if (key >= '0' && key <= '9') {
    appendNumber(key);
    return;
  }
  
  // Operatör tuşları (+, -, *, /)
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    setOperation(key);
    return;
  }
  
  // Enter tuşu - hesaplama yap
  if (key === 'Enter') {
    event.preventDefault(); // Form submit gibi varsayılan davranışları engelle
    calculate();
    return;
  }
  
  // Escape veya Delete tuşu - temizle
  if (key === 'Escape' || key === 'Delete') {
    clear();
    return;
  }
  
  // Ondalık nokta tuşu (. veya ,)
  if (key === '.' || key === ',') {
    appendDecimal();
    return;
  }
}

// Event listener'ları başlat
function initializeEventListeners() {
  // Tüm rakam butonlarını seç (0-9)
  const numberButtons = document.querySelectorAll('.btn-number');
  
  // Her rakam butonuna click event listener ekle
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      const number = button.getAttribute('data-number');
      appendNumber(number);
    });
  });
  
  // Ondalık nokta butonunu seç
  const decimalButton = document.querySelector('.btn-decimal');
  
  // Ondalık nokta butonuna click event listener ekle
  if (decimalButton) {
    decimalButton.addEventListener('click', appendDecimal);
  }
  
  // Tüm operatör butonlarını seç (+, -, *, /)
  const operatorButtons = document.querySelectorAll('.btn-operator');
  
  // Her operatör butonuna click event listener ekle
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const operator = button.getAttribute('data-operator');
      setOperation(operator);
    });
  });
  
  // Equals butonunu seç
  const equalsButton = document.querySelector('.btn-equals');
  
  // Equals butonuna click event listener ekle
  if (equalsButton) {
    equalsButton.addEventListener('click', calculate);
  }
  
  // Clear butonunu seç
  const clearButton = document.querySelector('.btn-clear');
  
  // Clear butonuna click event listener ekle
  if (clearButton) {
    clearButton.addEventListener('click', clear);
  }
  
  // Klavye event listener'ı ekle
  document.addEventListener('keydown', handleKeyboardInput);
}

// Service Worker kaydı - PWA için
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/calculator/service-worker.js')
      .then(registration => console.log('Service Worker kayıtlı'))
      .catch(err => console.log('Service Worker kayıt hatası:', err));
  });
}

// Sayfa yüklendiğinde event listener'ları başlat
document.addEventListener('DOMContentLoaded', initializeEventListeners);
