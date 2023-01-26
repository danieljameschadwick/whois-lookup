import type { NextApiRequest, NextApiResponse } from "next";

interface Whois {
  domain: string;
  isAvailable: boolean;
}

interface BadResponse {
  message: string;
  apiMessage: string;
}

const whoisHandler = async (
  req: NextApiRequest,
  // what is the best approach to type this response?
  res: NextApiResponse<Whois | BadResponse>
) => {
  console.log('whoisHandler');
  const { query, method } = req;
  const domain = query.domain as string;

  switch (method) {
    case "GET":
      const response = await fetch(
        `https://api.apilayer.com/whois/check?domain=${domain}`,
        {
          headers: {
            apikey: process.env.APILAYER_API_KEY,
          },
        }
      );
      const data = await response.json();

      console.log(data);

      if (response.status !== 200) {
        res.status(400).json({
          message: "Bad response from API.",
          apiMessage: data?.message,
        });
        return;
      }

      const { result } = data;

      res.status(200).json({ domain, isAvailable: result !== "registered" });

      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default whoisHandler;
