export interface ColorVariable {
  id: string;
  name: string;
  description: string;
  type: string;
  valuesByMode: Record<
    string,
    {
      r: number;
      g: number;
      b: number;
      a: number;
    }
  >;
  resolvedValuesByMode: Record<
    string,
    {
      resolvedValue: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
      alias: string | null;
    }
  >;
  scopes: string[];
  hiddenFromPublishing: boolean;
  codeSyntax: Record<string, any>; // または {} で表現できます
}

export type ColorData = {
  primitive: {
    orange: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    'white alpha': {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    'black alpha': {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    gray: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    red: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    yellow: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    black: {
      undefined: string;
    };
    white: {
      undefined: string;
    };
    green: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    teal: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    blue: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    cyan: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    purple: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
    pink: {
      [shade in
        | '50'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900']: string;
    };
  };
};
