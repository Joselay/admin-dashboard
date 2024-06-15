"use client";

import { RotateCwIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

type Props = {
  query: string | undefined;
};

export default function Search({ query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(value: string) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }
  return (
    <div className="relative max-w-md mt-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 mr-3 text-gray-400" />
        </div>
        <input
          type="text"
          name="search"
          autoComplete="off"
          id="search"
          className="block w-full h-10 border border-gray-200 rounded-md pl-9 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 focus:ring-opacity-50 sm:text-sm"
          placeholder="Search by name..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={query}
        />
      </div>
      {isPending && (
        <div>
          <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center">
            <RotateCwIcon className="w-5 h-5 mr-3 -ml-1 text-gray-700 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
