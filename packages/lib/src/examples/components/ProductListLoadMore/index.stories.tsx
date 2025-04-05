import type { Meta, StoryObj } from '@storybook/react';
import { ProductListLoadMore } from '@examples/components';
import { useState } from 'react';

const meta: Meta<typeof ProductListLoadMore> = {
  component: ProductListLoadMore,
};

export default meta;
type Story = StoryObj<typeof ProductListLoadMore>;

export const Primary: Story = {
  render: () => {
    const [show, setShow] = useState(true);

    return (
      <>
        <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
        {show && <ProductListLoadMore />}
      </>
    );
  },
};
