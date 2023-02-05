export const DRIVERS_URL = "/api/drivers/";
export const DRIVERS_LIST_URL = "/api/drivers/?list=True";
export const USERS_URL = "/api/users/";
export const USERS_LIST_URL = "/api/users/?list=True";
export const DISPATCHERS_LIST_URL = "/api/users/?list=True&filter=DIS";
export const CARRIERS_URL = "/api/carriers/";
export const CARRIERS_LIST_URL = "/api/carriers/?list=True";
export const GROSS_URL = "/api/gross/";

export const ROLES = {
  Owner: "OWN",
  Admin: "ADM",
  Dispatcher: "DIS",
  Updater: "UPD",
};

export const USER_ROLES = {
  // OWN: "Owner",
  ADM: "Admin",
  DIS: "Dispatcher",
  UPD: "Updater",
};

export const DRIVER_TYPE = {
  O88: "Owner operator - 88%",
  O85: "Owner operator - 85%",
  C30: "Company driver - 30%",
  C35: "Company driver - 35%",
  L: "Lease operator",
  R: "Rental operator",
};

export const BUDGET_TYPE = {
  D: "Driver's budget",
  L: "Lane budget",
  R: "Recovery budget",
};

export const GROSS_STATUS = {
  CO: "Covered",
  SO: "Sold",
  TO: "Tonu",
  RJ: "Rejected",
  RM: "Removed",
};

export const STATES = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AS: "American Samoa",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VI: "Virgin Islands",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming",
};
