import { workoutPrompt } from "@/prompts/workout";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import "expo-sqlite/localStorage/install";

interface GenerateWorkoutParams {
  protocolId: string;
  protocolFocus: string;
  protocolDescription: string[];
  protocolExerciseExamples: string[];
  time?: string;
  equipment?: string;
  provider?: "openai" | "anthropic";
}

type AIProvider = "openai" | "anthropic";

let modelMappings = {
  openai: "gpt-4o",
  anthropic: "claude-3-5-sonnet-20241022",
} as const;

function getAPIKey(provider: AIProvider): string {
  let apiKey =
    provider === "openai"
      ? process.env.OPENAI_API_KEY
      : process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    try {
      apiKey = globalThis.localStorage.getItem("ai_api_key") || undefined;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }

  if (!apiKey) {
    throw new Error(
      `${provider.toUpperCase()}_API_KEY not found. Please set it in Settings or .env.local`
    );
  }

  return apiKey;
}

function createAIModel(provider: AIProvider) {
  let apiKey = getAPIKey(provider);
  let options = { apiKey };

  if (provider === "openai") {
    let client = createOpenAI(options);
    return client(modelMappings.openai);
  } else {
    let client = createAnthropic(options);
    return client(modelMappings.anthropic);
  }
}

function handleAIError(error: unknown, operation: string): never {
  console.error(`Error ${operation}:`, error);

  if (error instanceof Error) {
    if (error.message.includes("API key")) {
      throw new Error("Invalid API key. Please check your .env.local file.");
    }
    if (error.message.includes("quota") || error.message.includes("billing")) {
      throw new Error("API quota exceeded. Please check your account billing.");
    }
    if (error.message.includes("network") || error.message.includes("fetch")) {
      throw new Error("Network error. Please check your internet connection.");
    }
  }

  throw new Error(`Failed to ${operation}. Please try again.`);
}

function createWorkoutPrompt(
  protocolId: string,
  protocolFocus: string,
  protocolDescription: string[],
  protocolExerciseExamples: string[],
  time?: string,
  equipment?: string
): string {
  let userInput = `Protocol ID: ${protocolId}${time ? `\nTime: ${time}` : ""}${
    equipment ? `\nEquipment: ${equipment}` : ""
  }`;

  return `${workoutPrompt}\n\nProtocol Data:\nFocus: ${protocolFocus}\nDescription: ${protocolDescription.join(
    " "
  )}\nExercise Examples: ${protocolExerciseExamples.join(
    " "
  )}\n\nUser Input:\n${userInput}`;
}

export async function generateWorkout({
  protocolId,
  protocolFocus,
  protocolDescription,
  protocolExerciseExamples,
  time,
  equipment,
  provider,
}: GenerateWorkoutParams): Promise<string> {
  try {
    let selectedProvider = provider;

    if (!selectedProvider) {
      try {
        let storedProvider = globalThis.localStorage.getItem("ai_provider");
        if (storedProvider === "openai" || storedProvider === "anthropic") {
          selectedProvider = storedProvider;
        }
      } catch (error) {
        console.error("Error reading provider from localStorage:", error);
      }
    }

    if (!selectedProvider) {
      selectedProvider = "openai";
    }

    let model = createAIModel(selectedProvider);

    let prompt = createWorkoutPrompt(
      protocolId,
      protocolFocus,
      protocolDescription,
      protocolExerciseExamples,
      time,
      equipment
    );

    let { text } = await generateText({
      model,
      prompt,
    });

    if (!text || !text.trim()) {
      throw new Error("No workout generated");
    }

    return text.trim();
  } catch (error) {
    handleAIError(error, "generate workout");
  }
}
