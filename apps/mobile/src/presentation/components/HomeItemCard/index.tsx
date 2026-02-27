import { Text, View } from "react-native";
import type { HomeItemCardProps } from "@mobile/presentation/components/HomeItemCard/types";

const HomeItemCard = ({ item }: HomeItemCardProps): JSX.Element => {
  return (
    <View className="mb-3 rounded-xl border border-slate-200 bg-white p-4">
      <Text className="text-base font-semibold text-slate-900">{item.title}</Text>
      <Text className="mt-1 text-sm text-slate-600">{item.description}</Text>
    </View>
  );
};

export default HomeItemCard;
