"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSubmit, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-3 bg-card border border-border rounded-xl p-2 focus-within:border-accent/50 transition-colors">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your project... (e.g., Build a mobile app for fitness tracking)"
          className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        AI will create a step-by-step roadmap to accomplish your project
      </p>
    </form>
  );
}
