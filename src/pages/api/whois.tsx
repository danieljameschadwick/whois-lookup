import type { NextApiRequest, NextApiResponse } from "next";

interface Whois {
  domain: string;
  isAvailable: boolean;
}

interface BadResponse {
  message: string;
  apiMessage: string;
}

interface Response {
  result: string;
}

interface BadApiResponse {
  message: string;
}

type ApiResponse = Response | BadApiResponse;

const whoisHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Whois | BadResponse>
) => {
  const { query } = req;
  const domain = query.domain as string;

  const headers = new Headers();
  headers.set('apikey', process.env.APILAYER_API_KEY as string);

  const response = await fetch(
    `https://api.apilayer.com/whois/check?domain=${domain}`,
    {
      headers,
    }
  );
  const data = (await response.json()) as ApiResponse;

  if (response.status !== 200) {
    const { message } = data as BadApiResponse;

    res.status(400).json({
      message: "Bad response from API.",
      apiMessage: message,
    });

    return;
  }

  const { result } = data as Response;

  res.status(200).json({ domain, isAvailable: result !== "registered" });
};

export default whoisHandler;
