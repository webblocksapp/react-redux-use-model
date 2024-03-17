import type { Meta, StoryObj } from '@storybook/react';
import { VideosDropdown } from '@examples/components';

const meta: Meta<typeof VideosDropdown> = {
  component: VideosDropdown,
};

export default meta;
type Story = StoryObj<typeof VideosDropdown>;

export const Primary: Story = {
  render: () => <VideosDropdown />,
};
