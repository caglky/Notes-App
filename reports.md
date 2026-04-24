## Proje özelinde notlarım 

1) süslü parentez olmadan import'lananlar "default export" , süslü ile olanlar "named export"
   Default export => bir dosyada tek bir ana şey export ediliyorsa kullanılır, ismi istediğimiz gibi değiştirebiliriz.
   Named export => bir dosya birden fazla şey export ediyordur, isimler birebir kullanılır

2) react-router-dom => sayfalar arası geçiş 
   @tanstack/react-store => global store 
   uuid => her not için benzersiz id verme 

3) crypto-js => npm sayfasında aktif geliştirme durduğu söylüyor, son yayın tarihi 24 Ekim 2023, ödev için yeterli 
   libsodium-wrappers => teknik olarak güçlü ama crypto-js'e göre kullanımı zor, güncel paket (9 nisan 2026)
   jose => şifreleme yazılabilir ama ana amacı JWT/JWS/JWE ekosistemi, basit not uygulaması için ağır gelebilir.
   tweetnacl => yüksek seviye API sunuyor, ama npm sonucu 10 Şubat 2020, ağır gelebilir

4) router.jsx => route tanımları 
   notesStore.js => TanStack Store
   crypto.js => encrypto, decrypto 
   encoder.js => URL'e güvenli veri taşıma 
   storage.js => localStorage işlemler


5) AppInıtializer neden var? 
   - uygulama açıldığında localStorage'dan notları yüklemek 
   - notlar değişince tekrar localStorage'a kaydetmek 
   sonunda bir şey yazdırmıyoruz, o yüzden return null, görünür bir şey yapmıyor 
   RouterProvider neden var? 
   - uygulama sayfa sistemi, farklı sayfaya gidience farklı component açılmasını sağlar 
   CreateBrowserRouter neden var?
   - router'ın haritası, hangi adrrese gidilince ne açılacağını söylüyoruz 

6) content yerine items kullandım, steps bir dizi, her step kendi içinde text ve done bilgisi tutucak 

7) AES=> Advanced Encryption Standart => en çok kullanılan şifreleme algoritmalarından biri, veriyi al şifrele,  sadece doğru anahtarla aç 