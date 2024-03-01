import type { Meta, StoryObj } from '@storybook/react';

import { ProductsList } from '@components';

const meta: Meta<typeof ProductsList> = {
  component: ProductsList,
};

export default meta;
type Story = StoryObj<typeof ProductsList>;

export const Primary: Story = {
  render: () => <ProductsList />,
};
