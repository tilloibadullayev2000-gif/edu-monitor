export default function StudentsTable() {
  const students = [
    {
      id: 1,
      name: "Ali Valiyev",
      group: "Beginner A1",
      phone: "+998 90 111 22 33",
      balance: "200 000 so‘m",
    },
    {
      id: 2,
      name: "Madina Karimova",
      group: "Elementary A2",
      phone: "+998 91 222 33 44",
      balance: "To‘langan",
    },
    {
      id: 3,
      name: "Jasur Bekov",
      group: "Pre-Intermediate",
      phone: "+998 99 333 44 55",
      balance: "150 000 so‘m",
    },
  ];

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow">
      <h3 className="text-2xl font-bold text-slate-800">
        O‘quvchilar ro‘yxati
      </h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Ism</th>
              <th className="px-4 py-3">Guruh</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Balans</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-slate-100">
                <td className="px-4 py-3">{student.id}</td>
                <td className="px-4 py-3 font-medium">{student.name}</td>
                <td className="px-4 py-3">{student.group}</td>
                <td className="px-4 py-3">{student.phone}</td>
                <td className="px-4 py-3">{student.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}