import React, { FC, ReactNode } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

interface Props {
  children: ReactNode;
}

const KeyBoardDismissView: FC<Props> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default KeyBoardDismissView;
