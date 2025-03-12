import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Styles for the button
const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: 'rgb(243,243,243)',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    color: 'white',
  },
  imgLeft: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
});

// Default props for the button
const defaultProps = {
  isLoading: false,
  isDisabled: false,
  style: styles.btn,
  textStyle: styles.txt,
  imgLeftStyle: styles.imgLeft,
  indicatorColor: 'white',
  activeOpacity: 0.5,
};

const Button = ({
  children,
  isLoading = false,
  isDisabled = false,
  onPress,
  style = styles.btn,
  disabledStyle,
  textStyle = styles.txt,
  imgLeftSrc,
  imgLeftStyle = styles.imgLeft,
  indicatorColor = 'white',
  activeOpacity = 0.5,
}) => {
  if (isDisabled) {
    return (
      <View style={disabledStyle || style}>
        <Text style={textStyle}>{children}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={style}>
        <ActivityIndicator size="small" color={indicatorColor} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}>
      <View style={style}>
        {imgLeftSrc ? (
          <Image style={imgLeftStyle} source={imgLeftSrc} />
        ) : null}
        <Text style={textStyle}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;

export default Button;
