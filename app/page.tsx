"use client";

import { useEffect, useState } from "react";

type Student = {
  objectId: string;
};

type Payment = {
  objectId: string;
  amount: string | number;
};

type Attendance = {
  objectId: string;
};

export default function HomePage() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [paymentsTotal, setPaymentsTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchJsonSafe = async (url: string) => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!res.ok) return { results: [] };
      return data;
    } catch {
      return { results: [] };
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      const studentsData = await fetchJsonSafe("/api/students");
      const paymentsData = await fetchJsonSafe("/api/payments");
      const attendanceData = await fetchJsonSafe("/api/attendance");

      const students: Student[] = studentsData.results || [];
      const payments: Payment[] = paymentsData.results || [];
      const attendance: Attendance[] = attendanceData.results || [];

      setStudentsCount(students.length);
      setPaymentsCount(payments.length);
      setAttendanceCount(attendance.length);

      const total = payments.reduce((sum, item) => {
        return sum + Number(item.amount || 0);
      }, 0);

      setPaymentsTotal(total);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold text-black">Edu Monitor Dashboard</h1>
          <p className="mt-2 text-slate-700">
            Barcha bo‘limlar bo‘yicha qisqacha ma’lumot
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-slate-700">Yuklanmoqda...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Jami o‘quvchilar</p>
                <h2 className="mt-3 text-4xl font-bold text-black">
                  {studentsCount}
                </h2>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Jami to‘lovlar soni</p>
                <h2 className="mt-3 text-4xl font-bold text-black">
                  {paymentsCount}
                </h2>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Jami davomat yozuvi</p>
                <h2 className="mt-3 text-4xl font-bold text-black">
                  {attendanceCount}
                </h2>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Jami to‘lov summasi</p>
                <h2 className="mt-3 text-4xl font-bold text-black">
                  {paymentsTotal.toLocaleString()} so‘m
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <a
                href="/students"
                className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-black">Students</h3>
                <p className="mt-2 text-slate-700">
                  O‘quvchilar ro‘yxati, qidirish, tahrirlash, o‘chirish
                </p>
              </a>

              <a
                href="/payments"
                className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-black">Payments</h3>
                <p className="mt-2 text-slate-700">
                  To‘lov qo‘shish va to‘lovlar ro‘yxatini ko‘rish
                </p>
              </a>

              <a
                href="/attendance"
                className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-black">Attendance</h3>
                <p className="mt-2 text-slate-700">
                  Davomat qo‘shish va davomat ro‘yxatini ko‘rish
                </p>
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}