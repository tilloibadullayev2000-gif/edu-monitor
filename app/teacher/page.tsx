export default function TeacherPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold text-slate-800">Teacher Panel</h1>
          <p className="mt-3 text-slate-600">
            Bu sahifa o‘qituvchilar uchun. Bu yerda baho, davomad va natijalar kiritiladi.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-800">Grades</h2>
            <p className="mt-2 text-slate-600">
              Listening, Reading, Writing, Speaking, Vocabulary
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-800">Attendance</h2>
            <p className="mt-2 text-slate-600">
              Davomatni kiritish va nazorat qilish
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-800">Students</h2>
            <p className="mt-2 text-slate-600">
              O‘quvchilar bilan ishlash bo‘limi
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}