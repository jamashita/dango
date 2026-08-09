import { ReactElement } from 'react';
import { Country } from '../../lib/Types.js';
import { CatImageFetcher } from './CatImageFetcher';
import { Counter } from './Counter';
import { CountryList } from './CountryList';
import { FormShowcase } from './FormShowcase';
import { LabourHoursCalculator } from './LabourHoursCalculator';
import { SimpleCounter } from './SimpleCounter';

type Props = Readonly<{
  countries: Array<Country>;
}>;

export const HomeView = ({ countries }: Props): ReactElement => {
  return (
    <>
      <SimpleCounter />
      <Counter />
      <LabourHoursCalculator />
      <CountryList countries={countries} />
      <FormShowcase />
      <CatImageFetcher />
    </>
  );
};
