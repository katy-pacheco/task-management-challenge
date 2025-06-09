import { TaskTag } from "../graphql/queries/get-task.graphql.generated";

export const taskTagLabel: Record<TaskTag, string> = {
  [TaskTag.Android]: "ANDROID",
  [TaskTag.Ios]: "IOS",
  [TaskTag.NodeJs]: "NODE JS",
  [TaskTag.Rails]: "RAILS",
  [TaskTag.React]: "REACT",
};

export function getTaskTagLabel(tag: TaskTag): string {
  return taskTagLabel[tag];
}
