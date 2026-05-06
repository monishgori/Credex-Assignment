import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, DollarSign, ArrowRight, CheckCircle2, AlertTriangle, ArrowDown } from "lucide-react";
import Link from 'next/link';
import type { Recommendation, UserTool } from '@/lib/engine';

export default async function AuditResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const audit = await prisma.audit.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!audit) {
    notFound();
  }

  const recommendations = JSON.parse(audit.recommendations) as Recommendation[];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
          <div className="text-sm text-slate-500">
            Audit ID: {audit.id.slice(0,8)}
          </div>
        </div>

        {/* Hero Result */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Your Audit Results
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            {audit.summary}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="bg-slate-900/80 border-slate-800">
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Total Monthly Savings</span>
                <span className="text-5xl font-bold text-green-400 flex items-center">
                  <DollarSign className="w-8 h-8" />
                  {audit.totalSavings}
                </span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/80 border-slate-800">
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Total Annual Savings</span>
                <span className="text-5xl font-bold text-indigo-400 flex items-center">
                  <DollarSign className="w-8 h-8" />
                  {audit.annualSavings}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Tool Breakdown
          </h2>
          
          {recommendations.map((rec, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {rec.tool} 
                    {rec.action === "KEEP" && <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Optimal</span>}
                    {rec.action !== "KEEP" && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">Action Required</span>}
                  </h3>
                  <p className="text-slate-400">{rec.reason}</p>
                </div>
                
                <div className="text-right whitespace-nowrap">
                  {rec.action === "KEEP" ? (
                    <span className="text-slate-500 flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-4 h-4" /> No savings
                    </span>
                  ) : (
                    <span className="text-green-400 font-bold text-xl flex items-center gap-1 justify-end">
                      <ArrowDown className="w-5 h-5" /> ${rec.savingsMonthly}/mo
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Credex CTA for high savings */}
        {audit.totalSavings > 0 && (
          <Card className="bg-indigo-600/10 border-indigo-500/30 mt-8">
            <CardHeader>
              <CardTitle className="text-indigo-300 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Capture these savings with Credex
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                You are leaving money on the table. Credex can automatically provision these cheaper plans and infrastructure credits for your entire team.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
                Book a Free Consultation
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}
