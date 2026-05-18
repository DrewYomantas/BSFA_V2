export default function PrimaryButton({ children, onClick, type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-hearth-ink text-hearth-surface font-medium tracking-wide hover:bg-hearth-ember transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}
