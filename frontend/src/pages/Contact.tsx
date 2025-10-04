import { Camera, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white py-8">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
          Nossas Informações de Contato!
        </h1>
        <p className="text-lg text-yellow-900 max-w-2xl mx-auto">
          Estamos aqui para ajudar! Se você tiver alguma dúvida, sugestão ou precisar de assistência, não hesite em entrar em contato conosco. Nossa equipe está pronta para oferecer o melhor suporte possível.
        </p>
        
      </div>
      <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-12 font-extralight text-gray-700 ">
          <li>
            <MessageCircle className="inline-block mr-2 text-yellow-600" />
            (11) 91234-5678
          </li>
          <li>
            <Camera className="inline-block mr-2 text-yellow-600" />
           @slz_oticas
          </li>
        </ul>
      </div>

      
    </div>
  );
}
