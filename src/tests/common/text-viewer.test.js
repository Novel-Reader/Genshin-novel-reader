import renderer from "react-test-renderer";
import TextViewer from "../../common/text-viewer";

it("render text-viewer", () => {
  const detail = "This is test txt file.";
  const component = renderer.create(
    <div>
      <TextViewer detail={detail} />
    </div>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
