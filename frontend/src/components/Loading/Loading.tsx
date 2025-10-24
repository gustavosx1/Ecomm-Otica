import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  submessage?: string;
}

export default function Loading({ 
  message = "Carregando...", 
  submessage = "Aguarde um momento" 
}: LoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-yellow-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-yellow-800 mb-2">{message}</h2>
        <p className="text-yellow-700">{submessage}</p>
      </div>
    </div>
  );
}