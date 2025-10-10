import "expo-sqlite/localStorage/install";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  let [apiKey, setApiKey] = useState("");
  let [provider, setProvider] = useState<"openai" | "anthropic">("openai");

  function handleSave() {
    if (!apiKey.trim()) {
      Alert.alert("Error", "API key is required");
      return;
    }

    try {
      globalThis.localStorage.setItem("ai_api_key", apiKey);
      globalThis.localStorage.setItem("ai_provider", provider);
      Alert.alert("Success", "Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      Alert.alert("Error", "Failed to save settings");
    }
  }

  return (
    <ScrollView>
      <View style={{ gap: 8, padding: 8 }}>
        <Text style={{ fontWeight: "bold" }}>AI Setup</Text>
        <Text>Configure your AI provider and API key</Text>

        <View style={{ gap: 8 }}>
          <Text>Provider</Text>
          <View style={{ gap: 8 }}>
            <TouchableOpacity
              onPress={() => setProvider("openai")}
              style={{
                borderWidth: 1,
                padding: 8,
                backgroundColor:
                  provider === "openai" ? "#007AFF" : "transparent",
              }}
            >
              <Text style={{ color: provider === "openai" ? "#fff" : "#000" }}>
                OpenAI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setProvider("anthropic")}
              style={{
                borderWidth: 1,
                padding: 8,
                backgroundColor:
                  provider === "anthropic" ? "#007AFF" : "transparent",
              }}
            >
              <Text
                style={{ color: provider === "anthropic" ? "#fff" : "#000" }}
              >
                Anthropic
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text>API Key</Text>
          <TextInput
            placeholder="Enter your API key"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            style={{ borderWidth: 1, padding: 8 }}
          />
        </View>

        <Button title="Save Settings" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}
