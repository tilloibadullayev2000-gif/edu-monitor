export default function AttendanceTable() {
  const students = [
    {
      id: 1,
      name: "Ali Valiyev",
      group: "Beginner A1",
      attendance: "Present",
    },
    {
      id: 2,
      name: "Madina Karimova",
      group: "Elementary A2",
      attendance: "Late",
    },
    {
      id: 3,
      name: "Jasur Bekov",
      group: "Pre-Intermediate",
      attendance: "Absent",
    },
  ];

  const getAttendanceColor = (status: string) => {
    if (status === "Present") return "bg-green-100 text-green-700";
    if (status === "Late") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow">
      <h3 className="text-2xl font-bold text-slate-800">
        Davomat jadvali
      </h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-4 py-3">Ism</th>
              <th className="px-4 py-3">Guruh</th>
              <th className="px-4 py-3">Holati</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{student.name}</td>
                <td className="px-4 py-3">{student.group}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getAttendanceColor(
                      student.attendance
                    )}`}
                  >
                    {student.attendance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}