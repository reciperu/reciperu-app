export const convertErrorMessage = (text: string) => {
  switch (text) {
    case 'Access to this resource is forbidden':
      return 'ログイン状況を確認してください';
    default:
      return text;
  }
};
