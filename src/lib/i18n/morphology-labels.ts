const morphologyLabels: Record<string, string> = {
  common: "en word",
  neuter: "ett word",
};

export function morphologyLabel(value: string): string {
  return morphologyLabels[value] ?? value;
}
