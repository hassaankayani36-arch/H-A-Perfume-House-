export default function ReceiptDetail({ label, className = '', children }) {
  return (
    <div className={`adminOrderReceiptDetail ${className}`.trim()}>
      <span>{label}</span>
      {children}
    </div>
  );
}
