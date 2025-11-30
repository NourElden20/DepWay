# 🐳 منصة Dockerization

منصة متكاملة لتحويل مشاريع GitHub إلى Docker containers ورفعها على Docker Hub.

## المميزات

- 🔐 تسجيل الدخول عبر GitHub
- 📁 عرض مشاريع GitHub
- 🔍 تحليل تلقائي للمشاريع
- 🐳 إنشاء Dockerfiles تلقائياً
- 🚀 رفع الصور على Docker Hub
- ⚙️ إدارة المنافذ (Ports)
- 🎛️ إدارة الـ Containers

## التقنيات المستخدمة

### Backend
- Node.js
- Express.js
- Dockerode
- GitHub API
- Docker Hub API

### Frontend
- React.js
- Styled Components
- Axios
- React Toastify

## التثبيت والتشغيل

### 1. تثبيت المتطلبات

```bash
# تثبيت dependencies للـ backend
npm install

# تثبيت dependencies للـ frontend
cd client
npm install
cd ..
```

### 2. إعداد متغيرات البيئة

انسخ ملف `env.example` إلى `.env` واملأ القيم:

```bash
cp env.example .env
```

### 3. إعداد GitHub

1. اذهب إلى GitHub Settings > Developer settings > Personal access tokens
2. أنشئ token جديد مع الصلاحيات التالية:
   - `repo` (للوصول للمشاريع)
   - `user` (للوصول لمعلومات المستخدم)

### 4. إعداد Docker Hub

1. سجل في Docker Hub
2. أدخل بياناتك في ملف `.env`

### 5. تشغيل التطبيق

```bash
# تشغيل الـ backend
npm run dev

# في terminal منفصل، تشغيل الـ frontend
cd client
npm start
```

## كيفية الاستخدام

### 1. إعداد GitHub Token
- أدخل GitHub Personal Access Token في الحقل المخصص
- اضغط "جلب المشاريع" لعرض مشاريعك

### 2. إعداد Docker Hub
- أدخل Docker Hub username
- تأكد من تسجيل الدخول في Docker على جهازك

### 3. إعداد المنافذ
- حدد المنافذ المطلوبة للمشروع
- يمكن إضافة/حذف منافذ حسب الحاجة

### 4. تحويل المشروع
- اختر مشروع من القائمة
- اضغط "تحويل إلى Docker"
- انتظر حتى يتم إنشاء الصورة ورفعها

### 5. إدارة الـ Containers
- عرض الصور المتاحة
- تشغيل/إيقاف الـ containers
- مراقبة حالة الـ containers

## أنواع المشاريع المدعومة

- **Node.js** (React, Express, Vue)
- **Python** (Flask, Django)
- **Java** (Spring Boot)
- **Ruby** (Rails)
- **PHP** (Laravel, Symfony)

## هيكل المشروع

```
dockerization/
├── server.js              # Backend server
├── package.json           # Backend dependencies
├── client/                # Frontend React app
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Styles
│   └── package.json       # Frontend dependencies
├── temp/                  # Temporary files
└── README.md
```

## API Endpoints

- `GET /api/repos` - جلب مشاريع GitHub
- `GET /api/repo/:owner/:repo` - تفاصيل مشروع
- `POST /api/dockerize` - تحويل مشروع إلى Docker
- `GET /api/images` - عرض Docker images
- `GET /api/containers` - عرض الـ containers
- `POST /api/containers/:id/start` - تشغيل container
- `POST /api/containers/:id/stop` - إيقاف container

## المتطلبات

- Node.js 14+
- Docker
- Git
- GitHub account
- Docker Hub account

## المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الـ branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

إذا واجهت أي مشاكل، يرجى فتح issue في GitHub أو التواصل معنا.
