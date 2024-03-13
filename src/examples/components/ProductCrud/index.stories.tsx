import type { Meta, StoryObj } from '@storybook/react';
import { ProductCrud } from '@examples/components';

const meta: Meta<typeof ProductCrud> = {
  component: ProductCrud,
};

export default meta;
type Story = StoryObj<typeof ProductCrud>;

export const Primary: Story = {
  render: () => <ProductCrud />,
};
