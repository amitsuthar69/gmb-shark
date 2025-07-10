import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import BusinessDetailModal from "@/components/ui/BuisnessDetailsModal";

interface BusinessItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  distance: string;
  isOpen: boolean;
}

interface SearchResultProps {
  item: BusinessItem;
  onPress: (item: BusinessItem) => void;
}

const mockSuggestions: BusinessItem[] = [
  {
    id: "1",
    name: "Pizza Palace",
    category: "Restaurant",
    rating: 4.5,
    reviews: 234,
    address: "123 Main St, Downtown",
    distance: "0.5 mi",
    isOpen: true,
  },
  {
    id: "2",
    name: "Coffee Corner",
    category: "Cafe",
    rating: 4.2,
    reviews: 156,
    address: "456 Oak Ave, Midtown",
    distance: "0.8 mi",
    isOpen: true,
  },
];

const SearchResultItem = ({ item, onPress }: SearchResultProps) => {
  const cardColor = useThemeColor(
    { light: "#ffffff", dark: "#1c1c1e" },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  return (
    <TouchableOpacity
      style={[styles.resultItem, { backgroundColor: cardColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.resultHeader}>
        <View style={styles.resultInfo}>
          <ThemedText style={styles.resultName}>{item.name}</ThemedText>
          <ThemedText style={[styles.resultCategory, { color: mutedColor }]}>
            {item.category}
          </ThemedText>
        </View>
        <View style={styles.resultMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#fbbf24" />
            <ThemedText style={styles.rating}>{item.rating}</ThemedText>
            <ThemedText style={[styles.reviews, { color: mutedColor }]}>
              ({item.reviews})
            </ThemedText>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: item.isOpen ? "#10b981" : "#ef4444" },
            ]}
          >
            <ThemedText style={styles.statusText}>
              {item.isOpen ? "Open" : "Closed"}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.resultFooter}>
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={14} color={mutedColor} />
          <ThemedText style={[styles.address, { color: mutedColor }]}>
            {item.address}
          </ThemedText>
        </View>
        <ThemedText style={[styles.distance, { color: mutedColor }]}>
          {item.distance}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const EmptySearchState = () => {
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  return (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={48} color={mutedColor} />
      <ThemedText style={[styles.emptyStateText, { color: mutedColor }]}>
        Start typing to search for businesses
      </ThemedText>
    </View>
  );
};

const NoResultsState = ({ searchQuery }: { searchQuery: string }) => {
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  return (
    <View style={styles.emptyState}>
      <Ionicons name="sad-outline" size={48} color={mutedColor} />
      <ThemedText style={[styles.emptyStateText, { color: mutedColor }]}>
        No results found for "{searchQuery}"
      </ThemedText>
      <ThemedText style={[styles.emptyStateSubtext, { color: mutedColor }]}>
        Try adjusting your search terms
      </ThemedText>
    </View>
  );
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BusinessItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessItem | null>(
    null
  );

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor(
    { light: "#ffffff", dark: "#1c1c1e" },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor(
    { light: "#8e8e93", dark: "#8e8e93" },
    "text"
  );

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowSuggestions(true);
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowSuggestions(false);

    const searchTimeout = setTimeout(() => {
      const results = mockSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleItemPress = (item: BusinessItem) => {
    console.log("Selected business:", item);
    setSelectedBusiness(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBusiness(null);
  };

  const renderItem = ({ item }: { item: BusinessItem }) => (
    <SearchResultItem item={item} onPress={handleItemPress} />
  );

  const renderSuggestionItem = ({ item }: { item: BusinessItem }) => (
    <SearchResultItem item={item} onPress={handleItemPress} />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Search Business</ThemedText>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: cardColor }]}>
        <Ionicons
          name="search"
          size={20}
          color={mutedColor}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="type something..."
          placeholderTextColor={mutedColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={mutedColor} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {showSuggestions && (
          <>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Competitors</ThemedText>
              <ThemedText
                style={[styles.sectionSubtitle, { color: mutedColor }]}
              >
                Popular businesses in your area
              </ThemedText>
            </View>
            <FlatList
              data={mockSuggestions}
              renderItem={renderSuggestionItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </>
        )}

        {!showSuggestions && (
          <>
            {isSearching ? (
              <View style={styles.loadingContainer}>
                <ThemedText style={[styles.loadingText, { color: mutedColor }]}>
                  Searching...
                </ThemedText>
              </View>
            ) : searchResults.length > 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.sectionTitle}>
                    Search Results ({searchResults.length})
                  </ThemedText>
                </View>
                <FlatList
                  data={searchResults}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContainer}
                />
              </>
            ) : (
              <NoResultsState searchQuery={searchQuery} />
            )}
          </>
        )}

        {searchQuery.trim() === "" && !showSuggestions && <EmptySearchState />}
      </View>
      <BusinessDetailModal
        visible={modalVisible}
        business={selectedBusiness}
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 24,
  },
  resultItem: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  resultInfo: {
    flex: 1,
    marginRight: 12,
  },
  resultName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    fontWeight: "500",
  },
  resultMeta: {
    alignItems: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
    marginRight: 2,
  },
  reviews: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  resultFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  address: {
    fontSize: 14,
    marginLeft: 6,
    flex: 1,
  },
  distance: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
