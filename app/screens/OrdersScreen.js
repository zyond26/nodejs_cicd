import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ['Đang đến', 'Deal đã mua', 'Lịch sử', 'Đánh giá', 'Đơn nháp'];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('Đang đến');

  const renderContent = () => {
    switch (activeTab) {
      case 'Đang đến':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Quên chưa đặt món rồi nè bạn ơi?</Text>
            <Text style={styles.description}>
              Bạn sẽ nhìn thấy các món đang được chuẩn bị hoặc giao đi tại đây để kiểm tra đơn hàng nhanh hơn!
            </Text>
            <Text style={styles.suggestionTitle}>Có thể bạn cũng thích</Text>
            <View style={styles.card}>
              <Text style={styles.shopName}>🛍️ Xuân Food - Mì Trộn Indomie - Văn Phú</Text>
              <Text style={styles.shopInfo}>⭐ 4.7 | 0.4km | 30 phút</Text>
              <Text style={styles.promos}>Giảm món, Tặng 1 quà tặng, Mã giảm 16k</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.shopName}>❤️ Gong Ju - Kimbap & Món Hàn - Hà Đông</Text>
              <Text style={styles.shopInfo}>⭐ 4.6 | 1.1km | 37 phút</Text>
              <Text style={styles.promos}>Mã giảm 20%</Text>
            </View>
          </View>
        );
      case 'Deal đã mua':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Chưa có Deal nào</Text>
          </View>
        );
      case 'Lịch sử':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.description}>Bạn sẽ nhìn thấy các món đã đặt tại đây để có thể thưởng thức lại món yêu thích bất cứ lúc nào!</Text>
          </View>
        );
      case 'Đánh giá':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Chưa có đơn để đánh giá</Text>
            <Text style={styles.description}>Đặt món ngay để thêm đánh giá mới bạn nhé!</Text>
          </View>
        );
      case 'Đơn nháp':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>"Hông" có gì trong giỏ hết! Đói quá à!</Text>
            <Text style={styles.description}>Nhanh nhanh đặt món ngon tụi mình cùng măm nào!</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{renderContent()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#f33',
  },
  activeTabText: {
    color: '#f33',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  shopInfo: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  promos: {
    fontSize: 13,
    color: '#f33',
  },
});

export default OrdersScreen;