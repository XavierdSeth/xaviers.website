export function SectionLabel({ icon: Icon, dot, children }) {
  return (
    <div className="section-label">
      {dot && <span className="section-label__dot" aria-hidden="true" />}
      {Icon && <Icon size={14} strokeWidth={2} className="section-label__icon" />}
      <span>{children}</span>
    </div>
  );
}
