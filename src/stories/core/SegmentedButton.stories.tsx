import React, {useState} from 'react';

// Components
import SegmentedButton from '../../packages/core/SegmentedButton'

export default {
  title: 'Core/SegmentedButton',
  component: SegmentedButton
};

const NormalStory = () => {
  const [selected, setSelected] = useState<string | number>(0);

  return (
    <SegmentedButton
      onClick={setSelected}
      selected={selected}
      sections={[
        {
          id: 0,
          label: 'No'
        },
        {
          id: 1,
          label: 'Maybe'
        },
        {
          id: 2,
          label: 'Yes'
        }
      ]}
    />
  );
};

export const normal = () => <NormalStory/>
