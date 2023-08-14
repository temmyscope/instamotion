import {describe, expect, test } from '@jest/globals';
import data from './mock/data.json';
import { getVehichleMetaData, adaptVehicleFeatures, responseProcessor }  from '@/app/api/services/vehicle';
import { filterVehicles } from '@/app/lib/utils';
import { VehicleMetaDataType } from '@/app/lib/types';
import { initialState, vehicleReducer } from '@/app/store/reducers/vehicle';

const mockGetVehicles = () => data['records'];

describe('vehicle module', () => {

  const vehicles = mockGetVehicles();
  const adaptedVehicle = adaptVehicleFeatures(vehicles[0]);
  const res = responseProcessor(vehicles);

  test('response processor', () => {

    expect(res).toHaveProperty('meta');
    expect(res).toHaveProperty('vehicles');

    expect(res.vehicles).toHaveLength(10);
  });

  test('adapts api response to return only required fields', () => {

    expect(adaptedVehicle).toHaveProperty('id');
    expect(adaptedVehicle).toHaveProperty('co2');
    expect(adaptedVehicle).toHaveProperty('color');
    expect(adaptedVehicle).toHaveProperty('gearbox');
    expect(adaptedVehicle).toHaveProperty('make');
    expect(adaptedVehicle).toHaveProperty('fuel');
    expect(adaptedVehicle).toHaveProperty('model');
    expect(adaptedVehicle).toHaveProperty('power');
    expect(adaptedVehicle).toHaveProperty('price');
    expect(adaptedVehicle).toHaveProperty('category');
    expect(adaptedVehicle).toHaveProperty('images');
    expect(adaptedVehicle).toHaveProperty('mileage');
    expect(adaptedVehicle).toHaveProperty('consumption');
    expect(adaptedVehicle).toHaveProperty('first_registration');
  });

  test('vehicle metadata adapter', () => {
    let metaXtract: VehicleMetaDataType = {
      'make': {}, 'firstReg': new Set(), 'color': new Set(), 
      'fuel': new Set(), 'gearBox': new Set(), 'categories': new Set(),
    };;
    const meta = getVehichleMetaData(adaptedVehicle, metaXtract);

    expect(meta).toStrictEqual({
      make: {
        "Volkswagen": new Set(["T6.1"])
      }, 
      firstReg: new Set([2023]),
      color: new Set(["GREY"]), 
      fuel: new Set(["DIESEL"]), 
      gearBox: new Set(["AUTOMATIC_GEAR"]), 
      categories: new Set(["TRANSPORTER"]),
    });
  });

  test('filter vehicle based on given filters', () => {
    let filteredVehicles = filterVehicles( 
      res.vehicles, { 
        'make': "Volkswagen", 
        'model': "T6.1",
        'fuel': 'DIESEL',
        'gearbox': 'AUTOMATIC_GEAR', 
        'price': {min: 0, max: 100000}, 
        'power': {min: 0, max: 50000}, 
        'color': "grey", 'category': 'TRANSPORTER',
      } as any 
    );

    expect(filteredVehicles).toHaveLength(1);
    expect(filteredVehicles[0]).toHaveProperty('make', "Volkswagen");
    expect(filteredVehicles[0]).toHaveProperty('model.model', "T6.1");
    expect(filteredVehicles[0]).toHaveProperty('fuel', "DIESEL");
    expect(filteredVehicles[0]).toHaveProperty('gearbox', "AUTOMATIC_GEAR");
    expect(filteredVehicles[0]).toHaveProperty('color', "GREY");
    expect(filteredVehicles[0]).toHaveProperty('category', "TRANSPORTER");
  });

  test('vehicle filter reducer', () => {

    let stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'FILTER_BY_GEARBOX', payload: { gearBox: 'AUTOMATIC_GEAR' }});
    expect(stateData.filters).toHaveProperty('gearBox', "AUTOMATIC_GEAR");

    stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'FILTER_BY_MODEL', payload: { model: 'T6.1' }});
    expect(stateData.filters).toHaveProperty('model', "T6.1");

    stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'FILTER_BY_PRICE', payload: { min: 0, max: 10000 }});
    expect(stateData.filters).toHaveProperty('price.min', 0);
    expect(stateData.filters).toHaveProperty('price.max', 10000);

    stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'FILTER_BY_EXT_COLOR', payload: { color: 'BLUE' }});
    expect(stateData.filters).toHaveProperty('color', 'BLUE');

    stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'FILTER_BY_FIRST_REG', payload: { regYear: 2023 }});
    expect(stateData.filters).toHaveProperty('regYear', 2023);

    //test that undo actually works
    stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'UNDO_THIS_FILTER', payload: { filter: 'regYear' }});
    expect(stateData.filters).toHaveProperty('regYear', undefined);

    stateData = vehicleReducer({
      ...initialState, vehicles: res.vehicles, meta: res.meta
    }, {type: 'UNDO_THIS_FILTER', payload: { filter: 'gearBox' }});
    expect(stateData.filters).toHaveProperty('gearBox', undefined);
  });

});