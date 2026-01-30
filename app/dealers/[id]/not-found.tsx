import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">Dealership not found</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 sm:py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium touch-manipulation min-h-[44px] flex items-center justify-center mx-auto"
        >
          Back to Directory
        </Link>
      </div>
    </div>
  );
}
