"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineCalendar } from "react-icons/hi";

export default function Page() {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handleSearchDomain = async (event) => {
    event.preventDefault();
    if (!domain) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/domain-hosting-checker/`,
        { domain_name: domain },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setDomainInfo(response.data);
    } catch (error) {
      console.error("Error checking domain hosting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineCalendar />
          <h2 className="text-gray-900">Domain Hosting Checker</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Check hosting information for a domain name.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form onSubmit={handleSearchDomain}>
          <div className="mb-4">
            <label htmlFor="domain" className="block mb-1 text-sm font-medium">
              Enter Domain Name
            </label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={handleDomainChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="example.com"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Domain Hosting"}
          </button>
        </form>
        {domainInfo && (
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              Domain: {domainInfo.domain_name}
            </p>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attribute
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">IP Address</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {domainInfo.ip_address}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Hosting Provider
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {domainInfo.hosting_provider}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Nameservers</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {domainInfo.nameservers.join(", ")}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {domainInfo.status === "error" && (
              <p className="mt-2 text-red-600">Error: {domainInfo.message}</p>
            )}
          </div>
        )}
        {!domainInfo && (
          <p className="mt-4 text-sm text-muted-foreground">
            Results will be shown here once you check a domain.
          </p>
        )}
      </div>
    </div>
  );
}
