import { openDb } from "./db";

// Generic CRUD operations
export async function getAll(table: string) {
  const db = await openDb();
  return db.all(`SELECT * FROM ${table}`);
}

export async function getById(table: string, id: number) {
  const db = await openDb();
  return db.get(`SELECT * FROM ${table} WHERE id = ?`, id);
}

export async function create(table: string, data: any) {
  const db = await openDb();
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(",");

  const result = await db.run(
    `INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`,
    values,
  );

  return result;
}

export async function update(table: string, id: number, data: any) {
  const db = await openDb();
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((key) => `${key} = ?`).join(",");

  const result = await db.run(`UPDATE ${table} SET ${setClause} WHERE id = ?`, [
    ...values,
    id,
  ]);

  return result;
}

export async function remove(table: string, id: number) {
  const db = await openDb();
  return db.run(`DELETE FROM ${table} WHERE id = ?`, id);
}

// Specific queries for related data
export async function getAppointmentsWithDetails() {
  const db = await openDb();
  return db.all(`
    SELECT 
      a.*,
      p.name as patient_name,
      d.name as doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
  `);
}

export async function getConsultationsWithDetails() {
  const db = await openDb();
  return db.all(`
    SELECT 
      c.*,
      p.name as patient_name,
      d.name as doctor_name
    FROM consultations c
    JOIN patients p ON c.patient_id = p.id
    JOIN doctors d ON c.doctor_id = d.id
  `);
}

export async function getTreatmentsWithDetails() {
  const db = await openDb();
  return db.all(`
    SELECT 
      t.*,
      p.name as patient_name,
      d.name as doctor_name
    FROM treatments t
    JOIN patients p ON t.patient_id = p.id
    JOIN doctors d ON t.doctor_id = d.id
  `);
}

export async function getInvoicesWithDetails() {
  const db = await openDb();
  return db.all(`
    SELECT 
      i.*,
      p.name as patient_name,
      d.name as doctor_name
    FROM invoices i
    JOIN patients p ON i.patient_id = p.id
    JOIN doctors d ON i.doctor_id = d.id
  `);
}

export async function getPaymentsWithDetails() {
  const db = await openDb();
  return db.all(`
    SELECT 
      p.*,
      i.invoice_number,
      pat.name as patient_name,
      d.name as doctor_name
    FROM payments p
    JOIN invoices i ON p.invoice_id = i.id
    JOIN patients pat ON i.patient_id = pat.id
    JOIN doctors d ON i.doctor_id = d.id
  `);
}

export async function getSchedulesWithDetails() {
  const db = await openDb();
  return db.all(`
    SELECT 
      s.*,
      d.name as doctor_name,
      d.specialization as department
    FROM schedules s
    JOIN doctors d ON s.doctor_id = d.id
  `);
}
