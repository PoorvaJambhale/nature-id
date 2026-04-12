import { useState } from "react";
import { Leaf, Bird } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageCapture from "@/components/ImageCapture";
import BirdResult, { type BirdData } from "@/components/BirdResult";
import PlantResult, { type PlantData } from "@/components/PlantResult";
import UnknownResult from "@/components/UnknownResult";

type IdentificationResult =
  | { type: "bird"; data: BirdData }
  | { type: "plant"; data: PlantData }
  | { type: "unknown"; data: { message: string } }
  | null;

const Index = () => {
  const [result, setResult] = useState<IdentificationResult>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const { toast } = useToast();

  const handleIdentify = async (base64: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("identify-species", {
        body: { imageBase64: base64 },
      });

      if (error) throw error;

      setResult(data as IdentificationResult);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Identification failed";
      setResult({ type: "unknown", data: { message: message || "We couldn't figure out what this is. Try uploading a clearer photo!" } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="nature-gradient px-4 sm:px-6 py-8 sm:py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Bird className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground/80" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-foreground">
              NatureID
            </h1>
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground/80" />
          </div>
          <p className="text-primary-foreground/70 text-base sm:text-lg max-w-md mx-auto">
            Snap a photo of any bird or plant and discover its story
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 sm:px-6 py-6 sm:py-10 max-w-2xl mx-auto space-y-8 sm:space-y-10">
        <ImageCapture onImageCaptured={handleIdentify} isLoading={isLoading} resetKey={resetKey} hideIdentifyButton={!!result} />

        {result?.type === "bird" && <BirdResult data={result.data} />}
        {result?.type === "plant" && <PlantResult data={result.data} />}
        {result?.type === "unknown" && <UnknownResult message={result.data.message} />}

        {result && (
          <div className="text-center animate-fade-in">
            <Button variant="nature" size="lg" onClick={() => {
              setResult(null);
              setResetKey(k => k + 1);
            }}>
              Try Another One!
            </Button>
          </div>
        )}

        {!result && !isLoading && (
          <div className="text-center text-muted-foreground text-sm animate-fade-in">
            <p>Upload or take a photo of a bird or plant to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
