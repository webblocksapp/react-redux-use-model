import type { Meta, StoryObj } from '@storybook/react';
import { ProductList } from '@examples/components';

const meta: Meta<typeof ProductList> = {
  component: ProductList,
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const Primary: Story = {
  render: () => <ProductList />,
};
