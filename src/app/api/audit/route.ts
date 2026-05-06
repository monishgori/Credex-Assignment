import { NextResponse } from 'next/server';
import { runAudit } from '@/lib/engine';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamSize, primaryUseCase, tools, email, companyName, role } = body;

    const auditResult = runAudit({
      tools,
      teamSize,
      primaryUseCase
    });

    const mockSummary = `Based on your usage of ${tools.length} AI tools, we found you could save $${auditResult.totalMonthlySavings}/mo. Review the recommendations below to optimize your plan allocation.`;

    const audit = await prisma.audit.create({
      data: {
        teamSize,
        primaryUseCase,
        tools: JSON.stringify(tools),
        totalSavings: auditResult.totalMonthlySavings,
        annualSavings: auditResult.totalAnnualSavings,
        recommendations: JSON.stringify(auditResult.recommendations),
        email,
        companyName,
        role,
        summary: mockSummary
      }
    });

    return NextResponse.json({ id: audit.id, ...auditResult });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json({ error: "Failed to run audit" }, { status: 500 });
  }
}
