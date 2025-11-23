require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Appointment = require("./models/Appointment");
const HealthInfo = require("./models/HealthInfo");
const Goal = require("./models/Goal");
const MedicalRecord = require("./models/MedicalRecord");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Appointment.deleteMany({});
    await HealthInfo.deleteMany({});
    await Goal.deleteMany({});
    await MedicalRecord.deleteMany({});

    // Create Doctors
    console.log("👨‍⚕️  Creating doctors...");
    const doctors = await User.create([
      {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@hospital.com",
        password: await bcrypt.hash("doctor123", 10),
        role: "doctor",
      },
      {
        name: "Dr. Michael Chen",
        email: "michael.chen@hospital.com",
        password: await bcrypt.hash("doctor123", 10),
        role: "doctor",
      },
      {
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@hospital.com",
        password: await bcrypt.hash("doctor123", 10),
        role: "doctor",
      },
    ]);

    // Create Patients
    console.log("👥 Creating patients...");
    const patients = await User.create([
      {
        name: "John Smith",
        email: "john.smith@email.com",
        password: await bcrypt.hash("patient123", 10),
        role: "patient",
      },
      {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        password: await bcrypt.hash("patient123", 10),
        role: "patient",
      },
      {
        name: "James Brown",
        email: "james.brown@email.com",
        password: await bcrypt.hash("patient123", 10),
        role: "patient",
      },
      {
        name: "Olivia Davis",
        email: "olivia.davis@email.com",
        password: await bcrypt.hash("patient123", 10),
        role: "patient",
      },
      {
        name: "William Martinez",
        email: "william.martinez@email.com",
        password: await bcrypt.hash("patient123", 10),
        role: "patient",
      },
    ]);

    // Create Health Info for patients
    console.log("💊 Creating health information...");
    await HealthInfo.create([
      {
        userId: patients[0]._id,
        steps: 8500,
        activeTime: 45,
        sleep: 7.5,
        weight: 75,
        height: 175,
        allergies: ["Penicillin"],
        medications: ["Lisinopril 10mg"],
        medicalHistory: "Hypertension, controlled with medication",
      },
      {
        userId: patients[1]._id,
        steps: 10200,
        activeTime: 60,
        sleep: 8,
        weight: 62,
        height: 165,
        allergies: ["Pollen", "Dust"],
        medications: ["Cetirizine 10mg"],
        medicalHistory: "Seasonal allergies",
      },
      {
        userId: patients[2]._id,
        steps: 6800,
        activeTime: 30,
        sleep: 6.5,
        weight: 88,
        height: 180,
        allergies: [],
        medications: ["Metformin 500mg"],
        medicalHistory: "Type 2 Diabetes, diagnosed 2 years ago",
      },
      {
        userId: patients[3]._id,
        steps: 12000,
        activeTime: 75,
        sleep: 7,
        weight: 58,
        height: 160,
        allergies: ["Shellfish"],
        medications: [],
        medicalHistory: "No significant medical history",
      },
      {
        userId: patients[4]._id,
        steps: 7500,
        activeTime: 40,
        sleep: 7.5,
        weight: 82,
        height: 178,
        allergies: ["Latex"],
        medications: ["Atorvastatin 20mg"],
        medicalHistory: "High cholesterol, family history of heart disease",
      },
    ]);

    // Create Appointments
    console.log("📅 Creating appointments...");
    const today = new Date();
    const appointments = await Appointment.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        time: "09:00",
        reason: "Regular checkup and blood pressure monitoring",
        status: "completed",
        notes: "Blood pressure stable. Continue current medication.",
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        time: "10:30",
        reason: "Allergy consultation",
        status: "completed",
        notes: "Prescribed antihistamines for seasonal allergies.",
      },
      {
        patientId: patients[2]._id,
        doctorId: doctors[0]._id,
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
        time: "14:00",
        reason: "Diabetes follow-up and A1C test",
        status: "confirmed",
      },
      {
        patientId: patients[3]._id,
        doctorId: doctors[2]._id,
        date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        time: "11:00",
        reason: "Annual physical examination",
        status: "pending",
      },
      {
        patientId: patients[4]._id,
        doctorId: doctors[1]._id,
        date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
        time: "15:30",
        reason: "Cholesterol level review",
        status: "confirmed",
      },
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
        time: "09:30",
        reason: "Follow-up appointment",
        status: "pending",
      },
    ]);

    // Create Goals
    console.log("🎯 Creating health goals...");
    await Goal.create([
      {
        userId: patients[0]._id,
        title: "Daily Steps Goal",
        description: "Walk 10,000 steps every day",
        targetValue: 10000,
        currentValue: 8500,
        unit: "steps",
        deadline: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: patients[0]._id,
        title: "Weight Loss",
        description: "Lose 5 kg in 3 months",
        targetValue: 70,
        currentValue: 75,
        unit: "kg",
        deadline: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000),
      },
      {
        userId: patients[1]._id,
        title: "Active Minutes",
        description: "Exercise for 60 minutes daily",
        targetValue: 60,
        currentValue: 60,
        unit: "minutes",
        deadline: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: patients[2]._id,
        title: "Blood Sugar Control",
        description: "Maintain fasting blood sugar below 120 mg/dL",
        targetValue: 120,
        currentValue: 135,
        unit: "mg/dL",
        deadline: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000),
      },
      {
        userId: patients[3]._id,
        title: "Sleep Quality",
        description: "Get 8 hours of sleep every night",
        targetValue: 8,
        currentValue: 7,
        unit: "hours",
        deadline: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: patients[4]._id,
        title: "Cholesterol Reduction",
        description: "Lower LDL cholesterol to below 100 mg/dL",
        targetValue: 100,
        currentValue: 125,
        unit: "mg/dL",
        deadline: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000),
      },
    ]);

    // Create Medical Records
    console.log("📋 Creating medical records...");
    await MedicalRecord.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        diagnosis: "Essential Hypertension",
        treatment: "Lifestyle modifications and medication",
        prescription: "Lisinopril 10mg once daily",
        notes:
          "Patient responding well to treatment. Blood pressure readings improving.",
        date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        diagnosis: "Allergic Rhinitis",
        treatment: "Antihistamine therapy",
        prescription: "Cetirizine 10mg once daily as needed",
        notes: "Seasonal allergies. Avoid known triggers.",
        date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[2]._id,
        doctorId: doctors[0]._id,
        diagnosis: "Type 2 Diabetes Mellitus",
        treatment: "Oral hypoglycemic agent and diet control",
        prescription: "Metformin 500mg twice daily with meals",
        notes:
          "HbA1c at 7.2%. Continue current regimen. Follow up in 3 months.",
        date: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[4]._id,
        doctorId: doctors[1]._id,
        diagnosis: "Hyperlipidemia",
        treatment: "Statin therapy and dietary modifications",
        prescription: "Atorvastatin 20mg once daily at bedtime",
        notes:
          "LDL cholesterol elevated. Advised low-fat diet and regular exercise.",
        date: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${doctors.length} doctors created`);
    console.log(`   - ${patients.length} patients created`);
    console.log(`   - ${appointments.length} appointments created`);
    console.log(`   - 5 health info records created`);
    console.log(`   - 6 goals created`);
    console.log(`   - 4 medical records created`);

    console.log("\n🔑 Login Credentials:");
    console.log("\n   Doctors:");
    console.log("   - sarah.johnson@hospital.com / doctor123");
    console.log("   - michael.chen@hospital.com / doctor123");
    console.log("   - emily.rodriguez@hospital.com / doctor123");
    console.log("\n   Patients:");
    console.log("   - john.smith@email.com / patient123");
    console.log("   - emma.wilson@email.com / patient123");
    console.log("   - james.brown@email.com / patient123");
    console.log("   - olivia.davis@email.com / patient123");
    console.log("   - william.martinez@email.com / patient123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed
connectDB().then(seedData);
