# Toolskt - Digital Tools Platform

Toolskt is a comprehensive web-based toolkit platform offering various digital tools for users, including PDF editing, image manipulation, text conversion, and more.

## 🚀 Technology Stack

### Backend
- Python 3.9+
- Django 5.0
- Django REST Framework
- SimpleJWT for authentication
- SQLite (default database)

### Frontend
- Next.js 14
- React 18
- Redux Toolkit
- TailwindCSS
- Axios

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd tkd
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Create a `.env` file in the client directory
- Add the backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/
```

4. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
toolskt/
├── tkd/                    # Backend Django project
│   ├── admin_app/         # Admin management
│   ├── tools/             # Tools implementation
│   ├── users/             # User management
│   ├── subscription/      # Subscription handling
│   ├── pages/            # Static pages
│   └── tkd/              # Project settings
└── client/               # Frontend Next.js app
    ├── src/
    │   ├── app/         # Pages and routes
    │   ├── components/  # React components
    │   └── redux/      # State management
    └── public/         # Static assets
```

## 🔑 Key Features

- User Authentication & Authorization
- Multiple Tool Categories
- PDF Tools
- Image Processing Tools
- Text Manipulation Tools
- File Conversion Tools
- Responsive Design
- Admin Dashboard

## 💻 Development Guidelines

### Backend Development

- Follow PEP 8 style guide
- Create new apps for major feature sets
- Document API endpoints using docstrings
- Write unit tests for new features
- Use Django's built-in security features

### Frontend Development

- Follow component-based architecture
- Use TypeScript for new components
- Implement responsive design
- Follow Redux patterns for state management
- Use Tailwind utility classes for styling

## 🔒 Security Considerations

- Never commit sensitive information
- Use environment variables for secrets
- Implement rate limiting
- Validate user input
- Regular dependency updates
- Implement CORS properly

## 📝 API Documentation

The API endpoints are organized by apps:

- `/api/users/` - User management
- `/api/tools/` - Tools operations
- `/api/subscriptions/` - Subscription handling
- `/api/pages/` - Static page content

Detailed API documentation is available at `/api/docs/` when running in development mode.

## 🚀 Deployment

### Backend Deployment

1. Set `DEBUG=False` in production
2. Configure proper database (PostgreSQL recommended)
3. Use proper web server (Gunicorn/uWSGI)
4. Set up HTTPS
5. Configure ALLOWED_HOSTS

### Frontend Deployment

1. Build the production version:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📄 License

This project is proprietary and confidential.

## 📞 Support

For support and queries, contact the development team at [contact details].