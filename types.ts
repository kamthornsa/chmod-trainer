
export interface PermissionSet {
  r: boolean;
  w: boolean;
  x: boolean;
}

export interface Permissions {
  user: PermissionSet;
  group: PermissionSet;
  other: PermissionSet;
}

export type PermissionCategory = 'user' | 'group' | 'other';
export type PermissionType = 'r' | 'w' | 'x';

export enum ExerciseType {
  OctalToSymbolic,
  SymbolicToOctal,
  Scenario,
}

export interface Exercise {
  type: ExerciseType;
  question: string;
  answer: string;
}
