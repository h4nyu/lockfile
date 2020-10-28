import { Lock } from ".";


describe("lock", () => {
  const lock = Lock({ dir: "/tmp" });
  test("lock", async () => {
    let resorceA = 0;
    let resorceB = 0;
    const proc = async () => {
      await lock.auto(async () => {
        resorceA += 1;
        await new Promise((r) => setTimeout(r, 50));
        resorceB += resorceA;
      });
    };
    await Promise.all([...Array(10)].map(proc));
    expect(resorceA).toBe(10);
    expect(resorceB).toBe(55);
  });
});
