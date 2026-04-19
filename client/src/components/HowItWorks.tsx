import { Search, CheckCircle, Download } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Busque",
    description: "Envie uma selfie ou digite seu número de peito para encontrar suas fotos",
  },
  {
    icon: CheckCircle,
    title: "Escolha",
    description: "Navegue pela galeria de fotos onde você aparece e selecione as que deseja",
  },
  {
    icon: Download,
    title: "Receba",
    description: "Baixe suas fotos em alta resolução e compartilhe nas redes sociais",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Três passos simples para encontrar e baixar suas fotos de eventos
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Card */}
                <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition h-full">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-[#7FFF00]/10 rounded-lg mb-6">
                    <Icon className="text-[#7FFF00]" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[#7FFF00] text-black rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="text-[#7FFF00] text-2xl">→</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
