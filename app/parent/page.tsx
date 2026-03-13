"use client";

import { useEffect, useMemo, useState } from "react";

type Student = {
  objectId: string;
  fullName: string;
  groupName: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  balance: number;
};

type Payment = {
  objectId: string;
  studentName: string;
  amount: string;
  status: string;
  date: string;
};

type Attendance = {
  objectId: string;
  studentName: string;
  date: string;
  status: string;
};

type Grade = {
  objectId: string;
  studentName: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  vocabulary: string;
};

export default function ParentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      const [studentsRes, paymentsRes, attendanceRes, gradesRes] =
        await Promise.all([
          fetch("/api/students", { cache: "no-store" }),
          fetch("/api/payments", { cache: "no-store" }),
          fetch("/api/attendance", { cache: "no-store" }),
          fetch("/api/grades", { cache: "no-store" }),
        ]);

      const studentsData = await studentsRes.json();
      const paymentsData = await paymentsRes.json();
      const attendanceData = await attendanceRes.json();
      const gradesData = await gradesRes.json();

      const studentsList: Student[] = studentsData.results || [];
      const paymentsList: Payment[] = paymentsData.results || [];
      const attendanceList: Attendance[] = attendanceData.results || [];
      const gradesList: Grade[] = gradesData.results || [];

      setStudents(studentsList);
      setPayments(paymentsList);
      setAttendance(attendanceList);
      setGrades(gradesList);

      if (studentsList.length > 0) {
        setSelectedStudentName(studentsList[0].fullName || "");
      }
    } catch (error) {
      console.error("Parent panel error:", error);
      setStudents([]);
      setPayments([]);
      setAttendance([]);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const selectedStudent = useMemo(() => {
    return students.find((s) => s.fullName === selectedStudentName) || null;
  }, [students, selectedStudentName]);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => p.studentName === selectedStudentName);
  }, [payments, selectedStudentName]);

  const filteredAttendance = useMemo(() => {
    return attendance.filter((a) => a.studentName === selectedStudentName);
  }, [attendance, selectedStudentName]);

  const filteredGrades = useMemo(() => {
    return grades.filter((g) => g.studentName === selectedStudentName);
  }, [grades, selectedStudentName]);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-black">Parent Panel</h1>
          <p className="mt-2 text-slate-700">
            Ota-onalar uchun o‘quvchi ma’lumoti, baho, to‘lov va davomat
          </p>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              O‘quvchini tanlang
            </label>
            <select
              value={selectedStudentName}
              onChange={(e) => setSelectedStudentName(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
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
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-slate-700">Yuklanmoqda...</p>
          </div>
        ) : (
          <>
            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-black">
                O‘quvchi ma’lumotlari
              </h2>

              {!selectedStudent ? (
                <p className="mt-4 text-slate-700">O‘quvchi topilmadi.</p>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">F.I.SH</p>
                    <p className="mt-1 text-lg font-semibold text-black">
                      {selectedStudent.fullName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Guruh</p>
                    <p className="mt-1 text-lg font-semibold text-black">
                      {selectedStudent.groupName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Telefon</p>
                    <p className="mt-1 text-lg font-semibold text-black">
                      {selectedStudent.phone}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Balans</p>
                    <p className="mt-1 text-lg font-semibold text-black">
                      {selectedStudent.balance}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-black">Baholar</h2>

              {filteredGrades.length === 0 ? (
                <p className="mt-4 text-slate-700">Baholar topilmadi.</p>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-300 text-left">
                        <th className="px-4 py-3 text-black">Listening</th>
                        <th className="px-4 py-3 text-black">Reading</th>
                        <th className="px-4 py-3 text-black">Writing</th>
                        <th className="px-4 py-3 text-black">Speaking</th>
                        <th className="px-4 py-3 text-black">Vocabulary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGrades.map((grade) => (
                        <tr
                          key={grade.objectId}
                          className="border-b border-slate-200"
                        >
                          <td className="px-4 py-3 text-black">{grade.listening}</td>
                          <td className="px-4 py-3 text-black">{grade.reading}</td>
                          <td className="px-4 py-3 text-black">{grade.writing}</td>
                          <td className="px-4 py-3 text-black">{grade.speaking}</td>
                          <td className="px-4 py-3 text-black">{grade.vocabulary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-black">To‘lovlar</h2>

              {filteredPayments.length === 0 ? (
                <p className="mt-4 text-slate-700">To‘lovlar topilmadi.</p>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-300 text-left">
                        <th className="px-4 py-3 text-black">Summa</th>
                        <th className="px-4 py-3 text-black">Holat</th>
                        <th className="px-4 py-3 text-black">Sana</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment) => (
                        <tr
                          key={payment.objectId}
                          className="border-b border-slate-200"
                        >
                          <td className="px-4 py-3 text-black">{payment.amount}</td>
                          <td className="px-4 py-3 text-black">{payment.status}</td>
                          <td className="px-4 py-3 text-black">{payment.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-black">Davomat</h2>

              {filteredAttendance.length === 0 ? (
                <p className="mt-4 text-slate-700">Davomat topilmadi.</p>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-300 text-left">
                        <th className="px-4 py-3 text-black">Sana</th>
                        <th className="px-4 py-3 text-black">Holat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.map((item) => (
                        <tr
                          key={item.objectId}
                          className="border-b border-slate-200"
                        >
                          <td className="px-4 py-3 text-black">{item.date}</td>
                          <td className="px-4 py-3 text-black">{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}