export default function GradesTable() {
  const students = [
    {
      id: 1,
      name: "Ali Valiyev",
      listening: 85,
      reading: 78,
      writing: 74,
      speaking: 88,
      vocabulary: 80,
    },
    {
      id: 2,
      name: "Madina Karimova",
      listening: 90,
      reading: 86,
      writing: 84,
      speaking: 91,
      vocabulary: 89,
    },
    {
      id: 3,
      name: "Jasur Bekov",
      listening: 70,
      reading: 72,
      writing: 68,
      speaking: 75,
      vocabulary: 73,
    },
  ];

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow">
      <h3 className="text-2xl font-bold text-slate-800">
        Baholar jadvali
      </h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-4 py-3">Ism</th>
              <th className="px-4 py-3">Listening</th>
              <th className="px-4 py-3">Reading</th>
              <th className="px-4 py-3">Writing</th>
              <th className="px-4 py-3">Speaking</th>
              <th className="px-4 py-3">Vocabulary</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{student.name}</td>
                <td className="px-4 py-3">{student.listening}</td>
                <td className="px-4 py-3">{student.reading}</td>
                <td className="px-4 py-3">{student.writing}</td>
                <td className="px-4 py-3">{student.speaking}</td>
                <td className="px-4 py-3">{student.vocabulary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}