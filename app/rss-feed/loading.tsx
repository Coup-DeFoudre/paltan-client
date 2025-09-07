export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-amber-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header Skeleton */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-12 w-80 bg-slate-700 rounded mx-auto mb-4"></div>
              <div className="h-6 w-96 max-w-full bg-slate-700 rounded mx-auto"></div>
              <div className="mt-6 h-8 w-48 bg-slate-700 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="px-6 py-4 bg-slate-700/50 animate-pulse">
                  <div className="h-7 w-48 rounded"></div>
                </div>
                <div className="divide-y divide-slate-700/50">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1 animate-pulse">
                          <div className="h-48 w-full rounded-lg bg-slate-700"></div>
                        </div>
                        <div className="md:col-span-3 space-y-4 animate-pulse">
                          <div className="h-7 w-3/4 bg-slate-700 rounded"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-700 rounded"></div>
                            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-700 rounded w-4/6"></div>
                          </div>
                          <div className="flex justify-between items-center pt-4">
                            <div className="h-4 w-32 bg-slate-700 rounded"></div>
                            <div className="h-4 w-24 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
