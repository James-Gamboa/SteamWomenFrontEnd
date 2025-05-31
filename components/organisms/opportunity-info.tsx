export function OpportunityInfo({ opportunity }: { opportunity: any }) {
  return (
    <>
      <div className="mb-6">
        <h1
          className="mb-4 font-bold"
          style={{
            fontSize: "32px",
            lineHeight: "40px",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          {opportunity.title}
        </h1>
        <div
          className="flex flex-wrap gap-4 text-sm"
          style={{ color: "#8E9196" }}
        >
          <div className="flex items-center">
            <span className="mr-1">📍</span>
            <span style={{ fontFamily: "DM Sans, sans-serif" }}>
              {opportunity.location}
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">📅</span>
            <span style={{ fontFamily: "DM Sans, sans-serif" }}>
              {opportunity.date}
            </span>
          </div>
          {opportunity.organizer && (
            <div className="flex items-center">
              <span className="mr-1">👤</span>
              <span style={{ fontFamily: "DM Sans, sans-serif" }}>
                {opportunity.organizer}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <p
          className="leading-relaxed"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "400",
          }}
        >
          {opportunity.fullDescription || opportunity.description}
        </p>
      </div>

      {opportunity.requirements && (
        <div className="mb-8">
          <h3
            className="mb-4 font-bold"
            style={{
              fontSize: "20px",
              lineHeight: "25px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Requisitos
          </h3>
          <ul className="space-y-2">
            {opportunity.requirements.map((req: string, index: number) => (
              <li
                key={index}
                className="flex items-start"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                <span className="mr-2" style={{ color: "#8B5CF6" }}>
                  •
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {opportunity.benefits && (
        <div className="mb-8">
          <h3
            className="mb-4 font-bold"
            style={{
              fontSize: "20px",
              lineHeight: "25px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Beneficios
          </h3>
          <ul className="space-y-2">
            {opportunity.benefits.map((benefit: string, index: number) => (
              <li
                key={index}
                className="flex items-start"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                <span className="mr-2" style={{ color: "#8B5CF6" }}>
                  •
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {opportunity.applicationProcess && (
        <div className="mb-8">
          <h3
            className="mb-4 font-bold"
            style={{
              fontSize: "20px",
              lineHeight: "25px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Proceso de aplicación
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
            }}
          >
            {opportunity.applicationProcess}
          </p>
        </div>
      )}
    </>
  );
}
