import React, { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

interface ApiResponse {
  isAvailable: boolean;
}

const Home: NextPage = () => {
  const [domain, setDomain] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastQueriedDomain, setLastQueriedDomain] = useState<string | null>(
    null
  );
  const [isAvailable, setIsAvailable] = useState<boolean | null>(false);

  const fetchWhois = async () => {
    if (!domain) {
      console.error("Invalid domain passed.");
      setLoading(false);

      return;
    }

    // validate w/ backend
    const response = await fetch(
      `/api/whois?domain=${domain}`
    );
    // const data: { isAvailable: boolean } = await response.json();
    const data = (await response.json()) as ApiResponse;
    const { isAvailable } = data;

    // api will return TRUE / FALSE
    setLastQueriedDomain(domain);
    setIsAvailable(isAvailable);
    setLoading(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setIsAvailable(null);
    setLastQueriedDomain(null);

    void fetchWhois();
  };

  return (
    <>
      <Head>
        <title>whois</title>
        <meta name="description" content="Check domain name availability" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            whois <span className="text-[hsl(280,100%,70%)]">lookup</span>
          </h1>

          <form
            className="mb-4 flex flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md"
            onSubmit={handleSubmit}
          >
            <label className="mb-2 text-sm">Domain:</label>
            <input
              type="text"
              className="focus:shadow-outline mb-4 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              onChange={(event) => setDomain(event.currentTarget.value)}
            />

            <button
              type="submit"
              className="focus:shadow-outline rounded bg-[hsl(280,100%,70%)] py-2 px-4 font-bold text-white hover:bg-[hsl(280,100%,50%)] focus:outline-none"
            >
              Search
            </button>
          </form>

          {loading && <span className="text-3xl text-white">Loading...</span>}
          {lastQueriedDomain && (
            <span className="text-3xl text-white">
              {lastQueriedDomain} is{" "}
              {!isAvailable && (
                <span className="font-extrabold text-red-600">NOT</span>
              )}{" "}
              available.
            </span>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
