import React from 'react';

import { ReactComponent as CovidIcon } from 'assets/icons/disease-covid.svg';
import { ReactComponent as AsthmaIcon } from 'assets/icons/disease-asthma.svg';
import { ReactComponent as RsvIcon } from 'assets/icons/disease-rsv.svg';
import { ReactComponent as FluIcon } from 'assets/icons/disease-flu.svg';
import { ReactComponent as PediatricAsthmaIcon } from 'assets/icons/disease-pediatric-asthma.svg';

export const getDiseaseIcon = (
  diseaseId: string,
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
  switch (diseaseId) {
    case 'covid-19':
      return CovidIcon;
    case 'asthma':
      return AsthmaIcon;
    case 'rsv':
      return RsvIcon;
    case 'flu':
      return FluIcon;
    case 'pediatric-asthma':
      return PediatricAsthmaIcon;
    default:
      return null;
  }
};
