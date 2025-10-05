"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";
interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime: string;
  deliverables?: string[];
  dependencies?: number[];
}

interface RoadmapDisplayProps {
  steps: RoadmapStep[];
  title: string;
}

export function RoadmapDisplay({ steps, title }: RoadmapDisplayProps) {
  if (steps.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-8">
        Your Project Roadmap
      </h2>

      <h3>{title}</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.stepNumber}
            className="group relative bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 border border-accent/30 flex items-center justify-center text-accent font-semibold">
                {index + 1}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {step.stepNumber} {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.deliverables && step.deliverables.length > 0 ? (
                  <Collapsible>
                    <CollapsibleTrigger>
                      <ChevronDown className="h-4 w-4 text-gray-400"></ChevronDown>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-row gap-3">
                      {step.deliverables.map((deliverable, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-indigo-400/20 px-2 py-1 text-xs text-gray-500 text-center"
                        >
                          {deliverable}
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : null}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                    {step.estimatedTime}
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
