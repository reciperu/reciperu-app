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
  '2xl': number;
  '3xl': number;
  base: number;
  full: number;
  lg: number;
  md: number;
  sm: number;
  xl: number;
}
