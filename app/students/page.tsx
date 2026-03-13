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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editFullName, setEditFullName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editParentName, setEditParentName] = useState("");
  const [editParentPhone, setEditParentPhone] = useState("");
  const [editBalance, setEditBalance] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students", { cache: "no-store" });
      const data = await response.json();
      setStudents(data.results || []);
    } catch (error) {
      console.error("Students load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = confirm("Haqiqatan ham o‘chirmoqchimisiz?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("Xatolik: " + (data.error || "O‘chirilmadi"));
        return;
      }

      setMessage("O‘quvchi muvaffaqiyatli o‘chirildi!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      setMessage("Server bilan ulanishda xatolik yuz berdi");
    }
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setEditFullName(student.fullName || "");
    setEditGroupName(student.groupName || "");
    setEditPhone(student.phone || "");
    setEditParentName(student.parentName || "");
    setEditParentPhone(student.parentPhone || "");
    setEditBalance(String(student.balance ?? ""));
  };

  const closeEditModal = () => {
    setEditingStudent(null);
    setEditFullName("");
    setEditGroupName("");
    setEditPhone("");
    setEditParentName("");
    setEditParentPhone("");
    setEditBalance("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingStudent) return;

    try {
      const response = await fetch(`/api/students/${editingStudent.objectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: editFullName,
          groupName: editGroupName,
          phone: editPhone,
          parentName: editParentName,
          parentPhone: editParentPhone,
          balance: editBalance,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("Xatolik: " + (data.error || "Tahrirlanmadi"));
        return;
      }

      setMessage("O‘quvchi muvaffaqiyatli tahrirlandi!");
      closeEditModal();
      fetchStudents();
    } catch (error) {
      console.error(error);
      setMessage("Server bilan ulanishda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return students;

    return students.filter((student) => {
      return (
        String(student.fullName || "").toLowerCase().includes(q) ||
        String(student.groupName || "").toLowerCase().includes(q) ||
        String(student.phone || "").toLowerCase().includes(q) ||
        String(student.parentName || "").toLowerCase().includes(q) ||
        String(student.parentPhone || "").toLowerCase().includes(q) ||
        String(student.balance || "").toLowerCase().includes(q)
      );
    });
  }, [students, search]);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black">
              O‘quvchilar ro‘yxati
            </h1>
            <p className="mt-2 text-lg text-slate-700">
              Back4App bazasidagi barcha o‘quvchilar
            </p>
          </div>

          <a
            href="/add-student"
            className="inline-flex w-fit rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            + O‘quvchi qo‘shish
          </a>
        </div>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Qidirish: ism, guruh, telefon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black outline-none focus:border-slate-500"
          />
        </div>

        {message && (
          <p className="mt-6 rounded-xl bg-slate-100 px-4 py-3 text-slate-800">
            {message}
          </p>
        )}

        {loading ? (
          <p className="mt-8 text-slate-700">Yuklanmoqda...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="mt-8 text-slate-700">
            {search
              ? "Qidiruv bo‘yicha natija topilmadi."
              : "Hozircha o‘quvchilar yo‘q."}
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left">
                  <th className="px-4 py-3 text-black">F.I.SH</th>
                  <th className="px-4 py-3 text-black">Guruh</th>
                  <th className="px-4 py-3 text-black">Telefon</th>
                  <th className="px-4 py-3 text-black">Ota-ona</th>
                  <th className="px-4 py-3 text-black">Ota-ona telefoni</th>
                  <th className="px-4 py-3 text-black">Balans</th>
                  <th className="px-4 py-3 text-black">Amal</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.objectId}
                    className="border-b border-slate-200"
                  >
                    <td className="px-4 py-3 font-medium text-black">
                      {student.fullName}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {student.groupName}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {student.phone}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {student.parentName}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {student.parentPhone}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {student.balance}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(student)}
                          className="rounded-xl bg-amber-300 px-4 py-2 hover:bg-amber-400"
                          style={{ color: "#000000", fontWeight: "600" }}
                        >
                          Tahrirlash
                        </button>
                        <button
                          onClick={() => handleDelete(student.objectId)}
                          className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          O‘chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-black">
              O‘quvchini tahrirlash
            </h2>
            <p className="mt-2 text-slate-700">
              Ma’lumotlarni o‘zgartirib saqlang
            </p>

            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="O‘quvchi F.I.SH"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
              />

              <input
                type="text"
                placeholder="Guruh nomi"
                value={editGroupName}
                onChange={(e) => setEditGroupName(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
              />

              <input
                type="text"
                placeholder="Telefon"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
              />

              <input
                type="text"
                placeholder="Ota-ona ismi"
                value={editParentName}
                onChange={(e) => setEditParentName(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
              />

              <input
                type="text"
                placeholder="Ota-ona telefoni"
                value={editParentPhone}
                onChange={(e) => setEditParentPhone(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
              />

              <input
                type="number"
                placeholder="Balans"
                value={editBalance}
                onChange={(e) => setEditBalance(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-2xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-300"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}