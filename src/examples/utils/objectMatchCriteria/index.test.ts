import { objectMatchCriteria } from '@examples/utils';

describe('objectMatchCriteria', () => {
  it('CASE-1', () => {
    const object = { name: 'Laura', age: 22, notes: ['Note 1', 'Note 2'] };
    expect(objectMatchCriteria(object, 'Laura')).toBe(true);
    expect(objectMatchCriteria(object, '22')).toBe(true);
    expect(objectMatchCriteria(object, 'Not')).toBe(true);
    expect(objectMatchCriteria(object, 'Note 2')).toBe(true);
  });

  it('CASE-2', () => {
    const object = {
      dateTimes: {
        started: '11/09/23 2:57:04 PM',
        connected: '11/07/23 2:57:04 PM',
        finished: '11/07/23 4:15:04 PM',
      },
    };
    expect(objectMatchCriteria(object, '2:57:04 PM')).toBe(true);
  });

  it('CASE-3', () => {
    const items = [
      {
        dateTimes: {
          started: '11/09/23 2:57:04 PM',
        },
      },
      {
        dateTimes: {
          started: '11/09/23 2:58:04 PM',
        },
      },
    ];

    const foundItem = items.find((item) =>
      objectMatchCriteria(item, '2:58:04 PM')
    );

    expect(foundItem).toMatchObject({
      dateTimes: {
        started: '11/09/23 2:58:04 PM',
      },
    });
  });
});
