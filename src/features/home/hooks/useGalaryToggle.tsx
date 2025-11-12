import { useState, useEffect } from 'react';
import { Keyboard, Dimensions } from 'react-native';

const MAX_HEIGHT_RATIO = 0.8; // Chiều cao tối đa là 80% màn hình

export const useImageGalleryToggle = () => {
  const screenHeight = Dimensions.get('window').height;
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // 1. Lắng nghe sự kiện bàn phím
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      // Lấy chiều cao bàn phím
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // Reset chiều cao về 0 khi ẩn
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Tính toán các chiều cao quan trọng
  const initialHeight = keyboardHeight > 0 ? keyboardHeight : screenHeight * 0.4; // Mặc định 40% nếu keyboard chưa hiện
  const maxHeight = screenHeight * MAX_HEIGHT_RATIO;
  
  const toggleGallery = () => {
    // Ẩn bàn phím khi mở Gallery
    Keyboard.dismiss();
    setIsGalleryVisible(prev => !prev);
  };

  return {
    isGalleryVisible,
    toggleGallery,
    initialHeight,
    maxHeight,
  };
};