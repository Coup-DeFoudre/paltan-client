export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 lg:pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-6 w-96 max-w-full bg-gray-200 rounded mx-auto"></div>
          <div className="mt-6 h-8 w-48 bg-gray-200 rounded-full mx-auto"></div>
        </div>

        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-200 animate-pulse">
                <div className="h-7 w-48 rounded"></div>
              </div>
              <div className="divide-y divide-gray-200">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1 animate-pulse">
                        <div className="h-48 w-full rounded-lg bg-gray-200"></div>
                      </div>
                      <div className="md:col-span-3 space-y-4 animate-pulse">
                        <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <div className="h-4 w-32 bg-gray-200 rounded"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
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
  );
}
