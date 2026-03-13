export default function StatsCards() {
  const stats = [
    { title: "Jami o‘quvchi", value: "128" },
    { title: "Bugun kelganlar", value: "102" },
    { title: "Qarzdorlar", value: "17" },
    { title: "To‘lov qilganlar", value: "89" },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">{stat.title}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-800">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}