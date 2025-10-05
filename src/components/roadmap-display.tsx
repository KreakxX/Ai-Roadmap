"use client";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
}

interface RoadmapDisplayProps {
  steps: RoadmapStep[];
}

export function RoadmapDisplay({ steps }: RoadmapDisplayProps) {
  if (steps.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-8">
        Your Project Roadmap
      </h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="group relative bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-semibold">
                {index + 1}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                    {step.duration}
                  </span>
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-[29px] top-[76px] w-0.5 h-8 bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
