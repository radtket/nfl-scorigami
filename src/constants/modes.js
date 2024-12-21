export const MODE_COLOR_BLIND = 'MODE_COLOR_BLIND';
export const MODE_SHOW_GRADIENT = 'MODE_SHOW_GRADIENT';
export const MODE_SHOW_EMPTY_ROWS = 'MODE_SHOW_EMPTY_ROWS';
export const MODE_SHOW_COUNT = 'MODE_SHOW_COUNT';

export const MODE_COUNT = 'MODE_COUNT';
export const MODE_FIRST_GAME_CALENDAR_YEAR = 'MODE_FIRST_GAME_CALENDAR_YEAR';
export const MODE_FIRST_GAME_SEASON_YEAR = 'MODE_FIRST_GAME_SEASON_YEAR';
export const MODE_LATEST_GAME = 'MODE_LATEST_GAME';

export const MULTI_SELECT_OPTIONS = [
  { name: 'Colorblind Mode', value: MODE_COLOR_BLIND },
  { name: 'Show Gradient', value: MODE_SHOW_GRADIENT },
  { name: 'Show Empty Rows', value: MODE_SHOW_EMPTY_ROWS },
  { name: 'Show Count', value: MODE_SHOW_COUNT },
];

export const SINGLE_SELECT_OPTIONS = [
  {
    code: 'SELECT_A_MODE',
    name: 'Select a Mode',
    disabled: true,
  },
  {
    code: MODE_COUNT,
    name: 'Count',
  },
  {
    code: MODE_FIRST_GAME_CALENDAR_YEAR,
    name: 'First Game (Calendar Year)',
  },
  {
    code: MODE_FIRST_GAME_SEASON_YEAR,
    name: 'First Game (Season Year)',
  },
  {
    code: MODE_LATEST_GAME,
    name: 'Latest Game',
  },
];
