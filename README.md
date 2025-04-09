# 📊 DATA 5570 Spring 2025 – Full Stack Project

This is a full-stack project built with **Django + Django REST Framework** on the back end and **Expo (React Native + Web)** on the front end. It supports AWS Cognito authentication and a secure API layer.

---

## ✨ Getting Started

Clone the repository:

```bash
git clone git@github.com:Manodiestra/data5570-spring-2025.git
cd data5570-spring-2025
```

---

## 🛠️ Back End Setup (Django)

1. Create and activate a virtual environment:

    ```bash
    python3 -m venv myvenv
    source myvenv/bin/activate
    ```

2. Install dependencies:

    ```bash
    pip install django djangorestframework django-cors-headers requests python-dotenv python-jose
    ```

3. Navigate into the Django backend directory:

    ```bash
    cd django_back_end
    ```

4. Make database migrations:

    ```bash
    python manage.py makemigrations api_app
    python manage.py migrate
    ```

5. Run the development server:

    ```bash
    python manage.py runserver
    ```

   Or to expose the server externally:

    ```bash
    python manage.py runserver 0.0.0.0:8000
    ```

---

## 📱 Front End Setup (Expo)

1. Navigate to the Expo project directory:

    ```bash
    cd expo-class-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the Expo development server:

    ```bash
    npm start
    ```

---

## 🔐 Environment Variables

Create a `.env` file in the root of your Django project and add:

```env
COGNITO_REGION=us-east-1
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_APP_CLIENT_ID=your_app_client_id
```

For the Expo front end, create a `.env` or `.env.local` and configure:

```env
EXPO_PUBLIC_COGNITO_REGION=us-east-1
EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN=https://your-domain.auth.us-east-1.amazoncognito.com
EXPO_PUBLIC_COGNITO_CLIENT_ID=your_client_id
```

---

## 🧠 Notes

- The project uses **AWS Cognito Hosted UI** and the **Authorization Code Flow with PKCE** for authentication.
- On mobile, tokens are securely stored using `expo-secure-store`.
- The Django backend validates JWT tokens using Cognito’s public JWKS keys.

