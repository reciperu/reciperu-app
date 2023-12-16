export interface RadiusVariable {
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

export interface RadiusData {
  '2xl': 16;
  '3xl': 24;
  base: 4;
  full: 9999;
  lg: 8;
  md: 6;
  sm: 2;
  xl: 12;
}
