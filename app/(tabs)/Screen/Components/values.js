// Constants for Timer Component
export const BUTTON_HEIGHT = 40; // Button height in pixels
export const VIEW_WIDTH = 230; // Timer view width
export const GAP = 12; // Gap between timer elements

// Meridiem options
export const MERIDIEM_ITEMS = ['오전', '오후'];

// Hour items (12-hour format)
export const HOUR_ITEMS = Array.from({ length: 12 }, (_, i) =>
  String((i + 12) % 12 || 12).padStart(2, '0')
);

// Minute items (5-minute intervals)
export const MINUTE_ITEMS = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, '0')
);
