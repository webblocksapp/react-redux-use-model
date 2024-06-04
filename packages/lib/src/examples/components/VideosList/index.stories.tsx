import type { Meta, StoryObj } from '@storybook/react';
import { VideosDropdown, VideosList } from '@examples/components';

const meta: Meta<typeof VideosList> = {
  component: VideosList,
};

export default meta;
type Story = StoryObj<typeof VideosList>;

export const Primary: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <div style={{ padding: 10 }}>
        <VideosList />
      </div>
      <div style={{ padding: 10 }}>
        <VideosDropdown />
      </div>
    </div>
  ),
};
