import renderer from 'react-test-renderer';
import TextViewer from '../../common/text-viewer';

it('render text-viewer', () => {
  const context = 'This is test txt file.';
  const component = renderer.create(
    <div>
      <TextViewer context={context}/>
    </div>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
