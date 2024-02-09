import { Container } from '@/components/ui/Container';
import { Flex } from '@/components/ui/Flex';
import { NotoText } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { APP_NAME } from '@/features/Onboarding/Recipe/constants';
import { useFetchRoadmap } from '@/features/Roadmap/apis/getRoadmap';
import * as ExpoConstants from 'expo-constants';
import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';

export default function AboutPage() {
  const { data } = useFetchRoadmap();
  const displayData = useMemo(() => {
    if (data) {
      // statusを対応中、未対応、対応済みに分ける
      const inProgress = data.filter((item) => item.status[0] === '対応中');
      const notSupported = data.filter((item) => item.status[0] === '未対応');
      const supported = data.filter((item) => item.status[0] === '対応済');
      return [...inProgress, ...notSupported, ...supported];
    }
    return [];
  }, [data]);
  const getStatusLabel = useCallback((status: '対応中' | '未対応' | '対応済') => {
    if (status === '対応中') {
      return '開発中';
    }
    if (status === '未対応') {
      return '未対応';
    }
    if (status === '対応済') {
      return '対応済';
    }
  }, []);
  const getStatusColor = useCallback((status: '対応中' | '未対応' | '対応済') => {
    if (status === '対応中') {
      return '#48BB78';
    }
    if (status === '未対応') {
      return '#ECC94B';
    }
    if (status === '対応済') {
      return '#90CDF4';
    }
  }, []);
  // アプリのバージョンを取得
  const appVersion = (ExpoConstants.default as any).manifest.version;
  return (
    <Container bgColor={Constants.colors.primitive.gray[100]}>
      <Text>{APP_NAME}について</Text>
      {displayData.length > 0 && (
        <View style={{ marginTop: 24 }}>
          <Flex style={{ alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: Constants.colors.primitive.pink[300],
                borderRadius: 5,
              }}
            />
            <NotoText style={{ fontSize: 12, lineHeight: 16 }}>追加予定の機能</NotoText>
          </Flex>
          <Flex style={{ flexDirection: 'column', gap: 12 }}>
            {displayData.map((item) => (
              <Flex
                key={item.id}
                style={{
                  alignItems: 'center',
                  padding: 12,
                  gap: 8,
                  backgroundColor: 'white',
                  borderRadius: Constants.radius.lg,
                }}>
                <View style={{ flex: 1 }}>
                  <NotoText style={{ fontSize: 14, lineHeight: 18 }}>{item.title}</NotoText>
                  {item.description && (
                    <NotoText style={{ fontSize: 10, color: Constants.colors.primitive.gray[600] }}>
                      {item.description}
                    </NotoText>
                  )}
                </View>
                <Flex style={{ alignItems: 'center', gap: 4 }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: getStatusColor(item.status[0]),
                      borderRadius: 4,
                    }}
                  />
                  <NotoText
                    style={{
                      fontSize: 12,
                      lineHeight: 16,
                      color: Constants.colors.primitive.gray[600],
                    }}>
                    {getStatusLabel(item.status[0])}
                  </NotoText>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </View>
      )}
      <Text
        style={{
          color: Constants.colors.primitive.gray[400],
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 40,
        }}>
        v{appVersion}
      </Text>
    </Container>
  );
}
