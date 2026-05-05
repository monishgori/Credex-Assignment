"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, ArrowRight, Trash2, Plus, Loader2 } from "lucide-react";
import { PRICING_DATA, ToolName, PlanType, UseCase } from "@/lib/pricing";

export default function AuditForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teamSize, setTeamSize] = useState<number>(5);
  const [useCase, setUseCase] = useState<UseCase>("mixed");
  
  const [tools, setTools] = useState<{name: ToolName, plan: PlanType, seats: number, currentMonthlySpend: number}[]>([
    { name: "Cursor", plan: "Pro", seats: 5, currentMonthlySpend: 100 }
  ]);

  const addTool = () => {
    setTools([...tools, { name: "ChatGPT", plan: "Plus", seats: 1, currentMonthlySpend: 20 }]);
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const updateTool = (index: number, field: string, value: any) => {
    const newTools = [...tools];
    newTools[index] = { ...newTools[index], [field]: value };
    setTools(newTools);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamSize, primaryUseCase: useCase, tools })
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/audit/${data.id}`);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
          Audit Your Stack
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter your current AI tool subscriptions and usage below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-300">Total Team Size</Label>
              <Input 
                type="number" 
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                min="1"
                className="bg-slate-950 border-slate-800 text-slate-200" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Primary Use Case</Label>
              <Select value={useCase} onValueChange={(v) => setUseCase(v as UseCase)}>
                <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-200">
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectItem value="coding">Coding / Engineering</SelectItem>
                  <SelectItem value="writing">Writing / Content</SelectItem>
                  <SelectItem value="data">Data Analysis</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="mixed">Mixed / General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-200">Your Tools</h3>
              <Button type="button" variant="outline" size="sm" onClick={addTool} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                <Plus className="w-4 h-4 mr-2" /> Add Tool
              </Button>
            </div>
            
            <div className="space-y-4">
              {tools.map((tool, index) => {
                const toolDef = PRICING_DATA.find(p => p.name === tool.name);
                const availablePlans = toolDef ? toolDef.plans.map(p => p.id) : [];

                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg bg-slate-950/50 border border-slate-800 relative group">
                    
                    <div className="md:col-span-3 space-y-1">
                      <Label className="text-xs text-slate-400">Tool</Label>
                      <Select value={tool.name} onValueChange={(v) => {
                        const newName = v as ToolName;
                        const newDef = PRICING_DATA.find(p => p.name === newName);
                        updateTool(index, "name", newName);
                        if (newDef) updateTool(index, "plan", newDef.plans[0].id);
                      }}>
                        <SelectTrigger className="bg-slate-900 border-slate-700 h-9 text-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                          {PRICING_DATA.map(p => (
                            <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-3 space-y-1">
                      <Label className="text-xs text-slate-400">Plan</Label>
                      <Select value={tool.plan} onValueChange={(v) => updateTool(index, "plan", v)}>
                        <SelectTrigger className="bg-slate-900 border-slate-700 h-9 text-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                          {availablePlans.map(plan => (
                            <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-xs text-slate-400">Seats</Label>
                      <Input 
                        type="number" min="1" 
                        value={tool.seats} 
                        onChange={(e) => updateTool(index, "seats", parseInt(e.target.value) || 1)}
                        className="bg-slate-900 border-slate-700 h-9 text-slate-200" 
                      />
                    </div>

                    <div className="md:col-span-3 space-y-1">
                      <Label className="text-xs text-slate-400">Monthly Spend ($)</Label>
                      <Input 
                        type="number" min="0" step="0.01" 
                        value={tool.currentMonthlySpend} 
                        onChange={(e) => updateTool(index, "currentMonthlySpend", parseFloat(e.target.value) || 0)}
                        className="bg-slate-900 border-slate-700 h-9 text-slate-200" 
                      />
                    </div>

                    <div className="md:col-span-1 flex items-end justify-center pb-1">
                      <Button 
                        type="button" variant="ghost" size="icon" 
                        onClick={() => removeTool(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/30 h-9 w-9"
                        disabled={tools.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <Button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg py-6 mt-4 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
            Run Free Audit <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
