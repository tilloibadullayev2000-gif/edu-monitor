export default function PaymentsTable() {
  const payments = [
    {
      student: "Ali Valiyev",
      amount: "100 000 so‘m",
      date: "2026-03-10",
      status: "Qisman to‘langan",
    },
    {
      student: "Madina Karimova",
      amount: "300 000 so‘m",
      date: "2026-03-09",
      status: "To‘langan",
    },
    {
      student: "Jasur Bekov",
      amount: "150 000 so‘m",
      date: "2026-03-08",
      status: "Qarzdor",
    },
  ];

  const getPaymentColor = (status: string) => {
    if (status === "To‘langan") return "bg-green-100 text-green-700";
    if (status === "Qisman to‘langan") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow">
      <h3 className="text-2xl font-bold text-slate-800">
        To‘lovlar jadvali
      </h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-4 py-3">O‘quvchi</th>
              <th className="px-4 py-3">Summa</th>
              <th className="px-4 py-3">Sana</th>
              <th className="px-4 py-3">Holati</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{payment.student}</td>
                <td className="px-4 py-3">{payment.amount}</td>
                <td className="px-4 py-3">{payment.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getPaymentColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
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