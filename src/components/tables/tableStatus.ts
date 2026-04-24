export type TableStatus = "free" | "occupied" | "reserved";

type TableStatusMeta = {
  text: string;
  badgeClassName: string;
  surfaceClassName: string;
};

export function getTableStatusMeta(status: TableStatus): TableStatusMeta {
  switch (status) {
    case "occupied":
      return {
        text: "Occ",
        badgeClassName: "bg-occupied text-text",
        surfaceClassName: "bg-occupied-background",
      };
    case "reserved":
      return {
        text: "Res",
        badgeClassName: "bg-reserved text-white",
        surfaceClassName: "bg-reserved-background",
      };
    default:
      return {
        text: "Free",
        badgeClassName: "bg-free text-text",
        surfaceClassName: "bg-free-background",
      };
  }
}
