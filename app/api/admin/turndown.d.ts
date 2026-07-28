// Minimale Typen für "turndown" (Paket liefert keine eigenen Typings).
declare module "turndown" {
  interface TurndownOptions {
    headingStyle?: "setext" | "atx";
    codeBlockStyle?: "indented" | "fenced";
    [key: string]: unknown;
  }
  export default class TurndownService {
    constructor(options?: TurndownOptions);
    turndown(html: string): string;
    remove(filter: string | string[]): TurndownService;
  }
}
