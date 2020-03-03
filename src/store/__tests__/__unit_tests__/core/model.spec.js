import { normalize } from '../../../core/model/entry';

describe('Core Model', () => {
  it('Should normalize entry', () => {
    const json = {
      id: '1',
      title: 'Mercado Livre',
      description: 'Celulares Xiaomi Redmi 7 x2',
      value: -1280,
    };

    expect(normalize(json)).toEqual({
      result: '1',
      entities: {
        entry: {
          '1': {
            id: '1',
            title: 'Mercado Livre',
            description: 'Celulares Xiaomi Redmi 7 x2',
            value: -1280,
          },
        },
      },
    });
  });
});
