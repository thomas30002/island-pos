import { IconClearAll, IconFilter, IconSearch } from "@tabler/icons-react";
import React from "react";

export default function POSPage() {
  return (
    <div className="px-8 py-6 w-full flex gap-6">
      {/* all items */}
      <div className="border rounded-2xl w-[70%] h-[95vh] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">All Items</h3>

          <div className="flex items-center gap-4">
            <button>
              <IconFilter />
            </button>
            <button>
              <IconSearch />
            </button>
          </div>
        </div>
      </div>
      {/* all items */}

      {/* cart */}
      <div className="border rounded-2xl w-[30%] h-[95vh] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Cart</h3>

          <button className="text-red-400">
            <IconClearAll />
          </button>
        </div>
      </div>
      {/* cart */}
    </div>
  );
}
