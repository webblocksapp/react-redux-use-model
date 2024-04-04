import type { Meta, StoryObj } from '@storybook/react';
import { ProductList } from '@examples/components';
import { useState } from 'react';

const meta: Meta<typeof ProductList> = {
  component: ProductList,
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const Primary: Story = {
  render: () => {
    const [show, setShow] = useState(true);

    return (
      <>
        <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
        {show && <ProductList />}
      </>
    );
  },
};
