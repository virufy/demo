export type DiseaseId = 'adult-covid-19' | 'adult-flu' | 'pediatric-covid-19' | 'pediatric-flu' | 'pediatric-rsv' | 'pediatric-asthma';

export const DEFAULT_DISEASE_ID: DiseaseId = 'adult-covid-19';

export type DiseaseGroup = 'Adult' | 'Pediatric';

export const DISEASES: ReadonlyArray<{ id: DiseaseId; label: string; group: DiseaseGroup }> = [
  { id: 'adult-covid-19', label: 'COVID-19', group: 'Adult' },
  { id: 'adult-flu', label: 'Flu', group: 'Adult' },
  { id: 'pediatric-covid-19', label: 'COVID-19', group: 'Pediatric' },
  { id: 'pediatric-flu', label: 'Flu', group: 'Pediatric' },
  { id: 'pediatric-rsv', label: 'RSV', group: 'Pediatric' },
  { id: 'pediatric-asthma', label: 'Asthma', group: 'Pediatric' },
] as const;

export const getDiseaseLabel = (id: string | null | undefined): string => {
  const normalized = (id ?? DEFAULT_DISEASE_ID) as DiseaseId;
  return DISEASES.find((disease) => disease.id === normalized)?.label ?? 'COVID-19';
};

export const getDiseaseGroup = (id: string | null | undefined): DiseaseGroup | undefined => {
  const normalized = (id ?? DEFAULT_DISEASE_ID) as DiseaseId;
  return DISEASES.find((disease) => disease.id === normalized)?.group;
};
