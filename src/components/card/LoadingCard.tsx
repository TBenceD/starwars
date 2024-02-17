import React from "react";

export default function LoadingCard() {
  return (
    <div className="h-64 border p-4 border-neutral-950 shadow-lg shadow-sky-900 w-96 rounded-lg">
      <div className="animate-pulse flex flex-col">
        <div className="rounded-lg bg-slate-700 h-48 w-full" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-5 bg-slate-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}
