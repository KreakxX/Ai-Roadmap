"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { ChatInput } from "@/components/chat-input";
import { RoadmapDisplay } from "@/components/roadmap-display";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
}

export default function Home() {
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRoadmap = async (projectDescription: string) => {
    setIsLoading(true);

    // Simulate AI generation - replace with actual AI call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock roadmap generation based on input
    const mockSteps: RoadmapStep[] = [
      {
        id: 1,
        title: "Research & Planning",
        description:
          "Define project scope, identify target audience, analyze competitors, and create detailed requirements documentation.",
        duration: "1-2 weeks",
      },
      {
        id: 2,
        title: "Design & Prototyping",
        description:
          "Create wireframes, design user interface mockups, develop interactive prototypes, and gather initial feedback.",
        duration: "2-3 weeks",
      },
      {
        id: 3,
        title: "Development Setup",
        description:
          "Set up development environment, choose tech stack, configure version control, and establish CI/CD pipeline.",
        duration: "1 week",
      },
      {
        id: 4,
        title: "Core Development",
        description:
          "Build main features, implement business logic, integrate APIs, and develop database architecture.",
        duration: "4-6 weeks",
      },
      {
        id: 5,
        title: "Testing & Quality Assurance",
        description:
          "Conduct unit testing, perform integration tests, execute user acceptance testing, and fix identified bugs.",
        duration: "2-3 weeks",
      },
      {
        id: 6,
        title: "Launch & Deployment",
        description:
          "Deploy to production environment, monitor performance, gather user feedback, and plan iterative improvements.",
        duration: "1-2 weeks",
      },
    ];

    setRoadmapSteps(mockSteps);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent mb-6">
            AI-Powered Planning
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Transform ideas into
            <br />
            <span className="text-accent">actionable roadmaps</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Describe your project and let AI generate a comprehensive
            step-by-step roadmap to bring your vision to life.
          </p>
        </header>

        {/* Chat Input */}
        <div className="mb-12">
          <ChatInput onSubmit={generateRoadmap} isLoading={isLoading} />
        </div>

        {/* Roadmap Display */}
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

        <RoadmapDisplay steps={roadmapSteps} />

        {/* Footer */}
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
