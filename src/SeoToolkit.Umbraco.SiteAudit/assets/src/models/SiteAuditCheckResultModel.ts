export default interface SiteAuditCheckResult {
  id: number;
  count: number;

  isError: boolean;
  isWarning: boolean;
}
