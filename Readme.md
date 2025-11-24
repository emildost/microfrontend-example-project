# Microfrontend E-Commerce Project

<div align="center">

![Microfrontend Architecture](shared/assets/readme-banner.png)

**A Modern Microfrontend Architecture Implementation with Django Backend**

[![React](https://img.shields.io/badge/React-pink)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-green)](https://www.djangoproject.com/)
[![Webpack](https://img.shields.io/badge/Webpack-orange)](https://webpack.js.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)

</div>

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

- [🚀 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [⚙️ Prerequisites](#️-prerequisites)
- [🛠️ Installation & Setup](#️-installation--setup)
- [🎯 Microfrontend Details](#-microfrontend-details)
- [🔧 Development](#-development)
- [🐳 Docker Deployment](#-docker-deployment)
- [🚀 Production Deployment](#-production-deployment)
- [🔄 API Endpoints](#-api-endpoints)
- [🔍 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

</details>

## 🚀 Overview

This project demonstrates a modern **microfrontend architecture** for an e-commerce application. The system consists of multiple independent frontend applications (microfrontends) that work together seamlessly, powered by a Django REST API backend.

### ✨ Key Features

- 🏗️ **Modular Architecture**: Independent microfrontends that can be developed and deployed separately
- 🔧 **Technology Flexibility**: Each microfrontend can use different technologies (currently all React)
- 🚀 **Independent Deployment**: Deploy components separately to different servers
- 🔗 **Loose Coupling**: Microfrontends communicate through events and shared APIs
- 🐳 **Containerized**: Full Docker support for easy development and deployment
- 📱 **Responsive Design**: Mobile-first responsive UI components

## 🏗️ Architecture


### System Architecture

```
┌─────────────────┐    ┌──────────────────┐
│   Shell App     │    │   Microfrontends │
│   (Container)   │◄───┤   (Components)   │
│   Port: 3000    │    │   Ports: 3001-4  │
└─────────────────┘    └──────────────────┘
         │                       │
         └───────┬───────┬───────┘
                 │       │
         ┌───────▼───────▼───────┐
         │   Django Backend      │
         │   Port: 8000          │
         └───────────────────────┘
```

### Communication Flow

1. **Shell Application** loads microfrontends dynamically using Webpack
2. **Microfrontends** register themselves in the global window object
3. **Components** communicate through Custom Events
4. **All frontends** consume the same Django REST API

## 📁 Project Structure

<details>
<summary>Click to view detailed structure</summary>

```
microfrontend-project/
├── 📁 apps/                          # Frontend applications
│   ├── 📁 shell/                     # Main container application
│   │   ├── 📁 src/
│   │   │   ├── App.jsx               # Main shell component
│   │   │   ├── App.css               # Shell styles
│   │   │   └── index.js              # Entry point
│   │   ├── package.json
│   │   ├── webpack.config.js
│   │   ├── Dockerfile
│   │   └── nginx.conf
│   │
│   ├── 📁 header/                    # Header microfrontend
│   │   ├── 📁 src/
│   │   │   ├── Header.jsx            # Header component
│   │   │   ├── Header.css
│   │   │   └── index.js
│   │   └── (similar structure...)
│   │
│   ├── 📁 product-list/              # Product listing microfrontend
│   ├── 📁 user-profile/              # User profile microfrontend
│   └── 📁 cart/                      # Shopping cart microfrontend
│
├── 📁 backend/                       # Django REST API
│   ├── 📁 ecommerce/
│   │   ├── 📁 products/
│   │   │   ├── models.py             # Database models
│   │   │   ├── views.py              # API views
│   │   │   ├── serializers.py        # Data serializers
│   │   │   └── urls.py               # API routes
│   │   ├── settings.py               # Django settings
│   │   └── urls.py                   # Main URLs
│   ├── requirements.txt
│   ├── Dockerfile
│   └── create_sample_data.py         # Sample data generator
│
├── 📁 shared/                        # Shared utilities and types
├── docker-compose.yml                # Multi-container setup
├── package.json                      # Root package.json
└── turbo.json                        # Build system configuration
```

</details>

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 16.x or higher | JavaScript runtime |
| npm | 7.x or higher | Package manager |
| Python | 3.8 or higher | Backend runtime |
| Docker | 20.x or higher | Containerization |
| Docker Compose | 2.x or higher | Multi-container management |

### Verification Commands

```sh
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Python version
python --version

# Check Docker installation
docker --version
docker-compose --version
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: node: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 11: npm: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 14: python: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 17: docker: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 18: docker-compose: command not found
```

## 🛠️ Installation & Setup

### Step 1: Clone and Setup Project Structure

```sh
git clone https://github.com/qiyascc/microfrontend-example/
cd microfrontend-example


# Initialize root package.json
cd Shared/
npm init -y
```

```text
Cloning into 'microfrontend-example'...
fatal: could not read Username for 'https://github.com': Device not configured
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: cd: microfrontend-example: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 12: cd: Shared/: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 13: npm: command not found
```

### Step 2: Backend Setup (Django)

<details>
<summary>Click for detailed backend setup</summary>

```sh
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requierements.txt


```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 7: cd: backend: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 10: python: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 14: venvScriptsactivate: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 16: venv/bin/activate: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 19: pip: command not found
```

**Complete backend setup continues...**
</details>





## 🎯 Microfrontend Details

### 1. Shell Application (Container)
- **Port**: 3000
- **Role**: Main container that loads and orchestrates all microfrontends
- **Features**: Dynamic script loading, error handling, layout management

### 2. Header Microfrontend
- **Port**: 3001
- **Role**: Navigation and site header
- **Features**: Responsive menu, logo, navigation links

### 3. Product List Microfrontend
- **Port**: 3002
- **Role**: Display and manage product catalog
- **Features**: Product grid, search, add to cart functionality

### 4. User Profile Microfrontend
- **Port**: 3003
- **Role**: User information and account management
- **Features**: Profile display, order history, settings

### 5. Cart Microfrontend
- **Port**: 3004
- **Role**: Shopping cart management
- **Features**: Add/remove items, quantity management, checkout

## 🔧 Development

### Running in Development Mode

#### Option 1: Run All Services with Docker (Recommended)

```sh
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 11: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 14: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 17: docker-compose: command not found
```

#### Option 2: Run Services Individually

**Backend:**

```sh
cd backend
python manage.py migrate
python create_sample_data.py
python manage.py runserver
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 7: cd: backend: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: python: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 9: python: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 10: python: command not found
```

**Frontends (run in separate terminals):**

```sh
# Shell app
cd apps/shell && npm run dev

# Header microfrontend
cd apps/header && npm run dev

# Product list microfrontend
cd apps/product-list && npm run dev

# User profile microfrontend
cd apps/user-profile && npm run dev

# Cart microfrontend
cd apps/cart && npm run dev
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: cd: apps/shell: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 11: cd: apps/header: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 14: cd: apps/product-list: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 17: cd: apps/user-profile: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 20: cd: apps/cart: No such file or directory
```

### Access Points

| Service | URL | Port |
|---------|-----|------|
| Shell Application | http://localhost:3000 | 3000 |
| Header MF | http://localhost:3001 | 3001 |
| Product List MF | http://localhost:3002 | 3002 |
| User Profile MF | http://localhost:3003 | 3003 |
| Cart MF | http://localhost:3004 | 3004 |
| Django API | http://localhost:8000 | 8000 |
| Django Admin | http://localhost:8000/admin | 8000 |

## 🐳 Docker Deployment

### Docker Compose Configuration

**docker-compose.yml**

```yaml
version: '3.8'

services:
  shell:
    build: ./apps/shell
    ports: ["3000:80"]
    environment:
      - REACT_APP_HEADER_URL=http://localhost:3001/remoteEntry.js
      - REACT_APP_PRODUCT_LIST_URL=http://localhost:3002/remoteEntry.js
      - REACT_APP_USER_PROFILE_URL=http://localhost:3003/remoteEntry.js
      - REACT_APP_CART_URL=http://localhost:3004/remoteEntry.js
    depends_on:
      - header
      - product-list
      - user-profile
      - cart

  header:
    build: ./apps/header
    ports: ["3001:80"]

  product-list:
    build: ./apps/product-list
    ports: ["3002:80"]
    environment:
      - REACT_APP_API_URL=http://backend:8000

  user-profile:
    build: ./apps/user-profile
    ports: ["3003:80"]
    environment:
      - REACT_APP_API_URL=http://backend:8000

  cart:
    build: ./apps/cart
    ports: ["3004:80"]

  backend:
    build: ./backend
    ports: ["8000:8000"]
    volumes:
      - ./backend:/app
    command: >
      sh -c "python manage.py migrate &&
             python create_sample_data.py &&
             python manage.py runserver 0.0.0.0:8000"

networks:
  microfrontend-network:
    driver: bridge
```

### Docker Commands

```sh
# Build images
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild specific service
docker-compose build shell

# View service logs
docker-compose logs shell
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 11: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 14: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 17: docker-compose: command not found
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 20: docker-compose: command not found
```

## 🚀 Production Deployment

### Individual Service Deployment

Each microfrontend can be deployed to separate servers:

```sh
# Build each microfrontend
cd apps/shell && npm run build
cd apps/header && npm run build
cd apps/product-list && npm run build
cd apps/user-profile && npm run build
cd apps/cart && npm run build

# Deploy to different servers
scp -r apps/shell/dist/* user@shell-server:/var/www/html/
scp -r apps/header/dist/* user@header-server:/var/www/html/
scp -r apps/product-list/dist/* user@products-server:/var/www/html/
scp -r apps/user-profile/dist/* user@profile-server:/var/www/html/
scp -r apps/cart/dist/* user@cart-server:/var/www/html/
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 8: cd: apps/shell: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 9: cd: apps/header: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 10: cd: apps/product-list: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 11: cd: apps/user-profile: No such file or directory
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 12: cd: apps/cart: No such file or directory
scp: stat local "apps/shell/dist/*": No such file or directory
scp: stat local "apps/header/dist/*": No such file or directory
scp: stat local "apps/product-list/dist/*": No such file or directory
scp: stat local "apps/user-profile/dist/*": No such file or directory
scp: stat local "apps/cart/dist/*": No such file or directory
```

### Environment Variables for Production

**Shell Environment:**

```sh
REACT_APP_HEADER_URL=https://header.yourdomain.com/remoteEntry.js
REACT_APP_PRODUCT_LIST_URL=https://products.yourdomain.com/remoteEntry.js
REACT_APP_USER_PROFILE_URL=https://profile.yourdomain.com/remoteEntry.js
REACT_APP_CART_URL=https://cart.yourdomain.com/remoteEntry.js
```

**Microfrontend Environment:**

```sh
REACT_APP_API_URL=https://api.yourdomain.com
```

## 🔄 API Endpoints

### Products API
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Create new product
- `PUT /api/products/{id}/` - Update product
- `DELETE /api/products/{id}/` - Delete product

### Users API
- `GET /api/users/` - List users
- `GET /api/users/{id}/` - Get user details
- `POST /api/users/` - Create user

### Categories API
- `GET /api/categories/` - List categories
- `GET /api/categories/{id}/` - Get category details

## 🔍 Troubleshooting

### Common Issues and Solutions

<details>
<summary>Microfrontends not loading</summary>

**Problem:** Components show "Loading..." but never load
**Solution:**
1. Check if microfrontend servers are running
2. Verify CORS headers are set correctly
3. Check browser console for script loading errors
4. Ensure components are exported to window object

```js
// In each microfrontend's main component
if (typeof window !== 'undefined') {
  window.ComponentName = ComponentName;
}
```

</details>

<details>
<summary>CORS errors</summary>

**Problem:** Browser shows CORS policy errors
**Solution:**
1. Ensure Django CORS headers are configured
2. Check nginx CORS settings in each microfrontend
3. Verify all services are using same-origin or proper CORS headers

```python
# In Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    # ... all other ports
]
```

```text
  File "/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/mdlab.py", line 12
    print(], flush=True)
          ^
SyntaxError: closing parenthesis ']' does not match opening parenthesis '('
```

</details>

<details>
<summary>Docker container issues</summary>

**Problem:** Containers failing to start
**Solution:**
1. Check Dockerfile paths and context
2. Verify port mappings aren't conflicting
3. Check container logs: `docker-compose logs service_name`
4. Ensure all required environment variables are set
</details>

### Debugging Tips

1. **Check Service Status:**

```sh
   docker-compose ps
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 7: docker-compose: command not found
```

2. **View Logs:**

```sh
   docker-compose logs -f shell
```

```text
/var/folders/g7/d4w9m3xd30l40fsndk7s4vnh0000gn/T/mdlab/main: line 7: docker-compose: command not found
```

3. **Test API Endpoints:**

```sh
   curl http://localhost:8000/api/products/
```

```text
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 8000 after 0 ms: Couldn't connect to server
```

4. **Browser Developer Tools:**
   - Check Network tab for failed requests
   - Look for JavaScript errors in Console
   - Verify components are registered in window object

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test all microfrontends individually
5. Submit a pull request

### Code Standards

- Use consistent naming conventions
- Follow React best practices
- Include proper error handling
- Write meaningful commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---