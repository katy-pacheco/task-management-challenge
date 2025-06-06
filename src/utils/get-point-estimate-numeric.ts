import { PointEstimate } from "../graphql/queries/get-task.graphql.generated";

const pointEstimateStringMap: Record<PointEstimate, string> = {
  [PointEstimate.Eight]: "8",
  [PointEstimate.Four]: "4",
  [PointEstimate.Two]: "2",
  [PointEstimate.One]: "1",
  [PointEstimate.Zero]: "0",
};

export function getPointEstimateNumeric(point: PointEstimate): string {
  return pointEstimateStringMap[point];
}
