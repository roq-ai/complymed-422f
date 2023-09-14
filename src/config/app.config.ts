interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Organisation Admin'],
  customerRoles: [],
  tenantRoles: ['Organisation Admin', 'Business'],
  tenantName: 'Client',
  applicationName: 'ComplyMed',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage tasks and files for organisation',
    "Monitor businesses' progress",
    'View and download audit reports',
    "View businesses' task completion percentage",
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/e8db74e0-b815-4721-bb81-febe6cee041e',
};
