// Centralized exchange data for VELOOP Rewards Exchange Center
// Preserving business logic and rates for Gems -> VEs conversions

export const exchangeOptions = [
  {
    id: "exchange-01",
    title: "Daily Gem Conversion",
    label: "Watch Ad",
    requiredGems: 28,
    receiveVEs: 151,
    description: "Convert your daily earned Gems into VEs and boost your balance.",
    badge: "Daily",
  },
  {
    id: "exchange-02",
    title: "Reward Boost Conversion",
    label: "Watch Ad",
    requiredGems: 39,
    receiveVEs: 230,
    description: "Turn your bonus Gems into VEs with enhanced exchange value.",
    badge: "Popular",
  },
  {
    id: "exchange-03",
    title: "Vault Power Conversion",
    label: "Featured",
    requiredGems: 75,
    receiveVEs: 480,
    description: "Unlock high-tier reward value by converting accumulated Gems.",
    badge: "High Value",
  },
  {
    id: "exchange-04",
    title: "Grand Reward Conversion",
    label: "Special Offer",
    requiredGems: 500,
    receiveVEs: 3400,
    description: "Maximize your earned reward points into VELOOP virtual currency.",
    badge: "Exclusive",
  },
];

export const initialBalance = {
  gems: 420,
  ves: 3850,
};

export const recentConversions = [
  {
    id: "hist-01",
    date: "Today, 2:15 PM",
    gems: 28,
    ves: 151,
    status: "Completed",
  },
  {
    id: "hist-02",
    date: "Yesterday",
    gems: 39,
    ves: 230,
    status: "Completed",
  },
  {
    id: "hist-03",
    date: "18 Aug",
    gems: 25,
    ves: 120,
    status: "Completed",
  },
  {
    id: "hist-04",
    date: "14 Aug",
    gems: 50,
    ves: 310,
    status: "Completed",
  },
];

export const exchangeRules = [
  "Only eligible Gems can be exchanged.",
  "Exchange rates are predefined by VELOOP Rewards.",
  "Available conversions may vary.",
  "A successful conversion cannot be duplicated.",
  "Your balance is updated after successful conversion.",
  "Platform rules apply.",
];

export const infoExplanations = {
  gems: {
    title: "What are Gems?",
    description: "Gems are reward credits earned through eligible activities, streak milestones, and watching ads on VELOOP Rewards.",
  },
  ves: {
    title: "What are VEs?",
    description: "VEs are VELOOP Rewards' virtual reward currency that may be used for eligible redemption options according to platform rules.",
  },
  rates: {
    title: "How Exchange Rates Work",
    description: "Conversion rates are fixed and predefined for each reward option. They are not subject to market fluctuations or trading fees.",
  },
};