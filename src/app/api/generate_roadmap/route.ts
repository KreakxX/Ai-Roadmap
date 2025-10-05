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
    contents: `Create a roadmap for: ${projectDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    } as any
  });

    const textContent = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!textContent) return;
  return NextResponse.json(JSON.parse(textContent));
}