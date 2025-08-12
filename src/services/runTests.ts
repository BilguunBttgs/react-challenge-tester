import axios from "axios";

export interface TestRunResult {
  failed: number;
  passed: number;
}

export async function runTests(params: {
  code: string;
  test: string | undefined;
}): Promise<TestRunResult | null> {
  try {
    const { data } = await axios.post(
      "https://aegis-insurance-mongolia.app.n8n.cloud/webhook-test/9035824f-7f7e-4a3a-a566-333ca29b9e63",
      {
        code: params.code,
        test: params.test,
      }
    );
    return data["object Object"].output ?? null;
  } catch {
    return null;
  }
}
