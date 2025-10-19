export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 500
): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      console.warn(`Retry attempt ${attempt} failed.`);
      if (attempt >= retries) throw error;
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  throw new Error("Max retries exceeded");
}
