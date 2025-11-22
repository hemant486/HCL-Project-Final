# Healthcare Portal 🏥

A modern doctor-patient healthcare management system with activity tracking, appointments, and medical records.

## Architecture

![Healthcare Portal Architecture](./architecture-diagram.png)

The system follows a microservices architecture with:

- **React Frontend** - Patient Portal, Provider Portal, and Public Health Page
- **Express API Gateway** - Routes and authenticates requests
- **Backend Services** - Tracker, Provider, Patient, and Appointment services
- **MongoDB** - Stores Goals, Users, Patients, and Appointments data

## Features

### For Patients

- 📊 Track daily health metrics (Steps, Active Time, Sleep)
- 📅 Book and manage appointments
- 📋 View medical records and prescriptions
- 🎯 Set and track health goals
- 👤 Manage personal profile

### For Doctors

- 👥 View patient list
- 📅 Manage appointments (confirm/complete)
- 📝 Create medical records
- 💊 Add prescriptions

### Security

- 🔐 JWT authentication
- 🔒 Password hashing with bcrypt
- 🛡️ Protected routes
- 🔑 Role-based access (Patient/Doctor)

## Tech Stack

**Frontend:**

- React 18 + Vite
- Tailwind CSS
- React Router
- Axios

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Setup Environment

Create `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority
JWT_SECRET=healthcare_portal_super_secret_key_2024
```

### 3. Run the Application

```bash
# From root directory
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access the app:**

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## Project Structure

```
healthcare-portal/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── config/          # Database config
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── services/    # API services
│   └── package.json
└── README.md
```

## Usage

### Register

1. Go to http://localhost:3000
2. Click "Register"
3. Choose role (Patient or Doctor)
4. Fill in details and submit

### Login

1. Click "Login"
2. Enter email and password
3. Access your dashboard

### Track Health

1. Go to "Health Info"
2. Enter daily metrics:
   - Steps (steps/day)
   - Active Time (minutes/day)
   - Sleep (hours/night)
3. Add weight, height, allergies, medications
4. Save information

### Book Appointment

1. Go to "Appointments"
2. Click "Book Appointment"
3. Select date, time, and reason
4. Submit

### Set Goals

1. Go to "Goals"
2. Click "New Goal"
3. Set target and deadline
4. Track progress

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Health

- `GET /api/health` - Get health info
- `POST /api/health` - Update health info

### Appointments

- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Create appointment
- `PATCH /api/appointments/:id` - Update appointment

### Medical Records

- `GET /api/records` - Get medical records
- `POST /api/records` - Create record (doctors only)

### Goals

- `GET /api/goals` - Get health goals
- `POST /api/goals` - Create goal
- `PATCH /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

## Color Theme

The app uses a soft, healthcare-themed color palette:

- **Teal/Green** - Primary navigation and health
- **Violet** - Steps tracking
- **Orange** - Active time
- **Indigo** - Sleep tracking
- **Emerald** - Body metrics
- **Cyan** - Appointments
- **Rose** - Medical information

## Database Models

### User

- name, email, password (hashed)
- role (patient/doctor)
- phone, address, dateOfBirth, gender

### HealthInfo

- steps, activeTime, sleep
- weight, height
- allergies, medications
- medicalHistory

### Appointment

- patientId, doctorId
- date, time, reason
- status (pending/confirmed/completed/cancelled)

### MedicalRecord

- patientId, doctorId
- diagnosis, treatment
- prescription, notes

### Goal

- title, description
- targetValue, currentValue, unit
- progress (0-100%)
- deadline

## Development

```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend
npm run dev

# Run backend only
npm run backend

# Run frontend only
npm run frontend
```

## Environment Variables

**Backend (.env):**

- `PORT` - Server port (default: 5001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

**Frontend (.env):**

- `VITE_API_URL` - Backend API URL (default: http://localhost:5001/api)

## License

MIT

## Support

For issues or questions, check the MongoDB connection and ensure all dependencies are installed correctly.

---

Built with ❤️ for healthcare management
