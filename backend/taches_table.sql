-- Table taches (exemple)
CREATE TABLE taches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre VARCHAR(150) NOT NULL,
  description TEXT,
  statut VARCHAR(50),
  assigned_to uuid REFERENCES collaborateurs(id),
  due_date DATE,
  created_at TIMESTAMP DEFAULT now()
);
