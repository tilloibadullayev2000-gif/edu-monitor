export default function ParentPortalTable() {
  const parents = [
    {
      student: "Ali Valiyev",
      parent: "Valiyeva Mohira",
      phone: "+998 90 555 11 22",
      balance: "200 000 so‘m",
    },
    {
      student: "Madina Karimova",
      parent: "Karimov Otabek",
      phone: "+998 91 777 22 33",
      balance: "To‘langan",
    },
    {
      student: "Jasur Bekov",
      parent: "Bekova Dilnoza",
      phone: "+998 99 888 44 55",
      balance: "150 000 so‘m",
    },
  ];

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow">
      <h3 className="text-2xl font-bold text-slate-800">
        Ota-ona kabineti
      </h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-4 py-3">O‘quvchi</th>
              <th className="px-4 py-3">Ota-ona</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Balans</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((p, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{p.student}</td>
                <td className="px-4 py-3">{p.parent}</td>
                <td className="px-4 py-3">{p.phone}</td>
                <td className="px-4 py-3">{p.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}