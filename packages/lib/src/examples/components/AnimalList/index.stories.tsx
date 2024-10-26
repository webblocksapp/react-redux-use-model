import type { Meta, StoryObj } from '@storybook/react';
import { AnimalList } from '@examples/components';
import { useState } from 'react';

const meta: Meta<typeof AnimalList> = {
  component: AnimalList,
};

export default meta;
type Story = StoryObj<typeof AnimalList>;

export const Primary: Story = {
  render: () => {
    const [show, setShow] = useState(true);

    return (
      <>
        <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
        {show && <AnimalList />}
      </>
    );
  },
};
