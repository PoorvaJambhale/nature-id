import { Flower2, Droplets, Sun, Thermometer, Globe, Calendar, Apple, Palette, PawPrint } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface PlantData {
  commonName: string;
  scientificName: string;
  plantingPreference: string;
  watering: string;
  sunlight: string;
  temperature: string;
  facts: string[];
  bestTimePlant: string;
  distribution: string;
  flowerColors: string;
  edibleFruits: string;
  petFriendly: string;
}

const InfoCard = ({ icon: Icon, title, children, delay = 0 }: { icon: React.ElementType; title: string; children: React.ReactNode; delay?: number }) => (
  <Card className="glass-card animate-fade-in opacity-0" style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}>
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

const PlantResult = ({ data }: { data: PlantData }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-serif text-foreground">{data.commonName}</h2>
        <p className="text-muted-foreground italic text-lg">{data.scientificName}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={Flower2} title="Facts">
          <ul className="space-y-2">
            {data.facts.map((fact, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard icon={Flower2} title="Planting">
          <p>{data.plantingPreference}</p>
        </InfoCard>

        <InfoCard icon={Droplets} title="Watering">
          <p>{data.watering}</p>
        </InfoCard>

        <InfoCard icon={Sun} title="Sunlight">
          <p>{data.sunlight}</p>
        </InfoCard>

        <InfoCard icon={Thermometer} title="Temperature">
          <p>{data.temperature}</p>
        </InfoCard>

        <InfoCard icon={Calendar} title="Best Time to Plant">
          <p>{data.bestTimePlant}</p>
        </InfoCard>

        <InfoCard icon={Globe} title="Where Found">
          <p>{data.distribution}</p>
        </InfoCard>

        <InfoCard icon={Palette} title="Flower Colors">
          <p>{data.flowerColors}</p>
        </InfoCard>

        <InfoCard icon={Apple} title="Edible Fruits">
          <p>{data.edibleFruits}</p>
        </InfoCard>

        <InfoCard icon={PawPrint} title="Pet Friendly?">
          <p>{data.petFriendly}</p>
        </InfoCard>
      </div>
    </div>
  );
};

export default PlantResult;
