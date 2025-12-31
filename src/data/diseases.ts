export type DiseaseId = 'covid-19' | 'rsv' | 'asthma' | 'flu' | 'pediatric-asthma';

export const DEFAULT_DISEASE_ID: DiseaseId = 'covid-19';

export const DISEASES: ReadonlyArray<{ id: DiseaseId; label: string; group?: 'Pediatric' }> = [
  { id: 'covid-19', label: 'COVID-19' },
  { id: 'rsv', label: 'RSV' },
  { id: 'asthma', label: 'Asthma' },
  { id: 'flu', label: 'Flu' },
  { id: 'pediatric-asthma', label: 'Pediatric Asthma', group: 'Pediatric' },
] as const;

export const getDiseaseLabel = (id: string | null | undefined): string => {
  const normalized = (id ?? DEFAULT_DISEASE_ID) as DiseaseId;
  return DISEASES.find((disease) => disease.id === normalized)?.label ?? 'COVID-19';
};
