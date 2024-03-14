import { useMemo, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { usePostContact } from '@/features/Contact/apis/postContact';
import { APP_NAME } from '@/features/Onboarding/Recipe/constants';
import { Button } from '@/features/chore/Button';
import { Container } from '@/features/chore/Container';
import { InputLabel } from '@/features/chore/InputLabel';
import { Spacer } from '@/features/chore/Spacer';
import { TextInput } from '@/features/chore/TextInput';

export default function ContactPage() {
  const { postContactData } = usePostContact();
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [emailFormErrorMessage, setEmailFormErrorMessage] = useState('');
  const [contentFormErrorMessage, setContentFormErrorMessage] = useState('');
  const disabled = useMemo(() => {
    return content.length === 0;
  }, [content]);
  const validate = useCallback(() => {
    let flg = true;
    setEmailFormErrorMessage('');
    setContentFormErrorMessage('');
    // 入力した値がメールアドレスかどうか
    if (email && !email.match(/.+@.+\..+/)) {
      setEmailFormErrorMessage('メールアドレスを入力してください');
      flg = false;
    }
    // お問い合わせ内容が入力されているかどうか
    if (!content.trim()) {
      setContentFormErrorMessage('お問い合わせ内容を入力してください');
      flg = false;
    }
    return flg;
  }, [content, email]);
  const handleSend = useCallback(async () => {
    setPending(true);
    if (validate()) {
      // 送信処理
      const result = await postContactData({ email, content });
      if (result?.data.success) {
        setEmail('');
        setContent('');
        Toast.show({
          type: 'successToast',
          text1: '送信しました',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 60,
        });
      }
    }
    setPending(false);
  }, [content, email, postContactData, validate]);

  return (
    <Container>
      <Text style={styles.description}>{`いつも${APP_NAME}をご利用いただきありがとうございます。
皆様からのお問い合わせをもとに、より良いアプリに改善をしていきます。不具合のご報告や改善のご要望など、なんでもお問い合わせください！`}</Text>
      <View style={styles.inputWrapper}>
        <InputLabel>ご連絡先（メールアドレス）</InputLabel>
        <TextInput
          value={email}
          onChange={(text) => setEmail(text)}
          errorMessage={emailFormErrorMessage}
        />
      </View>
      <View style={styles.inputWrapper}>
        <InputLabel>メモ</InputLabel>
        <TextInput
          value={content}
          multiline
          numberOfLines={3}
          onChange={(text) => setContent(text)}
          style={styles.contentInputWrapper}
          errorMessage={contentFormErrorMessage}
        />
      </View>
      <Spacer />
      <Button disabled={disabled} onPress={handleSend} loading={pending}>
        送信
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 20,
  },
  inputWrapper: {
    paddingVertical: 12,
  },
  contentInputWrapper: { minHeight: 90 },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: Constants.colors.primitive.white['undefined'],
  },
});
