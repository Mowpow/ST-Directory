-- Semi Trailer Dealership Directory Database Schema
-- Similar structure to scratchanddentlocator.com

-- Dealers/Stores table
CREATE TABLE dealers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    website VARCHAR(255),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_state (state),
    INDEX idx_city (city),
    INDEX idx_name (name)
);

-- Trailer categories/types table
CREATE TABLE trailer_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dealer categories junction table (many-to-many)
CREATE TABLE dealer_categories (
    dealer_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (dealer_id, category_id),
    FOREIGN KEY (dealer_id) REFERENCES dealers(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES trailer_categories(id) ON DELETE CASCADE,
    INDEX idx_dealer (dealer_id),
    INDEX idx_category (category_id)
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dealer services junction table
CREATE TABLE dealer_services (
    dealer_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    PRIMARY KEY (dealer_id, service_id),
    FOREIGN KEY (dealer_id) REFERENCES dealers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    INDEX idx_dealer (dealer_id),
    INDEX idx_service (service_id)
);

-- State statistics view (for quick stats)
CREATE VIEW state_stats AS
SELECT 
    state,
    COUNT(*) as dealer_count,
    COUNT(DISTINCT city) as city_count
FROM dealers
GROUP BY state
ORDER BY dealer_count DESC;

-- Category statistics view
CREATE VIEW category_stats AS
SELECT 
    tc.id,
    tc.name,
    tc.slug,
    tc.icon,
    COUNT(DISTINCT dc.dealer_id) as dealer_count
FROM trailer_categories tc
LEFT JOIN dealer_categories dc ON tc.id = dc.category_id
GROUP BY tc.id, tc.name, tc.slug, tc.icon
ORDER BY dealer_count DESC;

-- Sample data insertion queries
INSERT INTO trailer_categories (name, slug, icon, description) VALUES
('Reefer Trailers', 'reefer', NULL, 'Refrigerated trailers for temperature-controlled transport'),
('Dry Van Trailers', 'dry-van', NULL, 'Standard enclosed trailers for general freight'),
('Flatbed Trailers', 'flatbed', NULL, 'Open flatbed trailers for oversized loads'),
('Side Dump Trailers', 'side-dump', NULL, 'Trailers with side dumping capability'),
('Bottom Dump Trailers', 'bottom-dump', NULL, 'Trailers with bottom discharge'),
('Drop Deck Trailers', 'drop-deck', NULL, 'Low-profile trailers for tall loads'),
('Live Floor Trailers', 'live-floor', NULL, 'Trailers with moving floor systems'),
('Pneumatic Trailers', 'pneumatic', NULL, 'Trailers for bulk powder and grain transport');

INSERT INTO services (name) VALUES
('New Trailers'),
('Used Trailers'),
('Parts'),
('Service'),
('Rental'),
('Financing');
