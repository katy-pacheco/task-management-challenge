interface ChipProps {
  color: "default" | "success" | "info" | "warning" | "error";
}

export function getColorTask(tag: string): ChipProps["color"] {
  switch (tag) {
    case "IOS":
      return "success";
    case "ANDROID":
      return "info";
    case "NODE_JS":
      return "warning";
    case "LABEL":
      return "warning";
    case "RAILS":
      return "error";
    case "REACT":
      return "default";
    default:
      return "default";
  }
}
