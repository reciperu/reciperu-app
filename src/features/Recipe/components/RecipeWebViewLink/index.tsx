import { Link } from 'expo-router';
import { PropsWithChildren, memo } from 'react';

interface Props {
  id: number;
  title: string;
  recipeUrl: string;
}

export const RecipeWebviewLink = memo<PropsWithChildren<Props>>(
  ({ id, title, recipeUrl, children }) => {
    return (
      <Link
        href={{
          pathname: `/recipe_detail/${id}/webview`,
          params: { title, recipeUrl },
        }}
        asChild>
        {children}
      </Link>
    );
  }
);
