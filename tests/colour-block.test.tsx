import * as React from 'react';
import { create } from 'react-test-renderer';
import { ColourBlock, ColourText } from 'shared/components/ui/colour-block';

const testA: ColourText[] = [['Normal span...']];
const testB: ColourText[] = [['Coloured span!', '#C22']];
const testC: ColourText[] = [...testA, ...testB];

describe('<ColourBlock />', () => {
  it('Should render a regular span', () => {
    const tree = create(
      <div>
        <ColourBlock text={testA} />
      </div>
    );

    expect(tree).toMatchSnapshot();
  });

  it('Should render a stylised span', () => {
    const tree = create(
      <div>
        <ColourBlock text={testB} />
      </div>
    );

    expect(tree).toMatchSnapshot();
  });

  it('Should render a set of spans', () => {
    const tree = create(
      <div>
        <ColourBlock text={testC} />
      </div>
    );

    expect(tree).toMatchSnapshot();
  });
});
