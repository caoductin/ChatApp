import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';

export const CustomGallerySheet = ({ isVisible, initialHeight, maxHeight, children }) => {
  // 2. Tạo Animated Value để điều khiển chiều cao
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // 3. Xử lý animation khi isVisible thay đổi
  useEffect(() => {
    // Chiều cao đích: initialHeight khi hiện, 0 khi ẩn
    const targetHeight = isVisible ? initialHeight : 0;
    
    // Sử dụng Animated.timing để chuyển đổi mượt mà
    Animated.timing(animatedHeight, {
      toValue: targetHeight,
      duration: 300, // Thời gian animation
      useNativeDriver: false, // Bắt buộc phải là false khi animate height/width
    }).start();
    
  }, [isVisible, initialHeight]);
  
  // Logic đơn giản để kéo lên (chỉ là demo, chưa có PanResponder)
  const expandSheet = () => {
      Animated.timing(animatedHeight, {
        toValue: maxHeight,
        duration: 200,
        useNativeDriver: false,
      }).start();
  }

  // Đảm bảo View không bị render nếu chiều cao ban đầu là 0
  if (initialHeight === 0 && !isVisible) return null; 

  return (
    <Animated.View style={[styles.sheetContainer, { height: animatedHeight }]}>
      <TouchableOpacity onPress={expandSheet} style={styles.handle}>
        <View style={styles.indicator} />
      </TouchableOpacity>
      <View style={styles.content}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  handle: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  indicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  }
});

// ... (Styles)