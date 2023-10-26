export interface SpacingVariable {
  id: string;
  name: string;
  description: string;
  type: string;
  valuesByMode: { [key: string]: number };
  resolvedValuesByMode: {
    [key: string]: {
      resolvedValue: number;
      alias: string | null;
    };
  };
  scopes: string[];
  hiddenFromPublishing: boolean;
  codeSyntax: CodeSyntax;
}

interface CodeSyntax {}

export interface SpacingData {
  [key: string]: number;
  '0': number;
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
  '9': number;
  '10': number;
  '12': number;
  '14': number;
  '16': number;
  '20': number;
  '24': number;
  '28': number;
  '32': number;
  '36': number;
  '40': number;
  '44': number;
  '48': number;
  '52': number;
  '56': number;
  '60': number;
  '64': number;
  '72': number;
  '80': number;
  '96': number;
  px: number;
}
