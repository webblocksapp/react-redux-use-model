import type { Meta, StoryObj } from '@storybook/react';
import { ProductCrud, ProductPaginatedList } from '@examples/components';

const meta: Meta<typeof ProductCrud> = {
  component: ProductCrud,
};

export default meta;
type Story = StoryObj<typeof ProductCrud>;

export const Overview: Story = {
  render: () => <ProductCrud />,
};

export const MultipleComponents: Story = {
  render: () => (
    <div>
      <ProductCrud />
      <ProductPaginatedList />
    </div>
  ),
};
