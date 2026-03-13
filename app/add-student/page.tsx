"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [phone, setPhone] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: String(fullName),
          groupName: String(groupName),
          phone: String(phone),
          parentName: String(parentName),
          parentPhone: String(parentPhone),
          balance: String(balance),
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

      setMessage("O‘quvchi muvaffaqiyatli qo‘shildi!");

      setFullName("");
      setGroupName("");
      setPhone("");
      setParentName("");
      setParentPhone("");
      setBalance("");

      setTimeout(() => {
        router.push("/students");
      }, 800);
    } catch (error: any) {
      setMessage(
        "Xatolik: " + (error?.message || "Server bilan ulanishda xatolik")
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-black">O‘quvchi qo‘shish</h1>
        <p className="mt-2 text-slate-700">
          Yangi o‘quvchi ma’lumotlarini kiriting
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="O‘quvchi F.I.SH"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Guruh nomi"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Ota-ona ismi"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Ota-ona telefoni"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Balans"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
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
    </main>
  );
}