import { MapPin, Feather, Globe, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface BirdData {
  commonName: string;
  scientificName: string;
  facts: string[];
  habitat: string;
  distribution: string;
  migration: string;
}

const BirdResult = ({ data }: { data: BirdData }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-serif text-foreground">{data.commonName}</h2>
        <p className="text-muted-foreground italic text-lg">{data.scientificName}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 font-sans">
              <Feather className="w-4 h-4 text-primary" /> Facts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {data.facts.map((fact, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 font-sans">
              <MapPin className="w-4 h-4 text-primary" /> Habitat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{data.habitat}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 font-sans">
              <Globe className="w-4 h-4 text-primary" /> Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{data.distribution}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 font-sans">
              <Navigation className="w-4 h-4 text-primary" /> Migration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{data.migration}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BirdResult;
