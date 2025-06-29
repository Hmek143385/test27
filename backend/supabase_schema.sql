-- Table admins
CREATE TABLE admins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    token_openai VARCHAR(200),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT now()
);

-- Table collaborateurs
CREATE TABLE collaborateurs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT now()
);

-- Table contacts
CREATE TABLE contacts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_code VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    birth_date DATE,
    email VARCHAR(150),
    phone VARCHAR(50),
    postal_code VARCHAR(20),
    city VARCHAR(100),
    family_situation VARCHAR(50),
    profession VARCHAR(100),
    source VARCHAR(100),
    status VARCHAR(50),
    assigned_to uuid REFERENCES collaborateurs(id),
    created_at TIMESTAMP DEFAULT now()
);

-- Table produits
CREATE TABLE produits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50),
    name VARCHAR(100),
    category VARCHAR(100),
    base_price NUMERIC,
    commission_rate NUMERIC,
    cross_sell_priority INTEGER,
    recommended_products uuid[],
    created_at TIMESTAMP DEFAULT now()
);

-- Table contrats
CREATE TABLE contrats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id uuid REFERENCES contacts(id),
    product_id uuid REFERENCES produits(id),
    full_name VARCHAR(200),
    city VARCHAR(100),
    signature_date DATE,
    start_date DATE,
    end_date DATE,
    monthly_premium NUMERIC,
    annual_premium NUMERIC,
    monthly_commission NUMERIC,
    annual_commission NUMERIC,
    first_year_commission NUMERIC,
    recurring_commission NUMERIC,
    received_commission NUMERIC,
    status VARCHAR(50),
    assigned_to uuid REFERENCES collaborateurs(id),
    country VARCHAR(100),
    charge NUMERIC,
    expenses NUMERIC,
    created_at TIMESTAMP DEFAULT now()
);

-- Table interactions
CREATE TABLE interactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id uuid REFERENCES contacts(id),
    type VARCHAR(50),
    outcome VARCHAR(100),
    scheduled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    notes TEXT,
    next_step VARCHAR(100),
    collaborator_id uuid REFERENCES collaborateurs(id),
    created_at TIMESTAMP DEFAULT now()
);

-- Table sales_targets
CREATE TABLE sales_targets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    collaborator_id uuid REFERENCES collaborateurs(id),
    target_type VARCHAR(50),
    target_value NUMERIC,
    min_value NUMERIC,
    start_date DATE,
    end_date DATE,
    weight INTEGER,
    created_at TIMESTAMP DEFAULT now()
);

-- Table workflows
CREATE TABLE workflows (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    trigger_type VARCHAR(50),
    trigger_config JSONB,
    actions JSONB,
    is_active BOOLEAN,
    created_by uuid REFERENCES collaborateurs(id),
    created_at TIMESTAMP DEFAULT now()
);
