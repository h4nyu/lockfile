import { Lock } from ".";

describe("lock", () => {
  const lock = Lock({ dir: "/tmp" });
  test("lock", async () => {
    let resourceA = 0;
    let resourceB = 0;
    const proc = async () => {
      await lock.auto(async () => {
        resourceA += 1;
        await new Promise((r) => setTimeout(r, 50));
        resourceB += resourceA;
      });
    };
    await Promise.all([...Array(10)].map(proc));
    expect(resourceA).toBe(10);
    expect(resourceB).toBe(55);
  });
});
