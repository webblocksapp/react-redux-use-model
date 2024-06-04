import { sleep } from '@utils';

describe('sleep', () => {
  it('should delay the execution 200ms', async () => {
    const t0 = performance.now();
    await sleep(200);
    const t1 = performance.now();
    const time = t1 - t0;
    const isInRange = time >= 200 && time <= 220;
    expect(isInRange).toBe(true);
  });
});
