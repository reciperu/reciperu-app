export const isValidUrl = (value: string) => {
  try {
    // スペースがあればfalse
    if (value.includes(' ')) return false;
    const _ = new URL(value);
    return true;
  } catch (_) {
    return false;
  }
};
