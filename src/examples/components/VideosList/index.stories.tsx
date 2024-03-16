import type { Meta, StoryObj } from '@storybook/react';
import { VideosList } from '@examples/components';

const meta: Meta<typeof VideosList> = {
  component: VideosList,
};

export default meta;
type Story = StoryObj<typeof VideosList>;

export const Primary: Story = {
  render: () => <VideosList />,
};
