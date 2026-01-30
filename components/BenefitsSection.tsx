export default function BenefitsSection() {
  const benefits = [
    {
      title: "Find Trusted Dealerships",
      description: "Connect with reputable semi-trailer dealerships that have been verified and trusted by the industry. Our directory helps you find quality dealers with proven track records.",
    },
    {
      title: "Warranty Protection",
      description: "Most dealerships provide manufacturer warranties and service guarantees, ensuring quality and reliability for your investment.",
    },
    {
      title: "Comprehensive Services",
      description: "Independent dealers and warehouse stores typically offer delivery, installation, parts, and customer service support to meet all your trailer needs.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Benefits of Using Our Directory
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover why thousands of individuals choose our directory to find trusted trailer dealerships for quality trailers and reliable service
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
