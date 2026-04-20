import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Sparkles } from "lucide-react";
import { useState } from "react";

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FaceRecognitionModal({ isOpen, onClose }: FaceRecognitionModalProps) {
  const [step, setStep] = useState<'choice' | 'uploading' | 'processing'>('choice');

  const handleUpload = () => {
    setStep('uploading');
    // Simular processamento de IA
    setTimeout(() => setStep('processing'), 1500);
    setTimeout(() => {
      setStep('choice');
      onClose();
    }, 3500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#7FFF00]/10 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="text-[#7FFF00]" size={32} />
          </div>
          <DialogTitle className="text-2xl font-bold">Encontrar minhas fotos</DialogTitle>
          <DialogDescription className="text-gray-500">
            Nossa IA vai analisar seu rosto e encontrar todas as suas fotos neste evento em segundos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {step === 'choice' && (
            <div className="grid grid-cols-1 gap-4">
              <Button 
                onClick={handleUpload}
                variant="outline" 
                className="h-24 flex flex-col gap-2 border-2 border-dashed border-gray-200 hover:border-[#7FFF00] hover:bg-[#7FFF00]/5 rounded-2xl transition-all"
              >
                <Camera size={24} className="text-gray-400" />
                <span className="font-semibold text-gray-700">Tirar uma selfie</span>
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400">ou</span>
                </div>
              </div>

              <Button 
                onClick={handleUpload}
                className="h-16 bg-black text-white hover:bg-gray-800 rounded-2xl flex items-center gap-3 font-bold"
              >
                <Upload size={20} />
                Carregar foto do rosto
              </Button>
            </div>
          )}

          {(step === 'uploading' || step === 'processing') && (
            <div className="text-center py-10">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-[#7FFF00]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#7FFF00] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-[#7FFF00] animate-pulse" size={32} />
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {step === 'uploading' ? 'Enviando sua foto...' : 'IA FOTON processando...'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Estamos escaneando milhares de fotos para você.
              </p>
            </div>
          )}
        </div>

        <p className="text-[10px] text-center text-gray-400 px-6">
          Sua foto não será salva. Ela será usada apenas para encontrar suas fotos neste evento e deletada em seguida.
        </p>
      </DialogContent>
    </Dialog>
  );
}
