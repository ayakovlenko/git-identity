/**
 * 3 major identifiers of any repository are:
 *
 * - host
 * - owner
 * - deno
 *
 * For example:
 *
 * For https://github.com/denoland/deno:
 *
 * - host: https://github.com/denoland/deno.git
 * - owner: denoland
 * - name: deno
 */
export interface RepoInfo {
  host: string;
  owner: string;
  name: string;
}
