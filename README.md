# 🌿 وبلاگ و گالری متنی رترو-مینیمال (Minimal ASCII & Terminal Personal Blog)

این وبلاگ یک پلتفرم شخصی با تمرکز بر **تایپوگرافی عمیق، هنرهای اسکی (ASCII Art) و آنسی (ANSI Art)، فرمول‌های ریاضی (LaTeX)، مقالات غنی و گالری آثار هنری** است که بر روی پس‌زمینه سبز زمردی تیره (`#011a0e`) و با فونت استاندارد **وزیرمتن (Vazirmatn)** و فونت‌های مونو‌اسپیس مهندسی شده است.

تمام محتوای سایت بر پایه‌ی **معماری فایل‌محور (File-Based)** کار می‌کند؛ یعنی برای اضافه کردن یا ویرایش هر محتوا کافی است فایل مربوطه را در پوشه‌ی مورد نظر در مسیر `public/` قرار دهید یا ویرایش کنید.

---

## 📁 ساختار پوشه‌ها (Directory Structure)

```text
├── public/
│   ├── home-art.txt   ← هنر اسکی یا آنسی صفحه اول (قابل ویرایش مستقیم)
│   ├── articles/      ← مقالات و نوشته‌های وبلاگ (فایل‌های .html)
│   ├── asciiart/      ← هنرهای اسکی و آنسی (فایل‌های .txt / .ansi / .art)
│   ├── photos/        ← عکس‌ها (تصاویر .jpg + فایل‌های توضیحات .txt هم‌نام)
│   ├── paintings/     ← نقاشی‌ها و طراحی‌ها (تصاویر .jpg + فایل‌های .txt هم‌نام)
│   ├── about.html     ← اطلاعات و بیوگرافی صفحه «درباره من»
│   └── fonts/         ← فونت‌های پروژه (Vazirmatn)
├── src/
│   ├── components/    ← کامپوننت‌های رابط کاربری ری‌اکت
│   │   ├── AsciiBookshelf.tsx       ← قفسه اسکی رنگی صفحه اول
│   │   ├── ArticleContentRenderer.tsx← موتور رندر مقالات (LaTeX, Code, ANSI, Writing)
│   │   ├── AnsiArtRenderer.tsx      ← موتور پارس کدهای رنگی ANSI
│   │   └── ...
│   ├── data/          ← محتواهای استاتیک و پشتیبان
│   └── utils/
│       ├── contentLoader.ts         ← موتور لود خودکار فایل‌های public/
│       └── ansi.ts                  ← توابع تبدیل کدهای Escape Sequence
```

---

## 📝 ۱. راهنمای افزودن و ویرایش مقالات (Articles)

تمامی مقالات به صورت فایل‌های `.html` در پوشه `public/articles/` قرار می‌گیرند (نام فایل‌ها ترجیحاً به صورت `01-title.html` یا `slug-name.html` باشد).

### نمونه ساختار کامل یک فایل مقاله (`public/articles/my-post.html`):

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>زیبایی فرمول‌ها و متون غنی | THE BEAUTY OF LATEX</title>
  <meta name="english-title" content="THE BEAUTY OF LATEX">
  <meta name="date" content="1405/05/28">
  <meta name="excerpt" content="خلاصه مقاله برای نمایش در کارت‌ها و لیست مقالات.">
  <meta name="tags" content="ریاضیات, هوش مصنوعی, کدنویسی, LaTeX">
  <meta name="read-time" content="۵ دقیقه">
  <meta name="featured" content="true"> <!-- قرار گرفتن در برگزیده‌ها (اختیاری) -->
</head>
<body>
  <section class="article-body">
    <h2>عنوان بخش اول مقاله</h2>
    <p>
      متن‌های عادی مقاله با فونت زیبای وزیرمتن رندر می‌شوند. برای تأکید می‌توانید از <strong>متن پررنگ</strong> و <em>مورب</em> استفاده کنید.
    </p>

    <!-- ۱. درج فرمول ریاضی LaTeX / KaTeX (با قابلیت کپی) -->
    <h3>معادله ریاضی</h3>
    <div class="math" data-caption="فرمول حل معادله درجه دو">
      x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
    </div>

    <p>
      فرمول‌های درون‌خطی (Inline Math) را نیز می‌توانید با $E = mc^2$ یا $\int_0^\infty e^{-x} dx$ بنویسید.
    </p>

    <!-- ۲. درج قطعه کد برنامه‌نویسی با Syntax Highlighting و دکمه کپی -->
    <h3>قطعه کد پایتون</h3>
    <pre><code class="language-python"># fibonacci.py
def fibonacci(n: int):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))</code></pre>

    <!-- ۳. درج جعبه نگارش خام (Raw Writing Box) -->
    <h3>متن خام / یادداشت</h3>
    <div class="writing" data-title="RAW NOTES" data-caption="یادداشت خام بدون پردازش">
# این یک متن خالص است
* بدون رندر شدن تگ‌ها
* کاراکترها دقیقاً به همان صورت نمایش داده می‌شوند
    </div>

    <!-- ۴. درج هنر اسکی یا آنسی رنگی درون مقاله -->
    <h3>هنر پایانه</h3>
    <pre class="ansi" data-title="TERMINAL LOGO" data-caption="لوگوی رترو">\x1b[1;36m┌────────────────────┐\x1b[0m
\x1b[1;36m│  \x1b[1;32mHELLO RETRO WORLD \x1b[1;36m│\x1b[0m
\x1b[1;36m└────────────────────┘\x1b[0m</pre>

    <!-- ۵. درج تصویر با کپشن غنی و امکان بزرگ‌نمایی تمام‌صفحه -->
    <div class="image" data-caption="توضیحات عکس مقاله">
      <img src="/photos/01-desert-night.jpg" alt="عکس کویر" />
    </div>

  </section>
</body>
</html>
```

---

## 🎨 ۲. راهنمای افزودن هنر اسکی و آنسی (ASCII & ANSI Art)

برای اضافه کردن یک اثر اسکی یا آنسی:
1. یک فایل با پسوند `.txt` در پوشه `public/asciiart/` بسازید (مثلاً `public/asciiart/my-art.txt`).
2. ساختار فایل شامل **هدر مشخصات** در بالا و **متن اثر** بعد از خط `---` است:

```text
Title: افق نئونی در کویر
EnglishTitle: SYNTHWAVE HORIZON
Date: 1405/05/20
Category: ANSI ART
IsAnsi: true
Featured: true
Description: ترکیب طیف‌های رنگی نئونی با نویسه‌های اسکی.
---
\x1b[1;35m                      .---.                      \x1b[0m
\x1b[1;35m                   .-'     '-.                   \x1b[0m
\x1b[1;31m                 .'   \x1b[1;33m.---.\x1b[1;31m   '.                 \x1b[0m
\x1b[1;31m                /    \x1b[1;33m/     \\\x1b[1;31m    \\                \x1b[0m
\x1b[1;33m               |    \x1b[1;37m|  SUN  |\x1b[1;33m    |               \x1b[0m
\x1b[1;34m══════════════════\x1b[1;35m'-.....-'\x1b[1;34m══════════════════════\x1b[0m
\x1b[1;36m  \\       |       /       \\       |       /      \x1b[0m
```

### راهنمای کدهای رنگی ANSI:
* `\x1b[1;31m` : قرمز پررنگ (Bright Red)
* `\x1b[1;32m` : سبز پررنگ (Bright Green)
* `\x1b[1;33m` : زرد / طلایی (Bright Yellow)
* `\x1b[1;34m` : آبی (Bright Blue)
* `\x1b[1;35m` : بنفش / سرخابی (Bright Magenta)
* `\x1b[1;36m` : فیروزه‌ای (Bright Cyan)
* `\x1b[1;37m` : سفید درخشان (Bright White)
* `\x1b[0m`    : بازنشانی رنگ (Reset to Default)

---

## 📷 ۳. راهنمای گالری عکاسی و نقاشی‌ها (Photos & Paintings)

برای افزودن عکس‌ها یا نقاشی‌ها:

### مرحله اول: فایل تصویر
فایل عکس خود را با فرمت `.jpg`، `.png` یا `.webp` در پوشه مورد نظر قرار دهید:
* عکاسی: `public/photos/my-photo.jpg`
* نقاشی و طراحی: `public/paintings/my-painting.jpg`

### مرحله دوم: فایل اطلاعات هم‌نام (`.txt`)
در کنار فایل تصویر، یک فایل متنی با **دقیقاً همان نام** ایجاد کنید:

#### نمونه برای عکس (`public/photos/my-photo.txt`):
```text
Title: شب پرستاره کویر
EnglishTitle: STARRY DESERT NIGHT
Date: 1405/05/18
Category: NIGHT SCENERY
Featured: true
Description: عکاسی لانگ اکسپوژر از کهکشان راه شیری در دل کویر مرنجاب.
Camera: Sony A7 IV
Lens: 24mm f/1.4 GM
Exposure: 25s, f/1.8, ISO 3200
Location: کویر مرنجاب، کاشان
```

#### نمونه برای نقاشی (`public/paintings/my-painting.txt`):
```text
Title: طنین سکوت
EnglishTitle: RESONANCE OF SILENCE
Date: 1405/05/10
Medium: رنگ روغن روی بوم
Dimensions: 70 × 100 cm
Featured: true
Description: کاوشی در فرم‌های انتزاعی و تضاد نور و تاریکی.
```

> **نکته:** اگر مایل به استفاده از لینک عکس‌های آنلاین هستید، کافی است در فایل `.txt` خط `ImageUrl: https://example.com/image.jpg` را اضافه کنید.

---

## 👤 ۴. ویرایش صفحه درباره من (About Me)

اطلاعات صفحه درباره من از فایل `public/about.html` لود می‌شود:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>درباره من | ABOUT ME</title>
</head>
<body>
  <h1>نام و نام خانوادگی</h1>
  <p class="role">برنامه‌نویس، پژوهشگر و طراح متنی</p>
  <p class="bio">
    متن بیوگرافی شخصی و مسیر کاری شما در این بخش نوشته می‌شود...
  </p>
</body>
</html>
```

همچنین اطلاعات پایه‌ای، لیست مهارت‌ها و شبکه‌های اجتماعی در `src/data/about.ts` قابل تنظیم هستند.

---

## 📚 ۵. ویرایش هنر اسکی / آنسی صفحه اول (Home Page ASCII/ANSI Art)

طرح اسکی صفحه اصلی در فایل متنی زیر قرار دارد:
📁 **`public/home-art.txt`**

شما می‌توانید مستقیماً این فایل را ویرایش کنید و نوع رندر و رنگ آن را در خط اول فایل مشخص کنید:

### حالت اول: نقاشی اسکی با رنگ اختصاصی یا سفید (Custom Color / White ASCII)
کافی است در خط اول فایل بنویسید `ascii#کدهگز` (یا فقط `ascii` برای رنگ سفید خالص):

```text
ascii#ffffff
  .____________________.
  |  PURE WHITE ASCII  |
  |____________________|
```
یا با هر رنگ دلخواه دیگری:
```text
ascii#f59e0b
  .____________________.
  |  AMBER GOLD ASCII  |
  |____________________|
```

### حالت دوم: اثر رنگارنگ با کدهای آنسی (Colored ANSI Art)
کافی است در خط اول فایل بنویسید `ansi` و در خطوط بعد از کدهای رنگی ANSI استفاده کنید:

```text
ansi
\x1b[1;32m  .____________________.\x1b[0m
\x1b[1;36m  |  MULTI-COLOR ANSI  |\x1b[0m
\x1b[1;32m  |____________________|\x1b[0m
```

سیستم به صورت خودکار هدر را تشخیص می‌دهد و هنر شما را دقیقاً با همان سبک و رنگ رندر می‌کند.

---

## 🛠️ دستورات اجرا و بررسی پروژه

* **اجرای نسخه توسعه (Dev Server):**
  ```bash
  npm run dev
  ```
* **تست تایپ‌اسکریپت و بررسی لایبرری‌ها:**
  ```bash
  npm run lint
  ```
* **کامپایل و بیلد نهایی برای انتشار:**
  ```bash
  npm run build
  ```

---

## ✨ ویژگی‌های فنی سیستم
- ⚡ **رندر سریع فرمول‌ها:** پشتیبانی از KaTeX با دقت بالا و بارگذاری سریع.
- 🎨 **موتور ANSI اختصاصی:** شناسایی و تفکیک رنگ‌های SGR بدون بهم ریختگی فونت.
- 📱 **واکنش‌گرایی کامل:** وسط‌چین در نمایشگرهای موبایل و چینش متوازن در دسکتاپ.
- 📋 **سیستم کپی سریع:** دکمه‌های کپی برای تمام فرمول‌های LaTeX، کدهای برنامه‌نویسی و هنرهای اسکی.
- 🔍 **فیلتر و جستجوی لحظه‌ای:** دسته‌بندی بر اساس تگ‌ها، موضوعات و تاریخ.
