import { AlertTriangle, Camera, Sun, Focus, Maximize } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tips = [
  { icon: Sun, text: "Make sure there's good lighting — natural sunlight works best!" },
  { icon: Focus, text: "Get close to the bird or plant so it fills most of the photo." },
  { icon: Maximize, text: "Keep the subject in the center and avoid blurry shots." },
  { icon: Camera, text: "Try a different angle — sometimes a side view helps!" },
];

const UnknownResult = ({ message }: { message: string }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      <Card className="glass-card border-destructive/30">
        <CardHeader className="pb-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-serif text-foreground">
            Uh oh! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-3">
          <p className="text-muted-foreground text-sm sm:text-base">{message}</p>
          <p className="text-foreground font-medium text-sm sm:text-base">
            No worries — try uploading a new picture and let's give it another shot!
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card animate-fade-in opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 font-sans">
            <Camera className="w-4 h-4 text-primary" /> Tips for a Great Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: `${400 + i * 150}ms`, animationFillMode: "forwards" }}>
                <tip.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnknownResult;
