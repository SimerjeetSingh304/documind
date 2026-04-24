"use client";

import { Check, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Base Node",
      description: "For personal use and exploration.",
      price: "0",
      features: [
        { name: "Standard Inference Speed", included: true },
        { name: "10 Document Indexes", included: true },
        { name: "50MB Storage Limit", included: true },
        { name: "Community Support", included: true },
        { name: "Priority GPU Access", included: false },
        { name: "Unbounded Inference Limits", included: false },
      ],
      cta: "Current Tier",
      active: false,
    },
    {
      name: "Pro Core",
      description: "Unbounded limits for power users.",
      price: isAnnual ? "15" : "19",
      popular: true,
      features: [
        { name: "Maximum Inference Speed", included: true },
        { name: "Unlimited Document Indexes", included: true },
        { name: "10GB Storage Limit", included: true },
        { name: "Priority 24/7 Support", included: true },
        { name: "Priority GPU Access", included: true },
        { name: "Unbounded Inference Limits", included: true },
      ],
      cta: "Upgrade to Pro",
      active: true,
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 py-8">
      
      {/* Header Section */}
      <div className="text-center space-y-6 relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-md mb-4">
          <Zap className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Pricing Matrix</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">intelligence.</span>
        </h1>
        
        <p className="text-lg text-white/50 font-medium max-w-[600px] mx-auto leading-relaxed">
          Upgrade to unlock unbounded inference limits, priority GPU access, and massive vector storage allocations.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center p-1 bg-white/[0.03] ring-1 ring-white/10 rounded-2xl backdrop-blur-xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                !isAnnual ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20" : "text-white/40 hover:text-white/80"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2",
                isAnnual ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20" : "text-white/40 hover:text-white/80"
              )}
            >
              Annually
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto relative z-10 pt-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-[32px] glass border-white/5 p-8 transition-all duration-500 flex flex-col group",
              tier.popular ? "border-primary/30 hover:border-primary/60 hover:-translate-y-2 shadow-[0_0_40px_rgba(101,99,242,0.1)] hover:shadow-[0_0_60px_rgba(101,99,242,0.2)] bg-primary/[0.02]" : "hover:border-white/15 hover:-translate-y-1 bg-white/[0.01]"
            )}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(101,99,242,0.5)]">
                Most Popular
              </div>
            )}
            
            {/* Card Content */}
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-white/50 font-medium h-10">{tier.description}</p>
            </div>

            <div className="mb-8 flex items-end gap-2">
              <span className="text-5xl font-black text-white tracking-tighter">${tier.price}</span>
              <span className="text-sm text-white/40 font-medium mb-2">/ month</span>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full shrink-0",
                    feature.included ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/20"
                  )}>
                    {feature.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    feature.included ? "text-white/80" : "text-white/30 line-through"
                  )}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className={cn(
                "w-full h-14 rounded-2xl text-sm font-black transition-all duration-300",
                tier.popular 
                  ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(101,99,242,0.4)] hover:shadow-[0_0_30px_rgba(101,99,242,0.6)]" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              )}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>
      
    </div>
  );
}
