import type { Meta, StoryObj } from '@storybook/react';
import { ProductPaginatedList } from '@examples/components';

const meta: Meta<typeof ProductPaginatedList> = {
  component: ProductPaginatedList,
};

export default meta;
type Story = StoryObj<typeof ProductPaginatedList>;

export const Primary: Story = {
  render: () => <ProductPaginatedList />,
};
