"use client";

export function AgendaList({
  agenda,
}: {
  agenda: { activity: string; time: string; description: string }[];
}) {
  return (
    <div className="space-y-4">
      {agenda.map((item, idx) => (
        <div
          key={idx}
          className="border-l-4 pl-4 py-2"
          style={{ borderColor: "#8B5CF6", backgroundColor: "#F1F0FB" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h4
              className="font-bold text-sm lg:text-base"
              style={{ color: "#1A1F2C" }}
            >
              {item.activity}
            </h4>
            <span className="text-sm font-medium" style={{ color: "#8B5CF6" }}>
              {item.time}
            </span>
          </div>
          <p className="text-sm" style={{ color: "#8E9196" }}>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
