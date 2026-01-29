# Semi Trailer Dealership Directory

A modern, SEO-friendly directory website for finding semi-trailer dealerships across the United States.

## Features

- 🔍 **Search Functionality** - Search by dealership name, city, or state
- 🗺️ **State Filtering** - Filter dealerships by US state
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast Performance** - Built with Next.js for optimal speed
- 🔗 **SEO Optimized** - Proper meta tags and structured data
- 📍 **Map Integration** - Links to Google Maps for directions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **JSON Data** - Simple data storage (easily migratable to database)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
st-directory/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── dealers/           # Dealership pages
│       └── [id]/          # Dynamic dealer detail pages
├── components/            # React components
│   ├── SearchBar.tsx      # Search component
│   ├── FilterPanel.tsx    # State filter
│   ├── DealerCard.tsx     # Dealership card
│   └── DealerList.tsx     # List component
├── data/                  # Data files
│   └── dealers.json       # Dealership data
└── lib/                   # Utilities
    └── utils.ts           # Helper functions
```

## Adding Dealerships

Edit `data/dealers.json` to add or modify dealership information. The structure is:

```json
{
  "dealers": [
    {
      "id": "unique-id",
      "name": "Dealership Name",
      "address": {
        "street": "123 Main St",
        "city": "City Name",
        "state": "CA",
        "zip": "12345"
      },
      "phone": "(555) 123-4567",
      "email": "contact@dealership.com",
      "website": "https://dealership.com",
      "coordinates": {
        "lat": 37.7749,
        "lng": -122.4194
      },
      "services": ["New Trailers", "Used Trailers", "Parts"]
    }
  ]
}
```

## Deployment

This project can be easily deployed to:

- **Vercel** (recommended) - `vercel deploy`
- **Netlify** - Connect your Git repository
- **Any Node.js hosting** - Build and deploy the output

## License

MIT
