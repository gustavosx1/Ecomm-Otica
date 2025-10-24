interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({ 
  title = "Nenhum produto disponível", 
  message = "Tente novamente mais tarde." 
}: EmptyStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-2">{title}</h2>
        <p className="text-yellow-700">{message}</p>
      </div>
    </div>
  );
}