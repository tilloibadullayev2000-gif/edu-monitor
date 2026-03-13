"use client";

import { useEffect, useState } from "react";

type Grade = {
  objectId: string;
  studentName: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  vocabulary: string;
};

type Student = {
  objectId: string;
  fullName: string;
};

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [studentName, setStudentName] = useState("");
  const [listening, setListening] = useState("");
  const [reading, setReading] = useState("");
  const [writing, setWriting] = useState("");
  const [speaking, setSpeaking] = useState("");
  const [vocabulary, setVocabulary] = useState("");

  const fetchGrades = async () => {
    try {
      const response = await fetch("/api/grades", { cache: "no-store" });
      const data = await response.json();
      setGrades(data.results || []);
    } catch (error) {
      console.error("Grades load error:", error);
      setGrades([]);
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
      const response = await fetch("/api/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          listening,
          reading,
          writing,
          speaking,
          vocabulary,
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

      setMessage("Baho muvaffaqiyatli saqlandi!");
      setListening("");
      setReading("");
      setWriting("");
      setSpeaking("");
      setVocabulary("");
      fetchGrades();
    } catch (error: any) {
      setMessage(
        "Xatolik: " + (error?.message || "Server bilan ulanishda xatolik")
      );
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchGrades(), fetchStudents()]);
      setLoading(false);
    };

    loadAll();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-black">Grades bo‘limi</h1>
          <p className="mt-2 text-slate-700">
            O‘quvchi baholarini qo‘shish va ko‘rish
          </p>

          <form
            onSubmit={handleSave}
            className="mt-8 grid gap-4 md:grid-cols-2"
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
              type="text"
              placeholder="Listening"
              value={listening}
              onChange={(e) => setListening(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            />

            <input
              type="text"
              placeholder="Reading"
              value={reading}
              onChange={(e) => setReading(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            />

            <input
              type="text"
              placeholder="Writing"
              value={writing}
              onChange={(e) => setWriting(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            />

            <input
              type="text"
              placeholder="Speaking"
              value={speaking}
              onChange={(e) => setSpeaking(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            />

            <input
              type="text"
              placeholder="Vocabulary"
              value={vocabulary}
              onChange={(e) => setVocabulary(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-black"
            />

            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 md:col-span-2"
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
          <h2 className="text-2xl font-bold text-black">Baholar ro‘yxati</h2>

          {loading ? (
            <p className="mt-6 text-slate-700">Yuklanmoqda...</p>
          ) : grades.length === 0 ? (
            <p className="mt-6 text-slate-700">Hozircha baholar yo‘q.</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-left">
                    <th className="px-4 py-3 text-black">O‘quvchi</th>
                    <th className="px-4 py-3 text-black">Listening</th>
                    <th className="px-4 py-3 text-black">Reading</th>
                    <th className="px-4 py-3 text-black">Writing</th>
                    <th className="px-4 py-3 text-black">Speaking</th>
                    <th className="px-4 py-3 text-black">Vocabulary</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => (
                    <tr
                      key={grade.objectId}
                      className="border-b border-slate-200"
                    >
                      <td className="px-4 py-3 text-black">{grade.studentName}</td>
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
      </div>
    </main>
  );
}