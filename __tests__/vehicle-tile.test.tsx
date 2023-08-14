import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import data from './mock/data.json';
import '@testing-library/jest-dom';
import { VehicleTile } from '@/app/components/commons/tile';
import { adaptVehicleFeatures } from '@/app/api/services/vehicle';
 
const mockGetVehicles = () => data['records'];


describe('Vehicle Component', () => {

  it('test vehicle tile component', async () => {

    const vehicles = mockGetVehicles();
    const adaptedVehicle = adaptVehicleFeatures(vehicles[0]);

    const goTo = (e: any, id: string) => {
      e.preventDefault()
    }

    render(<VehicleTile vehicle={adaptedVehicle} goTo={(e) => goTo(e, vehicles[0].id)} />)
  
    await userEvent.hover(screen.getByText('Volkswagen'));
    await screen.getByText('Brand');
  
    expect(screen.getByText('Volkswagen')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeVisible();
  });
})