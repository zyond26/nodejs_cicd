import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import CartIcon from '../components/CartIcon';

const nearbyFoods = [
   {
    id: 'p1',
    name: 'Pizza phô mai',
    price: 99000,
    image: 'https://daylambanh.edu.vn/wp-content/uploads/2017/07/cach-lam-pizza-pho-mai.jpg',
  },
  {
    id: 'p2',
    name: 'Sushi cá hồi',
    price: 120000,
    image: 'https://file.hstatic.net/1000030244/article/sushi-ca-hoi-1_f774ee953eb74277a02b740013a01178.jpg',
  },
  {
    id: 'p3',
    name: 'Bánh mì bò nướng',
    price: 35000,
    image: 'https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg',
  },
  {
    id: 'p4',
    name: 'Trà sữa trân châu',
    price: 25000,
    image: 'https://xingfuvietnam.vn/wp-content/uploads/2023/02/xingfu-tra-sua-tran-chau-duong-den-2-FILEminimizer.jpg',
  },
  {
    id: 'p5',
    name: 'Gà rán giòn cay',
    price: 59000,
    image: 'https://cdn.tgdd.vn/2021/08/CookRecipe/GalleryStep/thanh-pham-1617.jpg',
  },
];

const popularFoods = [
 {
   id: 'f1',
   name: 'Cơm gà xối mỡ',
   price: '45.000đ',
   image: 'https://cdn.tgdd.vn/2021/01/CookRecipe/GalleryStep/thanh-pham-362.jpg',
 },
 {
   id: 'f2',
   name: 'Phở bò tái',
   price: '40.000đ',
   image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/pho-tai-lan.jpg',
 },
 {
   id: 'f3',
   name: 'Bún bò Huế',
   price: '50.000đ',
   image: 'https://file.hstatic.net/200000700229/article/bun-bo-hue-1_da318989e7c2493f9e2c3e010e722466.jpg',
 },
 {
   id: 'f4',
   name: 'Trà sữa trân châu',
   price: '30.000đ',
   image: 'https://gongcha.com.vn/wp-content/uploads/2018/02/Trà-sữa-Trân-châu-đen-1.png',
 },
 {
   id: 'f5',
   name: 'Gà rán giòn cay',
   price: '60.000đ',
   image: 'https://cdn.tgdd.vn/2021/08/CookRecipe/GalleryStep/thanh-pham-1617.jpg',
 },
 {
   id: 'f6',
   name: 'Bánh mì đặc biệt',
   price: '25.000đ',
   image: 'https://cdn.24h.com.vn/upload/4-2022/images/2022-11-25/5-loai-banh-mi-dac-san-Viet-Nam-cua-do-cac-tin-do-am-thuc-banh-my--1--1669357800-638-width800height533.jpg',
 },
 {
   id: 'f7',
   name: 'Lẩu thái chua cay',
   price: '120.000đ',
   image: 'https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg',
 },
 {
   id: 'f8',
   name: 'Pizza phô mai',
   price: '90.000đ',
   image: 'https://daylambanh.edu.vn/wp-content/uploads/2017/07/cach-lam-pizza-pho-mai.jpg',
 },
 {
   id: 'f9',
   name: 'Bánh xèo miền Trung',
   price: '35.000đ',
   image: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/02/cach-lam-banh-xeo-mien-trung.jpg',
 },
 {
   id: 'f10',
   name: 'Nem nướng Nha Trang',
   price: '45.000đ',
   image: 'https://mia.vn/media/uploads/blog-du-lich/diem_ten_10_quan_nem_nuong_nha_trang_ngon_quen_loi_ve_1-1623088085.jpg',
 },
];

const bestSellerFoods = [
  {
    id: 'b1',
    name: 'Cơm chiên Dương Châu',
    price: 48000,
    image: 'https://i-giadinh.vnecdn.net/2022/12/30/Buoc-4-4-4790-1672386702.jpg',
  },
  {
    id: 'b2',
    name: 'Mì Quảng Đặc Biệt',
    price: 52000,
    image: 'https://hapinut.com/wp-content/uploads/2022/03/mi-quang-quang-nam.jpg',
  },
  {
    id: 'b3',
    name: 'Bánh tráng trộn',
    price: 25000,
    image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/cach_lam_banh_trang_tron_tac_2_6efea7dc72.png',
  },
  {
    id: 'b4',
    name: 'Xôi gà lá sen',
    price: 30000,
    image: 'https://cdn.tgdd.vn/2021/07/CookRecipe/GalleryStep/thanh-pham-983.jpg',
  },
];

const topRatedFoods = [
  {
    id: 't1',
    name: 'Lẩu Thái chua cay',
    price: 99000,
    image: 'https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg',
  },
  {
    id: 't2',
    name: 'Gà nướng mật ong',
    price: 85000,
    image: 'https://file.hstatic.net/200000700229/article/lam-dui-ga-nuong-mat-ong-bang-lo-nuong-1_e17f9ace600a40018ed4fd25b8d1f30f.jpg',
  },
  {
    id: 't3',
    name: 'Bánh xèo miền Tây',
    price: 55000,
    image: 'https://daotaobeptruong.vn/wp-content/uploads/2020/01/banh-xeo-mien-tay.jpg',
  },
  {
    id: 't4',
    name: 'Bò kho bánh mì',
    price: 60000,
    image: 'https://amthucvietnam365.vn/wp-content/uploads/2021/05/1-26.jpg',
  },
];

export default function HomeScreen({ navigation }) {
  const { addToCart } = useCart();

  const handleFoodPress = (food) => {
    navigation.navigate('Chi tiết món ăn', { food });
  };

  const handleAddToCart = (food) => {
    addToCart(food);
    Alert.alert('Thành công', `${food.name} đã được thêm vào giỏ hàng!`);
  };

  const renderFoodCard = ({ item }) => (
    <View style={styles.foodCard}>
      <TouchableOpacity onPress={() => handleFoodPress(item)}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.foodPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CartIcon onPress={() => navigation.navigate('Giỏ hàng')} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Chào mừng bạn!</Text>
          <Text style={styles.subtitleText}>Đặt món ngon ngay hôm nay</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Tìm kiếm')}
          >
            <Text style={styles.searchText}>🔍 Tìm món ăn, nhà hàng...</Text>
          </TouchableOpacity>
        </View>

        {/* Gần tôi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Gần tôi</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={nearbyFoods}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderFoodCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
          />
        </View>

        {/* Món ăn phổ biến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Món ăn phổ biến</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularFoods}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderFoodCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
          />
        </View>

        {/* Bán chạy */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Bán chạy</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={bestSellerFoods}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderFoodCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
          />
        </View>

        {/* Đánh giá cao */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Đánh giá cao</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topRatedFoods}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderFoodCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
          />
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchText: {
    fontSize: 16,
    color: '#95a5a6',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllText: {
    fontSize: 14,
    color: '#ff6600',
    fontWeight: '600',
  },
  foodList: {
    paddingLeft: 20,
  },
  foodCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginRight: 15,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
    lineHeight: 18,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#ff6600',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});
