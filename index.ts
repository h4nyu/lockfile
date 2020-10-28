import fs from "fs";
import path from "path";

export const Lock = (option: {
  dir: string;
  filename?: string;
  pollInterval?: number;
}) => {
  const dir = path.resolve(option.dir);
  const filename = option.filename || "lock";
  const lockPath = path.resolve(path.join(dir, filename));
  const pollInterval = option.pollInterval || 1;
  const lock = async () => {
    try {
      await fs.promises.mkdir(lockPath);
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      await lock();
    }
  };
  const unlock = async () => {
    await fs.promises.rmdir(lockPath);
  };

  const auto = async <T>(fn: () => Promise<T>):Promise<T> => {
    try {
      await lock();
      return await fn();
    }catch(err){
      throw err
    } finally {
      await unlock();
    }
  };
  return {
    auto,
    lock,
    unlock,
  };
};

