import { useRef, useState, useCallback, useEffect } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCaptureProps {
  onImageCaptured: (base64: string) => void;
  isLoading: boolean;
  resetKey?: number;
  hideIdentifyButton?: boolean;
}

const ImageCapture = ({ onImageCaptured, isLoading, resetKey, hideIdentifyButton }: ImageCaptureProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Reset preview when resetKey changes
  useEffect(() => {
    setPreview(null);
    setCameraActive(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [resetKey]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch {
      alert("Unable to access camera. Please check permissions.");
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    setPreview(dataUrl);
    stopCamera();
  }, []);

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraActive(false);
  }, [stream]);

  const clearPreview = useCallback(() => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleIdentify = () => {
    if (preview) onImageCaptured(preview);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {!preview && !cameraActive && (
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center justify-center gap-3 p-8 rounded-xl glass-card hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Upload Photo</span>
          </button>
          <button
            onClick={startCamera}
            className="group flex flex-col items-center justify-center gap-3 p-8 rounded-xl glass-card hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Camera className="w-6 h-6 text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">Take Photo</span>
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      <canvas ref={canvasRef} className="hidden" />

      {cameraActive && (
        <div className="relative rounded-xl overflow-hidden animate-scale-in">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-xl"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            <Button variant="nature" size="lg" onClick={capturePhoto}>
              <Camera className="w-5 h-5 mr-2" /> Capture
            </Button>
            <Button variant="outline" size="lg" onClick={stopCamera} className="bg-background/80 backdrop-blur">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {preview && (
        <div className="space-y-4 animate-fade-in">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img src={preview} alt="Captured" className="w-full max-h-80 object-cover" />
            <button
              onClick={clearPreview}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/60 backdrop-blur flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <X className="w-4 h-4 text-background" />
            </button>
          </div>
          {!hideIdentifyButton && (
            <Button
              variant="nature"
              size="lg"
              className="w-full text-base"
              onClick={handleIdentify}
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Identifying...</>
              ) : (
                "What's This?"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCapture;
