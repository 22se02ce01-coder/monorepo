export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string;
  slots: {
    sidebarRight: string;
    belowConverter: string;
    betweenContent: string;
  };
}

export const ADSENSE_CONFIG: AdSenseConfig = {
  enabled: false,
  publisherId: '',
  slots: {
    sidebarRight: '',
    belowConverter: '',
    betweenContent: '',
  },
};

