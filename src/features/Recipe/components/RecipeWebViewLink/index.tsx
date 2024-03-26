import { Link } from 'expo-router';
import { PropsWithChildren, memo } from 'react';

interface Props {
  id: string;
  title: string;
  recipeUrl: string;
}

export const RecipeWebviewLink = memo<PropsWithChildren<Props>>(
  ({ id, title, recipeUrl, children }) => {
    return (
      <Link
        href={{
          pathname: '(main)/recipe_webview',
          params: { id, title, recipeUrl },
        }}
        asChild>
        {children}
      </Link>
    );
  }
);
