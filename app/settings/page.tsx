"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [centerName, setCenterName] = useState("Edu Monitor");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [address, setAddress] = useState("Urganch, Uzbekistan");
  const [adminLogin, setAdminLogin] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("12345");
  const [message, setMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("centerName", centerName);
    localStorage.setItem("centerPhone", phone);
    localStorage.setItem("centerAddress", address);
    localStorage.setItem("adminLogin", adminLogin);
    localStorage.setItem("adminPassword", adminPassword);

    setMessage("Sozlamalar saqlandi!");
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="mt-2 text-slate-700">
          Tizim sozlamalari va admin ma’lumotlari
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Markaz nomi"
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
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
            placeholder="Manzil"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Admin login"
            value={adminLogin}
            onChange={(e) => setAdminLogin(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="text"
            placeholder="Admin parol"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
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