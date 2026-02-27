import { SafeAreaView, ScrollView, Text, View } from "react-native";
import HomeItemCard from "@mobile/presentation/components/HomeItemCard";
import type { HomeScreenProps } from "@mobile/presentation/screens/HomeScreen/types";

const HomeScreen = ({ data }: HomeScreenProps): JSX.Element => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-900">LevitasFlow Mobile</Text>
          <Text className="mt-2 text-sm text-slate-600">
            Próxima revisão semanal: <Text className="font-semibold">{data.nextReviewDate}</Text>
          </Text>
        </View>
        {data.items.map((item) => (
          <HomeItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
