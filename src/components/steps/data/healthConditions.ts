export interface Condition {
    name: string;
    isParent?: boolean;
    isCustomInput?: boolean;
    subConditions?: Condition[];
  }
  
  export const commonConditions: Condition[] = [
    { 
      name: "heart conditions",
      isParent: true,
      subConditions: [
        { name: "hypertension" },
        { name: "coronary artery disease" },
        { name: "arrhythmia" },
        { name: "other", isCustomInput: true },
      ],
    },
    { 
      name: "respiratory conditions",
      isParent: true,
      subConditions: [
        { name: "asthma" },
        { name: "chronic bronchitis" },
        { name: "emphysema" },
        { name: "other", isCustomInput: true },
      ],
    },
    { name: "diabetes" },
    { 
      name: "musculoskeletal",
      isParent: true,
      subConditions: [
        { name: "arthritis" },
        { name: "osteoporosis" },
        { name: "back pain" },
        { name: "other", isCustomInput: true },
      ],
    },
    { name: "cancer" },
    { 
      name: "mental health",
      isParent: true,
      subConditions: [
        { name: "depression" },
        { name: "anxiety" },
        { name: "bipolar disorder" },
        { name: "other", isCustomInput: true },
      ],
    },
    { name: "Other (Please specify)" },
  ];
  