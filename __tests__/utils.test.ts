import {describe, expect, test} from '@jest/globals';
import { convertParamToFilters } from '../app/lib/utils';

describe('utility function', () => {

  test('converts uri parameteres response to required filters accurately', () => {
    let filters = convertParamToFilters(
      new URLSearchParams(
        "?category=offroad&make=volkswagen&model=T9&fuel=petrol&price=[0,100000]&reg_year=2020&"+
        "mileage=[0, 10]&fuel=petrol&gearbox=...&color=blue&power=[0, 1000]"
      )
    );

    expect(filters).toHaveProperty('category', 'offroad');
    expect(filters).toHaveProperty('make', 'volkswagen');
    expect(filters).toHaveProperty('model', 'T9');
    expect(filters).toHaveProperty('fuel', 'petrol');
    expect(filters).toHaveProperty('price', {"max": "100000", "min": "0"});
    expect(filters).toHaveProperty('reg_year', '2020');
    expect(filters).toHaveProperty('mileage', {"max": "10", "min": "0"});
    expect(filters).toHaveProperty('color', 'blue');
    expect(filters).toHaveProperty('power', {"max": "1000", "min": "0"});

    filters = convertParamToFilters(
      new URLSearchParams(
        "?category=offroad&fuel=petrol&price=0,100000&reg_year=2020&mileage=0,10&fuel=petrol&color=blue&power=[0, 1000]"
      )
    );

    expect(filters).toHaveProperty('category', 'offroad');
    expect(filters).toHaveProperty('fuel', 'petrol');
    expect(filters).toHaveProperty('price', {"max": "100000", "min": "0"});
    expect(filters).toHaveProperty('reg_year', '2020');
    expect(filters).toHaveProperty('mileage', {"max": "10", "min": "0"});
    expect(filters).toHaveProperty('color', 'blue');
    expect(filters).toHaveProperty('power', {"max": "1000", "min": "0"});

  });
});
