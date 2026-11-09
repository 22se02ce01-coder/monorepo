/**
 * Google AdSense Configuration
 *
 * To activate Google AdSense on your production site:
 * 1. Set `enabled: true`
 * 2. Replace `publisherId` with your approved Google AdSense publisher ID (e.g., 'ca-pub-1234567890123456')
 * 3. Replace the respective slot IDs with your created AdSense unit IDs.
 *
 * When `enabled: false` (or when slot IDs are empty), the AdSlot component collapses gracefully
 * without taking up unnecessary whitespace or showing deceptive fake banners, in compliance
 * with Google AdSense Policies.
 */

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string;
  slots: {
    sidebarRight: string; // Desktop right sidebar (e.g. 300x250 or 300x600 responsive)
    belowConverter: string; // Horizontal banner below main converter area (728x90 responsive)
    betweenContent: string; // In-feed or horizontal unit between How It Works and FAQ
  };
}

export const ADSENSE_CONFIG: AdSenseConfig = {
  // Set to true once your AdSense account is approved and you have configured your IDs
  enabled: false,
  publisherId: '', // Example: 'ca-pub-XXXXXXXXXXXXXXXX'
  slots: {
    sidebarRight: '', // Ad unit ID for desktop sidebar
    belowConverter: '', // Ad unit ID for below converter workspace
    betweenContent: '', // Ad unit ID for between content sections
  },
};

