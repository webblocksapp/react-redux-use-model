import type { Meta, StoryObj } from '@storybook/react';
import { ProductPaginatedEntitiesList } from '@examples/components';

const meta: Meta<typeof ProductPaginatedEntitiesList> = {
  component: ProductPaginatedEntitiesList,
};

export default meta;
type Story = StoryObj<typeof ProductPaginatedEntitiesList>;

export const Primary: Story = {
  render: () => <ProductPaginatedEntitiesList />,
};
