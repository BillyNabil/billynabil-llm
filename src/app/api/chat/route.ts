import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'gemini-2.5-flash' } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Get the selected model
    let modelInstance;
    try {
      if (model === 'gemini-2.5-pro') {
        modelInstance = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
      } else {
        modelInstance = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      }
    } catch (error) {
      // Fallback to a working model if the specified one isn't available
      modelInstance = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    // Convert messages to Gemini format
    const geminiMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Generate response with Google Search grounding using generateContent
    const result = await modelInstance.generateContent(
      {
        contents: geminiMessages,
        tools: [
          {
            googleSearch: {}
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      } as any
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: text,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}