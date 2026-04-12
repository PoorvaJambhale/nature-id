import { MapPin, Feather, Globe, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardCarousel from "@/components/CardCarousel";

export interface BirdData {
  commonName: string;
  scientificName: string;
  facts: string[];
  habitat: string;
  distribution: string;
  migration: string;
}

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <Card className="glass-card animate-fade-in">
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2 font-sans">
        <Icon className="w-4 h-4 text-primary" /> {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-sm text-muted-foreground">{children}</div>
    </CardContent>
  </Card>
);

const BirdResult = ({ data }: { data: BirdData }) => {
  const cards = [
    <InfoCard key="facts" icon={Feather} title="Facts">
      <ul className="space-y-2">
        {data.facts.map((fact, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            {fact}
          </li>
        ))}
      </ul>
    </InfoCard>,
    <InfoCard key="habitat" icon={MapPin} title="Habitat">
      <p>{data.habitat}</p>
    </InfoCard>,
    <InfoCard key="distribution" icon={Globe} title="Distribution">
      <p>{data.distribution}</p>
    </InfoCard>,
    <InfoCard key="migration" icon={Navigation} title="Migration">
      <p>{data.migration}</p>
    </InfoCard>,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-serif text-foreground">{data.commonName}</h2>
        <p className="text-muted-foreground italic text-base sm:text-lg">{data.scientificName}</p>
      </div>
      <CardCarousel>{cards}</CardCarousel>
    </div>
  );
};

export default BirdResult;
