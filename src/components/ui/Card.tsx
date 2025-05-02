interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg border border-temple-gold/20 ${className}`}>
      {children}
    </div>
  );
} 