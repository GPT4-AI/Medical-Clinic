import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize database
export async function openDb() {
  return open({
    filename: "./medical_clinic.db",
    driver: sqlite3.Database,
  });
}

// Initialize database tables
export async function initDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      phone TEXT,
      email TEXT,
      last_visit TEXT
    );

    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      specialization TEXT,
      experience INTEGER,
      phone TEXT,
      email TEXT,
      availability TEXT
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      date TEXT,
      time TEXT,
      type TEXT,
      status TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id),
      FOREIGN KEY (doctor_id) REFERENCES doctors (id)
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      date TEXT,
      time TEXT,
      type TEXT,
      diagnosis TEXT,
      status TEXT,
      notes TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id),
      FOREIGN KEY (doctor_id) REFERENCES doctors (id)
    );

    CREATE TABLE IF NOT EXISTS treatments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      treatment_type TEXT,
      start_date TEXT,
      end_date TEXT,
      status TEXT,
      cost REAL,
      FOREIGN KEY (patient_id) REFERENCES patients (id),
      FOREIGN KEY (doctor_id) REFERENCES doctors (id)
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT UNIQUE,
      patient_id INTEGER,
      doctor_id INTEGER,
      date TEXT,
      due_date TEXT,
      amount REAL,
      status TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id),
      FOREIGN KEY (doctor_id) REFERENCES doctors (id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_id INTEGER,
      amount REAL,
      method TEXT,
      status TEXT,
      reference TEXT,
      date TEXT,
      FOREIGN KEY (invoice_id) REFERENCES invoices (id)
    );

    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_id INTEGER,
      day_of_week TEXT,
      start_time TEXT,
      end_time TEXT,
      max_patients INTEGER,
      current_bookings INTEGER,
      status TEXT,
      FOREIGN KEY (doctor_id) REFERENCES doctors (id)
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      message TEXT,
      type TEXT,
      priority TEXT,
      timestamp TEXT,
      status TEXT,
      recipient TEXT
    );
  `);

  return db;
}
