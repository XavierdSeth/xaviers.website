export function SiteCard({ className = "", children, as: Tag = "section", ...props }) {
  return (
    <Tag className={`card ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
