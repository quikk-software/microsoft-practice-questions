import "server-only";
import type { DataRepository } from "./port";
import { FsRepository } from "./fs";

// Treiber-Factory. DATA_DRIVER=fs (Default) | supabase
// Supabase-Implementierung: lib/data/supabase.ts

let repo: DataRepository | null = null;

export function getRepository(): DataRepository {
  if (repo) return repo;
  const driver = process.env.DATA_DRIVER ?? "fs";
  switch (driver) {
    case "supabase": {
      // Lazy require, damit der Fs-Modus ohne Supabase-Envs auskommt
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { SupabaseRepository } = require("./supabase") as {
        SupabaseRepository: new () => DataRepository;
      };
      repo = new SupabaseRepository();
      break;
    }
    case "fs":
    default:
      repo = new FsRepository();
  }
  return repo;
}
