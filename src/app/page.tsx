"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { ChatInput } from "@/components/chat-input";
import { RoadmapDisplay } from "@/components/roadmap-display";

interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime: string;
  deliverables: string[];
  dependencies?: number[];
}

export default function Home() {
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");

  const generateRoadmap = async (projectDescription: string) => {
    setIsLoading(true);
    const response = await fetch("/api/generate_roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectDescription: projectDescription,
      }),
    });

    const roadmapData = await response.json();
    const steps = roadmapData["steps"];
    console.log(steps);
    setRoadmapSteps(steps);
    setTitle(roadmapData["projectTitle"]);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <header className="text-center  mb-16 md:mb-24">
          <div className="flex justify-center items-center">
            <div className="rounded-full w-[100px] text-sm text-accent mb-2 bg-indigo-500/60 border border-accent/20">
              LaunchMap
            </div>
          </div>
          <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent mb-6">
            AI-Powered Planning
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Kickstart <span className="text-indigo-500 italic">Ideas</span> into
            <br />
            <span className="text-accent">actionable roadmaps</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Describe your project and let AI generate a comprehensive
            step-by-step roadmap to bring your vision to life.
          </p>
        </header>

        <div className="mb-12">
          <ChatInput onSubmit={generateRoadmap} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
              <span className="ml-2">Generating your roadmap...</span>
            </div>
          </div>
        )}

        <RoadmapDisplay steps={roadmapSteps} title={title} />

        {roadmapSteps.length === 0 && !isLoading && (
          <div className="mt-24 text-center">
            <p className="text-sm text-muted-foreground">
              Powered by advanced AI to help you plan smarter, not harder
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
