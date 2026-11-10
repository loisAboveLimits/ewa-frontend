"use client";

import { useState } from "react";
import FilterPrograms from "@/components/filter/Filter";
import ProgramsSlider, { ProgramSearch } from "@/components/filter/ProgramsSlider";

/**
 * Programs page layout.
 *   phones / tablets:  search → filter (collapsible) → programs slider
 *   lg and up:         filter on the side (left in English, right in Arabic) | search + slider
 */
export default function ProgramsBrowser() {
  const [query, setQuery] = useState("");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[30%_70%] lg:gap-0">

      <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:px-8 lg:pt-8">
        <ProgramSearch value={query} onChange={setQuery} />
      </div>

      <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-start lg:p-8">
        <FilterPrograms />
      </div>

      <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:px-8 lg:pb-8 lg:pt-7">
        <ProgramsSlider query={query} />
      </div>

    </div>
  );
}
