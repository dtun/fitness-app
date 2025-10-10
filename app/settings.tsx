import { ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <>
      <ScrollView>
        <View style={{ gap: 8, padding: 8 }}>
          <Text style={{ fontWeight: "bold" }}>AI Setup</Text>
          <Text>Configure your AI provider and API key</Text>
        </View>
      </ScrollView>
    </>
  );
}
