# Fix Doctors Without Availability

If you have manually added doctors who don't show time slots when patients try to book appointments, use this script to fix them.

## Problem

Manually added doctors (not created through the registration form) may not have availability set in the database, causing:

- No time slots showing when patients try to book
- "No available slots for this date" message

## Solution

Run the fix script to add default availability to all doctors without it.

### Local Environment

```bash
cd backend
npm run fix-doctors
```

### What It Does

The script will:

1. Find all doctors with empty availability
2. Add default availability:
   - **Monday-Thursday:** 9am-4pm (6 slots per day)
   - **Friday:** 9am-3pm (5 slots)
3. Set default profile values:
   - Specialization: "General Practice"
   - Experience: 0 years
   - Consultation Fee: $100

### Output Example

```
✅ MongoDB Connected
Found 1 doctors without availability

Updating doctor: Hemant (hemant@gmail.com)
✅ Updated Hemant

✅ All doctors updated successfully!

Default availability set:
- Monday-Thursday: 9am-4pm
- Friday: 9am-3pm

Doctors can customize their availability in Profile Settings
```

## After Running the Script

1. **Doctors can customize** their availability:

   - Login as doctor
   - Go to "Profile Settings"
   - Update specialization, experience, and fee
   - Customize weekly time slots

2. **Patients can now book** appointments:
   - Select the doctor
   - Choose a date
   - See available time slots
   - Book appointment

## For Production (Vercel)

If you need to run this on your production database:

1. **Update the script** to use production MongoDB URI
2. **Run locally** pointing to production:

   ```bash
   MONGODB_URI=your_production_uri node backend/fix-doctors-availability.js
   ```

3. **Or create a one-time API endpoint** (not recommended for security)

## Checking Doctor Availability

To check if a doctor has availability:

```bash
cd backend
node check-doctors.js
```

This will show all doctors and their availability status.

## Prevention

To prevent this issue in the future:

- ✅ Use the registration form (automatically sets availability)
- ✅ New doctors get default availability automatically
- ✅ Doctors can update their profile anytime

## Manual Database Update

If you prefer to update manually in MongoDB Atlas:

1. Go to your cluster
2. Browse Collections → healthcare-portal → users
3. Find the doctor document
4. Add this field:

```json
{
  "availability": {
    "monday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "wednesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "thursday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "friday": ["09:00", "10:00", "11:00", "14:00", "15:00"]
  },
  "specialization": "General Practice",
  "experience": 0,
  "consultationFee": 100
}
```

## Troubleshooting

### Script finds 0 doctors

- All doctors already have availability set
- Check with `node check-doctors.js`

### Time slots still not showing

1. Clear browser cache
2. Check doctor's availability in Profile Settings
3. Verify the date selected is a weekday
4. Check browser console for errors

### Appointments not showing for doctor

- Verify appointments have the correct `doctorId`
- Check doctor is logged in with correct account
- Appointments filter by `doctorId` automatically

---

**Note:** This script is safe to run multiple times. It only updates doctors with empty availability.
