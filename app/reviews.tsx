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
import ReviewManagementModal from "../components/ui/ManageReviewModal";

interface Review {
  id: string;
  reviewerName: string;
  reviewerInitial: string;
  reviewerAvatar?: string;
  rating: number;
  reviewText: string;
  date: string;
  platform: "Google" | "Yelp" | "Facebook";
  hasReply: boolean;
  replyText?: string;
  isRecent: boolean;
}

interface ReviewCardProps {
  review: Review;
  onExpand: (review: Review) => void;
}

const mockReviews: Review[] = [
  {
    id: "1",
    reviewerName: "Sarah Johnson",
    reviewerInitial: "S",
    rating: 5,
    reviewText:
      "Absolutely amazing service! The staff was incredibly friendly and the food was outstanding. I've been coming here for months and it never disappoints. Highly recommend to anyone looking for a great dining experience.",
    date: "2 days ago",
    platform: "Google",
    hasReply: false,
    isRecent: true,
  },
  {
    id: "2",
    reviewerName: "Mike Chen",
    reviewerInitial: "M",
    rating: 4,
    reviewText:
      "Good food and decent service. The atmosphere is nice and cozy. Only complaint is that it took a bit long to get our order, but the quality made up for it.",
    date: "1 week ago",
    platform: "Yelp",
    hasReply: true,
    replyText:
      "Thank you for your feedback Mike! We're working on improving our service speed.",
    isRecent: false,
  },
  {
    id: "3",
    reviewerName: "Emily Rodriguez",
    reviewerInitial: "E",
    rating: 2,
    reviewText:
      "Unfortunately, my experience wasn't great. The food was cold when it arrived and the service was slow. I hope they can improve because the location is convenient.",
    date: "2 weeks ago",
    platform: "Google",
    hasReply: false,
    isRecent: false,
  },
  {
    id: "4",
    reviewerName: "David Thompson",
    reviewerInitial: "D",
    rating: 5,
    reviewText:
      "Perfect! Everything from the ambiance to the food was exceptional. The staff went above and beyond to make our anniversary dinner special.",
    date: "3 weeks ago",
    platform: "Facebook",
    hasReply: true,
    replyText:
      "Thank you so much David! We're thrilled we could make your anniversary special.",
    isRecent: false,
  },
  {
    id: "5",
    reviewerName: "Lisa Park",
    reviewerInitial: "L",
    rating: 3,
    reviewText:
      "Average experience. The food was okay but nothing special. Service was friendly though.",
    date: "1 month ago",
    platform: "Yelp",
    hasReply: false,
    isRecent: false,
  },
];

const ReviewCard = ({ review, onExpand }: ReviewCardProps) => {
  const cardColor = useThemeColor(
    { light: "#ffffff", dark: "#1c1c1e" },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Google":
        return "#4285f4";
      case "Yelp":
        return "#ff1744";
      case "Facebook":
        return "#1877f2";
      default:
        return "#8e8e93";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "#10b981";
    if (rating >= 3) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <View style={[styles.reviewCard, { backgroundColor: cardColor }]}>
      {/* Header */}
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <View
            style={[
              styles.reviewerAvatar,
              { backgroundColor: getPlatformColor(review.platform) },
            ]}
          >
            <ThemedText style={styles.reviewerInitial}>
              {review.reviewerInitial}
            </ThemedText>
          </View>
          <View style={styles.reviewerDetails}>
            <ThemedText style={styles.reviewerName}>
              {review.reviewerName}
            </ThemedText>
            <View style={styles.reviewMeta}>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={14}
                    color={star <= review.rating ? "#fbbf24" : "#e5e7eb"}
                  />
                ))}
                <ThemedText
                  style={[
                    styles.ratingText,
                    { color: getRatingColor(review.rating) },
                  ]}
                >
                  {review.rating}/5
                </ThemedText>
              </View>
              <View style={styles.platformBadge}>
                <ThemedText
                  style={[
                    styles.platformText,
                    { color: getPlatformColor(review.platform) },
                  ]}
                >
                  {review.platform}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.reviewActions}>
          {review.isRecent && (
            <View style={styles.newBadge}>
              <ThemedText style={styles.newBadgeText}>New</ThemedText>
            </View>
          )}
          <ThemedText style={[styles.reviewDate, { color: mutedColor }]}>
            {review.date}
          </ThemedText>
        </View>
      </View>

      {/* Review Content */}
      <View style={styles.reviewContent}>
        <ThemedText
          style={[styles.reviewText, { color: textColor }]}
          numberOfLines={3}
        >
          {review.reviewText}
        </ThemedText>
      </View>

      {/* Footer */}
      <View style={styles.reviewFooter}>
        <View style={styles.reviewStatus}>
          {review.hasReply ? (
            <View style={styles.statusContainer}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <ThemedText style={[styles.statusText, { color: "#10b981" }]}>
                Replied
              </ThemedText>
            </View>
          ) : (
            <View style={styles.statusContainer}>
              <Ionicons name="time" size={16} color="#f59e0b" />
              <ThemedText style={[styles.statusText, { color: "#f59e0b" }]}>
                Pending Reply
              </ThemedText>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => onExpand(review)}
        >
          <ThemedText style={[styles.expandText, { color: "#3b82f6" }]}>
            Expand
          </ThemedText>
          <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StatsCard = () => {
  const cardColor = useThemeColor(
    { light: "#ffffff", dark: "#1c1c1e" },
    "background"
  );
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  return (
    <View style={[styles.statsCard, { backgroundColor: cardColor }]}>
      <View style={styles.statItem}>
        <ThemedText style={styles.statNumber}>4.2</ThemedText>
        <ThemedText style={[styles.statLabel, { color: mutedColor }]}>
          Avg Rating
        </ThemedText>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <ThemedText style={styles.statNumber}>127</ThemedText>
        <ThemedText style={[styles.statLabel, { color: mutedColor }]}>
          Total Reviews
        </ThemedText>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <ThemedText style={[styles.statNumber, { color: "#f59e0b" }]}>
          3
        </ThemedText>
        <ThemedText style={[styles.statLabel, { color: mutedColor }]}>
          Pending
        </ThemedText>
      </View>
    </View>
  );
};

export default function ManageReviews() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "pending" | "replied">(
    "all"
  );

  const backgroundColor = useThemeColor({}, "background");
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  const handleExpandReview = (review: Review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedReview(null);
  };

  const filteredReviews = mockReviews.filter((review) => {
    if (filterType === "pending") return !review.hasReply;
    if (filterType === "replied") return review.hasReply;
    return true;
  });

  const renderReview = ({ item }: { item: Review }) => (
    <ReviewCard review={item} onExpand={handleExpandReview} />
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Manage Reviews</ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: mutedColor }]}>
          Monitor and respond to customer feedback
        </ThemedText>
      </View>

      {/* Stats Card */}
      <StatsCard />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {[
            { key: "all", label: "All Reviews", count: mockReviews.length },
            {
              key: "pending",
              label: "Pending Reply",
              count: mockReviews.filter((r) => !r.hasReply).length,
            },
            {
              key: "replied",
              label: "Replied",
              count: mockReviews.filter((r) => r.hasReply).length,
            },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                filterType === filter.key && styles.filterTabActive,
              ]}
              onPress={() => setFilterType(filter.key as any)}
            >
              <ThemedText
                style={[
                  styles.filterTabText,
                  filterType === filter.key && styles.filterTabTextActive,
                ]}
              >
                {filter.label} ({filter.count})
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.reviewsList}
      />

      {/* Review Management Modal */}
      <ReviewManagementModal
        visible={modalVisible}
        review={selectedReview}
        onClose={handleCloseModal}
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
  statsCard: {
    flexDirection: "row",
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
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 24,
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
  reviewsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  reviewCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  reviewerInitial: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  reviewerDetails: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  reviewMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  platformBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "rgba(142, 142, 147, 0.1)",
  },
  platformText: {
    fontSize: 10,
    fontWeight: "600",
  },
  reviewActions: {
    alignItems: "flex-end",
  },
  newBadge: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  newBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  reviewDate: {
    fontSize: 12,
  },
  reviewContent: {
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewStatus: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  expandText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
