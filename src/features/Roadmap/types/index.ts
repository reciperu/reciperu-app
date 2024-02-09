export interface RoadmapItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  status: ['対応中'] | ['対応済'] | ['未対応'];
  description?: string;
}
