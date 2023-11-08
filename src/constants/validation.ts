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
} as const;
