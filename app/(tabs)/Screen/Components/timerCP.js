import { BUTTON_HEIGHT } from './values';

export const getCenterPosition = (offsetY) => {
  return getIndexFromOffset(offsetY) * BUTTON_HEIGHT;
};
export const getCenterPositionFromIndex = (index) => {
  return index * BUTTON_HEIGHT;
};
export const getIndexFromOffset = (offsetY) => {
  return Math.round(offsetY / BUTTON_HEIGHT);
};
export const fillEmpty = (visibleCount, [...values]) => {
  const fillCount = (visibleCount - 1) / 2;
  for (let i = 0; i < fillCount; i++) {
    values.unshift('');
    values.push('');
  }
  return values;
};

export const asPickerFormat = (date: Date) => {
  const _date = new Date(date.getTime());
  const hour = _date.getHours();
  const min = _date.getMinutes();
  _date.setTime(Date.now());
  _date.setHours(hour);
  _date.setMinutes(min + (5 - (min % 5)));
  _date.setSeconds(0);
  _date.setMilliseconds(0);
  return _date;
};




// export const getCenterPosition = (offsetY) => {
//   return getIndexFromOffset(offsetY) * BUTTON_HEIGHT;
// };

// export const getCenterPositionFromIndex = (index) => {
//   return index * BUTTON_HEIGHT;
// };

// export const getIndexFromOffset = (offsetY) => {
//   return Math.round(offsetY / BUTTON_HEIGHT);
// };

// export const fillEmpty = (visibleCount, values) => {
//   if (visibleCount % 2 === 0) {
//     throw new Error('visibleCount must be odd');
//   }

//   const fillCount = Math.floor(visibleCount / 2);
//   const emptyArray = Array(fillCount).fill('');
//   return [...emptyArray, ...values, ...emptyArray];
// };

// export const asPickerFormat = (date) => {
//   if (!(date instanceof Date) || isNaN(date)) {
//     throw new Error('Invalid date object');
//   }

//   const _date = new Date(date.getTime());
//   const min = _date.getMinutes();
//   const roundedMinutes = Math.ceil(min / 5) * 5; // 5분 단위로 반올림
//   _date.setMinutes(roundedMinutes);
//   _date.setSeconds(0);
//   _date.setMilliseconds(0);
//   return _date;
// };
