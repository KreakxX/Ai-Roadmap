import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';


export async function POST(request: NextRequest) {
  const { projectDescription } = await request.json();

  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const schema = {
  type: "object",
  properties: {
    projectTitle: {
      type: "string",
      description: "Title of the project"
    },
    overview: {
      type: "string",
      description: "Brief overview of the project and roadmap"
    },
    estimatedDuration: {
      type: "string",
      description: "Estimated total duration (e.g., '3 months', '6 weeks')"
    },
    steps: {
      type: "array",
      description: "Ordered list of roadmap steps",
      items: {
        type: "object",
        properties: {
          stepNumber: {
            type: "number",
            description: "Sequential step number"
          },
          title: {
            type: "string",
            description: "Brief title of the step"
          },
          description: {
            type: "string",
            description: "Detailed description of what to do in this step"
          },
          estimatedTime: {
            type: "string",
            description: "Estimated time for this step (e.g., '2 days', '1 week')"
          },
          deliverables: {
            type: "array",
            description: "Key deliverables or outcomes from this step",
            items: {
              type: "string"
            }
          },
          dependencies: {
            type: "array",
            description: "Step numbers that must be completed before this step",
            items: {
              type: "number"
            }
          }
        },
        required: ["stepNumber", "title", "description"]
      }
    },
    milestones: {
      type: "array",
      description: "Key milestones in the project",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          associatedSteps: {
            type: "array",
            items: {
              type: "number"
            }
          }
        }
      }
    }
  },
  required: ["projectTitle", "overview", "steps"]
};

 
  const response = await client.models.generateContent({
    model: 'gemini-2.0-flash',
contents: `You are an expert software architect and coding mentor. Create a detailed, step-by-step coding roadmap for: ${projectDescription}

IMPORTANT REQUIREMENTS:
- Focus ONLY on the coding/implementation phase - skip research, planning, and design
- Assume all prerequisites (requirements, designs, mockups) are already complete
- Choose an appropriate, modern tech stack for this project type
- The first step MUST always be "Project Setup & Environment Configuration"

STEP GRANULARITY:
- Break down the work into small, actionable coding tasks (20-50 steps typically)
- Each step should take 1-4 hours of focused coding
- Be SPECIFIC: Instead of "Build authentication", break it into:
  * "Create user registration API endpoint"
  * "Implement JWT token generation"
  * "Build login form component"
  * "Add protected route middleware"
- Instead of "Refactor UI", specify:
  * "Extract button component into reusable component"
  * "Implement responsive grid layout for dashboard"
  * "Add loading states to all forms"

TECHNICAL DETAILS:
- Specify exact file names, component names, or API routes when relevant
- Include which libraries/packages to use for each feature
- Mention testing requirements for each major feature
- Note any database migrations or schema changes needed
- Highlight integration points between different parts of the system

OUTPUT STRUCTURE:
- Each step should have clear acceptance criteria in the description
- List concrete deliverables (files, components, endpoints created)
- Mark dependencies between steps accurately
- Group related steps into logical milestones

Start with Step 1: Project Setup & Environment Configuration, then proceed with all implementation steps in logical order.`,    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    } as any
  });

    const textContent = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!textContent) return;
  return NextResponse.json(JSON.parse(textContent));
}