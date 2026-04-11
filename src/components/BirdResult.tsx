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
        {[
          { icon: Feather, title: "Facts", content: (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {data.facts.map((fact, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          )},
          { icon: MapPin, title: "Habitat", content: <p className="text-sm text-muted-foreground">{data.habitat}</p> },
          { icon: Globe, title: "Distribution", content: <p className="text-sm text-muted-foreground">{data.distribution}</p> },
          { icon: Navigation, title: "Migration", content: <p className="text-sm text-muted-foreground">{data.migration}</p> },
        ].map((card, index) => (
          <Card
            key={card.title}
            className="glass-card animate-fade-in opacity-0"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 font-sans">
                <card.icon className="w-4 h-4 text-primary" /> {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{card.content}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BirdResult;
