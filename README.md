# Kali Maktab — APK (GitHub Actions orqali)

APK ichida ilova o'z nomi va ikonkasini bosh ekran uchun ham o'zgartira oladi.

## APK olish
1. Shu papkadagi **barcha fayllar** (`.github` papkasi bilan) GitHub repozitoriyga yuklanadi.
   `.github/workflows/build-apk.yml` yo'q bo'lsa — GitHub'da *Add file → Create new file* orqali shu nom bilan yarating va `build-apk.yml.copy` ichidagini joylang.
2. Repozitoriyda **Actions → Build APK → Run workflow** (yoki `main` ga push qiling).
3. 5–10 daqiqadan keyin tugagan ish ichidan **Artifacts → KaliMaktab-apk** ni yuklab oling, ichida `app-debug.apk`.

> Har bir yig'ishda debug imzo yangidan yaratiladi. Eski o'rnatilgan ilovani avval o'chirib, keyin yangisini o'rnating.

## Ilova ichida
**⚙ Sozlamalar → 📱 Ilova nomi va ikonkasi**
- Nom yozing, tayyor ikonka yoki galereyadan rasm tanlang (ilova ichida darhol almashadi).
- **🏠 Asosiy ikonkani almashtirish** — ilovaning o'zi bosh ekranda tanlangan tayyor ikonka va unga biriktirilgan nom bilan chiqadi.
  Tayyor ikonka tanlanmagan bo'lsa — asl (terminal) ikonka qaytadi. Galereya rasmi bu usulda ishlamaydi.
- **📌 Bosh ekranga yorliq** — siz yozgan nom va tanlagan rasm (galereya ham) bilan bosh ekranga qo'shimcha ikonka qo'yadi. Telefon tasdiq so'raydi.

## Cheklovlar (Android qoidalari)
- Asosiy ikonka uchun nom ham, rasm ham oldindan tayyorlangan ro'yxatdan tanlanadi (`presets.json`). Erkin nom/rasm faqat «Yorliq» orqali.
- Asosiy ikonka almashganda ba'zi launcherlar eski ikonkani bosh ekrandan olib tashlaydi, yangisi ilovalar ro'yxatida chiqadi. Yangilanishi bir necha soniya olishi mumkin.
- «Yorliq» Android 8+ va yorliqni qo'llaydigan launcher talab qiladi. Eski asosiy ikonka yashirilmaydi.

## Nom va ikonkalarni o'zgartirish
`presets.json` ni tahrirlang: `label` — nom, `icon` — `www/` ichidagi rasm yo'li (kvadrat, kamida 192 px tavsiya).
Yangi rasm qo'shsangiz `www/icons/` ga joylab, shu faylga yozing. Ilova ichidagi 15 ta tayyor ikonka tartibi `p0…p14` bilan bir xil bo'lishi kerak.
Asosiy (boshlang'ich) nom va ikonka: `default`.

## Tuzilma
- `www/` — veb ilova
- `presets.json` — nom/ikonka ro'yxati
- `native/` — Android qismi (`patch_android.py` yig'ish vaqtida avtomatik ishlaydi)
- `.github/workflows/build-apk.yml` — APK yig'ish
