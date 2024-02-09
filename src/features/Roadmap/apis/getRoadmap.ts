import { AxiosError } from 'axios';
import useSWR from 'swr';

import { RoadmapItem } from '../types';

export const useFetchRoadmap = () => {
  return useSWR<RoadmapItem[], AxiosError>('/roadmap');
};
