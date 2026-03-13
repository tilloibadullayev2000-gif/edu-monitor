"use client";

import { useEffect, useState } from "react";

type Attendance = {
  objectId: string;
  studentName: string;
  date: string;
  status: string;
};

type Student = {
  objectId: string;
  fullName: string;
};

export default function AttendancePage() {
  const [items, setItems] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [studentName, setStudentName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Keldi");

  const fetchAttendance = async () => {
    try {
      const response = await fetch("/api/attendance", { cache: "no-store" });
      const data = await response.json();
      setItems(data.results || []);
    } catch (error) {
      console.error("Attendance load error:", error);
      setItems([]);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students", { cache: "no-store" });
      const data = await response.json();
      const list = data.results || [];
      setStudents(list);

      if (list.length > 0) {
        setStudentName(list[0].fullName || "");
      }
    } catch (error) {
      console.error("Students load error:", error);
      setStudents([]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: String(studentName),
          date: String(date),
          status: String(status),
        }),
      });

      const text = await response.text();
      let data: any = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text };
      }

      if (!response.ok) {
        setMessage("Xatolik: " + (data.error || "Saqlanmadi"));
        return;
      }

      setMessage("Davomat muvaffaqiyatli saqlandi!");
      setDate("");
      setStatus("Keldi");
      fetchAttendance();
    } catch (error: any) {
      setMessage(
        "Xatolik: " + (error?.message || "Server bilan ulanishda xatolik")
      );
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchAttendance(), fetchStudents()]);
      setLoading(false);
    };

    loadAll();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-black">Attendance bo‘limi</h1>
          <p className="mt-2 text-slate-700">
            O‘quvchi davomatini qo‘shish va ro‘yxatini ko‘rish
          </p>

          <form
            onSubmit={handleSave}
            className="mt-8 grid gap-4 md:grid-cols-3"
          >
            <select
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            >
              {students.length === 0 ? (
                <option value="">O‘quvchi topilmadi</option>
              ) : (
                students.map((student) => (
                  <option key={student.objectId} value={student.fullName}>
                    {student.fullName}
                  </option>
                ))
              )}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            >
              <option>Keldi</option>
              <option>Kelmadi</option>
              <option>Kechikdi</option>
            </select>

            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 md:col-span-3"
            >
              Saqlash
            </button>
          </form>

          {message && (
            <p className="mt-6 rounded-xl bg-slate-100 px-4 py-3 text-slate-800">
              {message}
            </p>
          )}
        </div>

        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-black">Davomat ro‘yxati</h2>

          {loading ? (
            <p className="mt-6 text-slate-700">Yuklanmoqda...</p>
          ) : items.length === 0 ? (
            <p className="mt-6 text-slate-700">Hozircha davomat yo‘q.</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-left">
                    <th className="px-4 py-3 text-black">O‘quvchi</th>
                    <th className="px-4 py-3 text-black">Sana</th>
                    <th className="px-4 py-3 text-black">Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.objectId}
                      className="border-b border-slate-200"
                    >
                      <td className="px-4 py-3 text-black">
                        {item.studentName}
                      </td>
                      <td className="px-4 py-3 text-black">{item.date}</td>
                      <td className="px-4 py-3 text-black">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}