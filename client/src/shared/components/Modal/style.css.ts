import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

const MODAL_Z_INDEX = 100;
const ANIMATION_DURATION_SECOND = 0.1;

const fadeIn = (to: number) =>
  keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: to },
  });
const fadeOut = (from: number) =>
  keyframes({
    '0%': { opacity: from },
    '100%': { opacity: 0 },
  });
const scaleUp = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});
const scaleDown = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
});

export const modalContainer = recipe({
  base: [u.flexCenter, u.fixedPos, u.top0, u.left0, u.fullSize, { zIndex: 100 }],
  variants: {
    isOpen: {
      true: { display: 'flex' },
      false: { display: 'none' },
    },
  },
});

export const modalOverlay = recipe({
  base: [
    u.positionAbsolute,
    u.top0,
    u.left0,
    u.fullHeight,
    u.fullWidth,
    {
      background: colors.light.scheme.$gray900,
      opacity: 0.3,
      zIndex: MODAL_Z_INDEX,
    },
  ],
  variants: {
    isAnimation: {
      false: { animation: `${ANIMATION_DURATION_SECOND}s ${fadeOut(0.3)}` },
      true: { animation: `${ANIMATION_DURATION_SECOND}s ${fadeIn(0.3)}` },
    },
  },
});

export const modalContent = recipe({
  base: [
    u.positionRelative,
    u.flexColumn,
    u.borderRadius2,
    {
      width: rem(375),
      minHeight: rem(37.5),
      // height: 'auto',
      backgroundColor: 'white',
      padding: rem(15),
      zIndex: MODAL_Z_INDEX,
    },
  ],
  variants: {
    isAnimation: {
      false: {
        animation: `${ANIMATION_DURATION_SECOND}s ${fadeOut(
          1,
        )}, ${ANIMATION_DURATION_SECOND}s ${scaleDown}`,
      },
      true: {
        animation: `${ANIMATION_DURATION_SECOND}s ${fadeIn(
          1,
        )}, ${ANIMATION_DURATION_SECOND}s ${scaleUp}`,
      },
    },
  },
});

export const modalCloseButton = style([
  u.positionAbsolute,
  u.right0,
  u.top0,
  u.cursorPointer,
  u.borderRadius2,
  {
    padding: rem(5),
    margin: rem(5),
    transition: 'background 0.3s ease',
    ':hover': {
      backgroundColor: colors.light.scheme.$gray100,
    },
  },
]);