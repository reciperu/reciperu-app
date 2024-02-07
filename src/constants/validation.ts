export const Validation = {
  USER_NAME: {
    REQUIRED: {
      VALUE: true,
      MESSAGE: '名前を入力してください',
    },
    MAX_LENGTH: {
      VALUE: 20,
      MESSAGE: '名前は20文字以内で入力してください',
    },
  },
  SPACE_NAME: {
    REQUIRED: {
      VALUE: true,
      MESSAGE: '名前を入力してください',
    },
    MAX_LENGTH: {
      VALUE: 15,
      MESSAGE: '名前は20文字以内で入力してください',
    },
  },
  RECIPE_NAME: {
    REQUIRED: {
      VALUE: true,
      MESSAGE: '料理名を入力してください',
    },
    MAX_LENGTH: {
      VALUE: 40,
      MESSAGE: '料理名は40文字以内で入力してください',
    },
  },
  RECIPE_MEMO: {
    REQUIRED: {
      VALUE: true,
      MESSAGE: 'メモを入力してください',
    },
    MAX_LENGTH: {
      VALUE: 100,
      MESSAGE: 'メモは100文字以内で入力してください',
    },
  },
  RECIPE_IMAGES: {
    COUNT: {
      VALUE: 3,
    },
  },
} as const;
