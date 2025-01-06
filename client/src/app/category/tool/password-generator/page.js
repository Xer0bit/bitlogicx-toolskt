"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineShieldCheck } from "react-icons/hi";

export default function Page() {
  const [length, setLength] = useState("");
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [includeDigits, setIncludeDigits] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGeneratePassword = async (event) => {
    event.preventDefault();
    if (!length) return;

    setLoading(true);
    setGeneratedPasswords([]);

    try {
      const requests = Array(5)
        .fill(null)
        .map(() =>
          axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/tools/password-generator/`,
            {
              length: parseInt(length),
              include_upper: includeUpper,
              include_lower: includeLower,
              include_special: includeSpecial,
              include_digits: includeDigits,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        );

      const responses = await Promise.all(requests);
      const passwords = responses.map((response) => response.data.password);
      setGeneratedPasswords(passwords);
    } catch (error) {
      console.error("Error generating passwords:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineShieldCheck />
          <h2 className="text-gray-900">Password Generator</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Generate a secure password based on your preferences.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form onSubmit={handleGeneratePassword}>
          <div className="mb-4">
            <label htmlFor="length" className="block mb-1 text-sm font-medium">
              Password Length
            </label>
            <input
              type="number"
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter password length"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Include Characters
            </label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeUpper"
                  checked={includeUpper}
                  onChange={(e) => setIncludeUpper(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="includeUpper" className="text-sm">
                  Uppercase Letters
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeLower"
                  checked={includeLower}
                  onChange={(e) => setIncludeLower(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="includeLower" className="text-sm">
                  Lowercase Letters
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeSpecial"
                  checked={includeSpecial}
                  onChange={(e) => setIncludeSpecial(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="includeSpecial" className="text-sm">
                  Special Characters
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeDigits"
                  checked={includeDigits}
                  onChange={(e) => setIncludeDigits(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="includeDigits" className="text-sm">
                  Digits
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Password"}
          </button>
        </form>
        {generatedPasswords.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">
              Generated Passwords:
            </h3>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Password
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {generatedPasswords.map((password, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{password}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {generatedPasswords.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Your generated passwords will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
