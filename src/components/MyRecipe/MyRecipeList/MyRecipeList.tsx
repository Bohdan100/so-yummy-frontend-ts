import { List } from './MyRecipeList.styled';
import MyRecipeItem from '../MyRecipeItem';

import { IRecipe } from 'types';

interface IMyRecipeListProps {
  data: IRecipe[];
}

const MyRecipeList: React.FC<IMyRecipeListProps> = ({ data }) => {
  return (
    <List>
      {data.map(({ description, preview, time, title, _id }) => {
        return (
          <MyRecipeItem
            key={_id}
            description={description}
            preview={preview}
            time={time}
            title={title}
            id={_id}
          />
        );
      })}
    </List>
  );
};
export default MyRecipeList;
