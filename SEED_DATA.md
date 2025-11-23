# Database Seed Script

This script populates your MongoDB database with realistic dummy data for testing and demonstration purposes.

## What Gets Created

### 👨‍⚕️ Doctors (3)

- Dr. Sarah Johnson
- Dr. Michael Chen
- Dr. Emily Rodriguez

### 👥 Patients (5)

- John Smith
- Emma Wilson
- James Brown
- Olivia Davis
- William Martinez

### 📊 Data Created

- **5 Health Info records** - Complete health profiles with steps, sleep, medications, allergies
- **6 Appointments** - Mix of past (completed), upcoming (confirmed), and pending appointments
- **6 Health Goals** - Various goals like weight loss, steps, sleep, cholesterol
- **4 Medical Records** - Diagnoses, treatments, and prescriptions

## How to Run

### Option 1: Run Locally

```bash
cd backend
npm run seed
```

### Option 2: Run with Environment Variables

```bash
cd backend
MONGODB_URI=your_mongodb_uri npm run seed
```

## Login Credentials

### Doctors

```
Email: sarah.johnson@hospital.com
Password: doctor123

Email: michael.chen@hospital.com
Password: doctor123

Email: emily.rodriguez@hospital.com
Password: doctor123
```

### Patients

```
Email: john.smith@email.com
Password: patient123

Email: emma.wilson@email.com
Password: patient123

Email: james.brown@email.com
Password: patient123

Email: olivia.davis@email.com
Password: patient123

Email: william.martinez@email.com
Password: patient123
```

## Sample Data Details

### John Smith (Patient)

- **Health Info**: 8,500 steps, 45 min active, 7.5 hrs sleep
- **Conditions**: Hypertension
- **Medications**: Lisinopril 10mg
- **Allergies**: Penicillin
- **Goals**: 10,000 daily steps, lose 5kg
- **Appointments**: Completed checkup with Dr. Sarah Johnson

### Emma Wilson (Patient)

- **Health Info**: 10,200 steps, 60 min active, 8 hrs sleep
- **Conditions**: Seasonal allergies
- **Medications**: Cetirizine 10mg
- **Allergies**: Pollen, Dust
- **Goals**: 60 minutes daily exercise
- **Appointments**: Completed allergy consultation with Dr. Michael Chen

### James Brown (Patient)

- **Health Info**: 6,800 steps, 30 min active, 6.5 hrs sleep
- **Conditions**: Type 2 Diabetes
- **Medications**: Metformin 500mg
- **Goals**: Blood sugar control
- **Appointments**: Upcoming diabetes follow-up with Dr. Sarah Johnson

### Olivia Davis (Patient)

- **Health Info**: 12,000 steps, 75 min active, 7 hrs sleep
- **Conditions**: None
- **Allergies**: Shellfish
- **Goals**: 8 hours sleep nightly
- **Appointments**: Pending annual physical with Dr. Emily Rodriguez

### William Martinez (Patient)

- **Health Info**: 7,500 steps, 40 min active, 7.5 hrs sleep
- **Conditions**: High cholesterol
- **Medications**: Atorvastatin 20mg
- **Allergies**: Latex
- **Goals**: Lower LDL cholesterol
- **Appointments**: Confirmed cholesterol review with Dr. Michael Chen

## Appointment Timeline

- **Past (Completed)**:

  - John Smith - 7 days ago
  - Emma Wilson - 3 days ago

- **Upcoming (Confirmed)**:

  - William Martinez - Tomorrow
  - James Brown - In 2 days

- **Pending**:
  - Olivia Davis - In 5 days
  - John Smith - In 14 days

## Medical Records

The seed creates realistic medical records including:

- Diagnoses (Hypertension, Allergic Rhinitis, Type 2 Diabetes, Hyperlipidemia)
- Treatment plans
- Prescriptions with dosages
- Doctor's notes

## Important Notes

⚠️ **Warning**: This script will **DELETE ALL EXISTING DATA** in your database before seeding.

✅ **Safe to run**: Multiple times - it clears and recreates data each time

🔒 **Passwords**: All passwords are hashed using bcrypt

📅 **Dates**: Appointments are created relative to today's date

## Troubleshooting

### Connection Error

```
❌ MongoDB connection error
```

**Solution**: Check your `MONGODB_URI` in `.env` file

### Missing Dependencies

```
Error: Cannot find module 'bcryptjs'
```

**Solution**: Run `npm install` in the backend directory

### Permission Error

```
MongoServerError: not authorized
```

**Solution**: Check your MongoDB Atlas user permissions

## After Seeding

1. **Test Patient Login**: Use any patient credentials to see:

   - Health dashboard with real data
   - Appointments with assigned doctors
   - Health goals with progress
   - Personal health information

2. **Test Doctor Login**: Use any doctor credentials to see:

   - Patient appointments
   - Patient list with real data
   - Ability to manage appointments

3. **Test Features**:
   - Book new appointments (patients can select from 3 doctors)
   - Update health information
   - Create new goals
   - View medical records

## Resetting Data

To reset and reseed the database:

```bash
cd backend
npm run seed
```

This will clear all data and create fresh dummy data.

## Production Note

🚫 **DO NOT run this script in production!**

This script is for development and testing only. It will delete all production data.

---

Happy testing! 🎉
