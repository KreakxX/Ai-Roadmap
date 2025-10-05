"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-[10%] w-64 h-64 border border-muted-foreground/10 rounded-lg animate-float" />
      <div className="absolute top-40 right-[15%] w-48 h-48 border border-muted-foreground/10 rounded-full animate-float-slow" />
      <div className="absolute bottom-32 left-[20%] w-56 h-56 border border-muted-foreground/10 rotate-45 animate-float-reverse" />
      <div className="absolute bottom-20 right-[25%] w-40 h-40 border border-muted-foreground/10 rounded-lg animate-float" />
      <div className="absolute top-[60%] left-[5%] w-32 h-32 border border-muted-foreground/10 rounded-full animate-float-slow" />
      <div className="absolute top-[30%] right-[8%] w-44 h-44 border border-muted-foreground/10 rotate-12 animate-float-reverse" />

      {/* Additional subtle shapes */}
      <div className="absolute top-[15%] left-[45%] w-36 h-36 border border-muted-foreground/5 rounded-lg animate-float-slow" />
      <div className="absolute bottom-[40%] right-[40%] w-52 h-52 border border-muted-foreground/5 rounded-full animate-float" />

      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-muted/20 rounded-full blur-[150px] animate-float-reverse" />
    </div>
  );
}
