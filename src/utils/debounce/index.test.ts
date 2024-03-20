import { debounce, sleep } from '@utils';

describe('debounce', () => {
  it('value must be empty before 200ms and change after 200ms', async () => {
    let message = '';
    const changeMessage = (text: string) => {
      message = text;
    };

    let debouncedChangeValue = debounce(changeMessage, 200);
    debouncedChangeValue('Hello World');
    expect(message).toBe('');
    await sleep(200);
    expect(message).toBe('Hello World');
  });

  it('value must be 1 after multiple calls', async () => {
    let count = 1;
    const increment = () => {
      count++;
    };

    let debouncedIncrement = debounce(increment, 200);
    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();
    await sleep(800);
    expect(count).toBe(2);
  });
});
