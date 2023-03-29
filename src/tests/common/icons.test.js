import renderer from 'react-test-renderer';
import { StarIcon, LoadingIcon, SearchIcon, ShareIcon, RightIcon, LeftIcon, ListIcon, TreeIcon, BackIcon, DeleteIcon } from '../../common/icons';

it('render icons', () => {
  const component = renderer.create(
    <div>
      <StarIcon/>
      <LoadingIcon/>
      <SearchIcon/>
      <ShareIcon/>
      <RightIcon/>
      <LeftIcon/>
      <ListIcon/>
      <TreeIcon/>
      <BackIcon/>
      <DeleteIcon/>
    </div>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
