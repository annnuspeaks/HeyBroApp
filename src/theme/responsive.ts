import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isTablet = width >= 768;

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const scale = (size: number) =>
  (width / guidelineBaseWidth) * size;

export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

export const moderateScale = (
  size: number,
  factor = 0.5,
) => size + (scale(size) - size) * factor;

export const fontScale = (size: number) =>
  size / PixelRatio.getFontScale();