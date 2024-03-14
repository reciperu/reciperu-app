import * as ExpoConstants from 'expo-constants';
import { Image } from 'expo-image';
import { Fragment, useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Constants } from '@/constants';
import { useFetchRoadmap } from '@/features/Roadmap/apis/getRoadmap';
import { RoadmapItem } from '@/features/Roadmap/components/RoadmapItem';
import { Container } from '@/features/chore/Container';
import { Flex } from '@/features/chore/Flex';
import { Spacer } from '@/features/chore/Spacer';
import { NotoText } from '@/features/chore/Text';
import { AppIcon } from '@/features/chore/icons';
import { openURL } from '@/functions/utils';

const DEVELOPER_LIST = [
  {
    name: 'りょーた',
    x: 'https://twitter.com/RyoTa___0222',
    image: require('assets/developer_ryota.png'),
  },
  {
    name: 'まーとくん',
    x: 'https://twitter.com/tezmasatoo',
    image: require('assets/developer_masato.png'),
  },
];

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
  // アプリのバージョンを取得
  const appVersion = (ExpoConstants.default as any).manifest.version;
  return (
    <ScrollView style={{ backgroundColor: Constants.colors.primitive.pink[50] }}>
      <Container bgColor={Constants.colors.primitive.pink[50]}>
        <Flex style={{ justifyContent: 'center', marginVertical: 24 }}>
          <Image source={require('assets/logo-vertical.svg')} style={{ width: 84, height: 126 }} />
        </Flex>
        <Flex style={{ alignItems: 'center', gap: 4, marginBottom: 6 }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: Constants.colors.primitive.pink[300],
              borderRadius: 5,
            }}
          />
          <NotoText style={{ fontSize: 12, lineHeight: 16 }}>開発者</NotoText>
        </Flex>
        {DEVELOPER_LIST.map((item) => (
          <Pressable onPress={() => openURL(item.x)} key={item.name}>
            <Flex
              style={{
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                backgroundColor: 'white',
                padding: 12,
                borderRadius: Constants.radius.lg,
              }}>
              <Image source={item.image} style={{ width: 48, height: 48, borderRadius: 24 }} />
              <Flex style={{ flexDirection: 'column', gap: 4 }}>
                <NotoText fw="bold" style={{ fontSize: 14, lineHeight: 16 }}>
                  {item.name}
                </NotoText>
                <NotoText
                  style={{
                    fontSize: 12,
                    lineHeight: 14,
                    color: Constants.colors.primitive.gray[500],
                  }}>
                  Xで見る
                </NotoText>
                <Spacer />
              </Flex>
              <Spacer />
              <AppIcon
                name="new-window-arrow"
                width={20}
                height={20}
                color={Constants.colors.primitive.gray[300]}
              />
            </Flex>
          </Pressable>
        ))}
        {displayData.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Flex style={{ alignItems: 'center', gap: 4, marginBottom: 6 }}>
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
                <Fragment key={item.id}>
                  <RoadmapItem {...item} />
                </Fragment>
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
    </ScrollView>
  );
}
