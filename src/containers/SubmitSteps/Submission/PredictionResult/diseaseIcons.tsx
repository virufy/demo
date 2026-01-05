import React from 'react';

import { ReactComponent as CovidIcon } from 'assets/icons/disease-covid.svg';
import { ReactComponent as AsthmaIcon } from 'assets/icons/disease-asthma.svg';
import { ReactComponent as RsvIcon } from 'assets/icons/disease-rsv.svg';
import { ReactComponent as FluIcon } from 'assets/icons/disease-flu.svg';
import { ReactComponent as PediatricAsthmaIcon } from 'assets/icons/disease-pediatric-asthma.svg';

export const getDiseaseIcon = (
  diseaseId: string,
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
  // Map disease IDs to icons (handle both adult and pediatric versions)
  if (diseaseId === 'adult-covid-19' || diseaseId === 'pediatric-covid-19') {
    return CovidIcon;
  }
  if (diseaseId === 'adult-flu' || diseaseId === 'pediatric-flu') {
    return FluIcon;
  }
  if (diseaseId === 'pediatric-rsv') {
    return RsvIcon;
  }
  if (diseaseId === 'pediatric-asthma') {
    return PediatricAsthmaIcon;
  }
  // Legacy support for old IDs
  switch (diseaseId) {
    case 'covid-19':
      return CovidIcon;
    case 'asthma':
      return AsthmaIcon;
    case 'rsv':
      return RsvIcon;
    case 'flu':
      return FluIcon;
    default:
      return null;
  }
};
