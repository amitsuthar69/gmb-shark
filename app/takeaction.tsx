import { useState } from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "profile" | "content" | "engagement" | "technical";
  icon: keyof typeof Ionicons.glyphMap;
  estimatedTime: string;
  impact: "High" | "Medium" | "Low";
  completed: boolean;
}

interface ActionCardProps {
  item: ActionItem;
  onPress: (item: ActionItem) => void;
}

const mockActionItems: ActionItem[] = [
  {
    id: "1",
    title: "Update Contact Info",
    description:
      "Add missing phone number and website URL to improve customer reach",
    priority: "high",
    category: "profile",
    icon: "call",
    estimatedTime: "2 min",
    impact: "High",
    completed: false,
  },
  {
    id: "2",
    title: "Add Location",
    description:
      "Set precise business location to help customers find you easily",
    priority: "high",
    category: "profile",
    icon: "location",
    estimatedTime: "3 min",
    impact: "High",
    completed: false,
  },
  {
    id: "3",
    title: "Upload Business Photos",
    description:
      "Add high-quality photos of your business, products, and services",
    priority: "high",
    category: "content",
    icon: "camera",
    estimatedTime: "10 min",
    impact: "High",
    completed: false,
  },
  {
    id: "4",
    title: "Complete Business Description",
    description:
      "Write a compelling description that highlights your unique value proposition",
    priority: "medium",
    category: "profile",
    icon: "document-text",
    estimatedTime: "5 min",
    impact: "Medium",
    completed: false,
  },
  {
    id: "5",
    title: "Set Business Hours",
    description:
      "Update your operating hours including holidays and special hours",
    priority: "medium",
    category: "profile",
    icon: "time",
    estimatedTime: "3 min",
    impact: "Medium",
    completed: false,
  },
  {
    id: "6",
    title: "Respond to Recent Reviews",
    description:
      "Reply to 3 pending customer reviews to show you care about feedback",
    priority: "high",
    category: "engagement",
    icon: "chatbubbles",
    estimatedTime: "15 min",
    impact: "High",
    completed: false,
  },
  {
    id: "7",
    title: "Add Services/Products",
    description:
      "List your main services or products with descriptions and pricing",
    priority: "medium",
    category: "content",
    icon: "list",
    estimatedTime: "8 min",
    impact: "Medium",
    completed: false,
  },
  {
    id: "8",
    title: "Verify Business Information",
    description:
      "Confirm your business details are accurate across all platforms",
    priority: "low",
    category: "technical",
    icon: "checkmark-circle",
    estimatedTime: "5 min",
    impact: "Low",
    completed: true,
  },
  {
    id: "9",
    title: "Enable Online Booking",
    description:
      "Set up online appointment booking to increase customer convenience",
    priority: "medium",
    category: "technical",
    icon: "calendar",
    estimatedTime: "20 min",
    impact: "High",
    completed: false,
  },
  {
    id: "10",
    title: "Create Social Media Posts",
    description:
      "Schedule 5 posts for the next week to maintain online presence",
    priority: "low",
    category: "content",
    icon: "share-social",
    estimatedTime: "30 min",
    impact: "Medium",
    completed: false,
  },
];

const ActionCard = ({ item, onPress }: ActionCardProps) => {
  const cardColor = useThemeColor(
    { light: "#ffffff", dark: "#1c1c1e" },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#8e8e93";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "profile":
        return "person";
      case "content":
        return "images";
      case "engagement":
        return "heart";
      case "technical":
        return "settings";
      default:
        return "help";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "#10b981";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#8e8e93";
      default:
        return "#8e8e93";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.actionCard,
        { backgroundColor: cardColor },
        item.completed && styles.completedCard,
      ]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: getPriorityColor(item.priority) + "20" },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={getPriorityColor(item.priority)}
            />
          </View>
          <View style={styles.cardInfo}>
            <ThemedText
              style={[styles.cardTitle, item.completed && styles.completedText]}
            >
              {item.title}
            </ThemedText>
            <ThemedText
              style={[styles.cardDescription, { color: mutedColor }]}
              numberOfLines={2}
            >
              {item.description}
            </ThemedText>
          </View>
        </View>
        <View style={styles.cardRight}>
          {item.completed ? (
            <View style={[styles.statusBadge, { backgroundColor: "#10b981" }]}>
              <Ionicons name="checkmark" size={16} color="#ffffff" />
            </View>
          ) : (
            <View
              style={[
                styles.priorityIndicator,
                { backgroundColor: getPriorityColor(item.priority) },
              ]}
            >
              <Ionicons name="alert" size={16} color="#ffffff" />
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons
              name={getCategoryIcon(item.category)}
              size={12}
              color={mutedColor}
            />
            <ThemedText style={[styles.metaText, { color: mutedColor }]}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </ThemedText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={12} color={mutedColor} />
            <ThemedText style={[styles.metaText, { color: mutedColor }]}>
              {item.estimatedTime}
            </ThemedText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="trending-up"
              size={12}
              color={getImpactColor(item.impact)}
            />
            <ThemedText
              style={[styles.metaText, { color: getImpactColor(item.impact) }]}
            >
              {item.impact} Impact
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProgressCard = () => {
  const cardColor = useThemeColor(
    { light: "#ffffff", dark: "#1c1c1e" },
    "background"
  );
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  const completedItems = mockActionItems.filter(
    (item) => item.completed
  ).length;
  const totalItems = mockActionItems.length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <View style={[styles.progressCard, { backgroundColor: cardColor }]}>
      <View style={styles.progressHeader}>
        <ThemedText style={styles.progressTitle}>
          Profile Optimization
        </ThemedText>
        <ThemedText style={styles.progressPercentage}>
          {progressPercentage}%
        </ThemedText>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>
      </View>
      <View style={styles.progressStats}>
        <ThemedText style={[styles.progressText, { color: mutedColor }]}>
          {completedItems} of {totalItems} actions completed
        </ThemedText>
        <ThemedText style={[styles.progressText, { color: mutedColor }]}>
          {totalItems - completedItems} remaining
        </ThemedText>
      </View>
    </View>
  );
};

const FilterTabs = ({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) => {
  const filters = [
    { key: "all", label: "All", count: mockActionItems.length },
    {
      key: "high",
      label: "High Priority",
      count: mockActionItems.filter((item) => item.priority === "high").length,
    },
    {
      key: "pending",
      label: "Pending",
      count: mockActionItems.filter((item) => !item.completed).length,
    },
    {
      key: "completed",
      label: "Completed",
      count: mockActionItems.filter((item) => item.completed).length,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterScroll}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterTab,
            activeFilter === filter.key && styles.filterTabActive,
          ]}
          onPress={() => onFilterChange(filter.key)}
        >
          <ThemedText
            style={[
              styles.filterTabText,
              activeFilter === filter.key && styles.filterTabTextActive,
            ]}
          >
            {filter.label} ({filter.count})
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default function TakeActionPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const backgroundColor = useThemeColor({}, "background");
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  const handleActionPress = (item: ActionItem) => {
    console.log("Action pressed:", item.title);
    // TODO: Navigate to specific action or show action details
  };

  const getFilteredItems = () => {
    switch (activeFilter) {
      case "high":
        return mockActionItems.filter((item) => item.priority === "high");
      case "pending":
        return mockActionItems.filter((item) => !item.completed);
      case "completed":
        return mockActionItems.filter((item) => item.completed);
      default:
        return mockActionItems;
    }
  };

  const renderActionItem = ({ item }: { item: ActionItem }) => (
    <ActionCard item={item} onPress={handleActionPress} />
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Take Action</ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: mutedColor }]}>
          Optimize your business profile with these recommendations
        </ThemedText>
      </View>

      {/* Progress Card */}
      <ProgressCard />

      {/* Filter Tabs */}
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Actions List */}
      <FlatList
        data={getFilteredItems()}
        renderItem={renderActionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.actionsList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  progressCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#10b981",
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    fontSize: 14,
  },
  filterScroll: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "rgba(142, 142, 147, 0.1)",
  },
  filterTabActive: {
    backgroundColor: "#3b82f6",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8e8e93",
  },
  filterTabTextActive: {
    color: "#ffffff",
  },
  actionsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  actionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  completedCard: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: "row",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardRight: {
    marginLeft: 12,
  },
  priorityIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(142, 142, 147, 0.2)",
    paddingTop: 12,
  },
  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
});
