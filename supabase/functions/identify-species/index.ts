import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a nature identification expert. Analyze the image and determine if it's a bird or a plant.

Respond with valid JSON only. No markdown, no code fences.

If it's a BIRD, respond with:
{
  "type": "bird",
  "data": {
    "commonName": "...",
    "scientificName": "...",
    "facts": ["fact1", "fact2", "fact3"],
    "habitat": "...",
    "distribution": "where they are found in the world",
    "migration": "migration patterns description"
  }
}

If it's a PLANT, respond with:
{
  "type": "plant",
  "data": {
    "commonName": "...",
    "scientificName": "...",
    "plantingPreference": "pot or in-ground preferences",
    "watering": "watering needs",
    "sunlight": "sunlight requirements",
    "temperature": "ideal temperature range",
    "facts": ["fact1", "fact2", "fact3"],
    "bestTimePlant": "best time to plant",
    "distribution": "where commonly found in the world",
    "flowerColors": "typical flower colors",
    "edibleFruits": "whether fruits can be consumed and details"
  }
}

If you cannot identify the species or it's neither a bird nor a plant, respond with:
{
  "type": "unknown",
  "data": { "message": "Brief explanation of why identification failed" }
}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: imageBase64 },
                },
                {
                  type: "text",
                  text: "Identify this species. Is it a bird or a plant? Provide detailed information.",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Clean potential markdown fences
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("identify-species error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
