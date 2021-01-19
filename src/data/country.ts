export interface CountryDataProps {
  name: string;
  val: string;
  telephonePrefix: string;
}

export const countryData: CountryDataProps[] = [
  { name: 'Argentina', val: 'Argentina', telephonePrefix: '+54' },
  { name: 'Bolivia', val: 'Bolivia', telephonePrefix: '+591' },
  { name: 'Brazil', val: 'Brazil', telephonePrefix: '+55' },
  { name: 'Colombia', val: 'Colombia', telephonePrefix: '+57' },
  { name: 'Mexico', val: 'Mexico', telephonePrefix: '+52' },
  { name: 'Pakistan', val: 'Pakistan', telephonePrefix: '+92' },
  { name: 'Peru', val: 'Peru', telephonePrefix: '+51' },
];
