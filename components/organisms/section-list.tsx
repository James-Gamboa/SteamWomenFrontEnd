"use client";

export function SectionList({
  title,
  items,
  iconColor = "#8B5CF6",
}: {
  title: string;
  items: string[];
  iconColor?: string;
}) {
  return (
    <div className="mb-8">
      <h3
        className="mb-4 font-bold text-lg lg:text-xl"
        style={{ color: "#1A1F2C" }}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start text-sm lg:text-base"
            style={{ color: "#1A1F2C" }}
          >
            <span className="mr-2" style={{ color: iconColor }}>
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
