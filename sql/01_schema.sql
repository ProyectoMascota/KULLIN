-- =====================================================================
-- Kulliñ · 01_schema.sql
-- Ejecutar PRIMERO en Supabase SQL Editor, antes del seed.
-- =====================================================================

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- TIPOS ENUM
-- =====================================================================
CREATE TYPE especie_enum AS ENUM ('perro', 'gato');
CREATE TYPE tamano_enum AS ENUM ('pequeno', 'mediano', 'grande');
CREATE TYPE actividad_enum AS ENUM ('bajo', 'moderado', 'alto');
CREATE TYPE condicion_enum AS ENUM ('ninguna', 'sobrepeso', 'sensible_digestivo', 'pelo_largo', 'articulaciones');
CREATE TYPE recordatorio_estado AS ENUM ('pendiente', 'enviado', 'descartado', 'convertido');

-- =====================================================================
-- TABLA: profiles (extiende auth.users de Supabase)
-- =====================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT,
  telefono TEXT,
  ciudad TEXT,
  pais TEXT DEFAULT 'CL',
  notif_email BOOLEAN DEFAULT TRUE,
  notif_dias_antes INT DEFAULT 5 CHECK (notif_dias_antes BETWEEN 1 AND 30),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-crear profile al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================================
-- TABLA: razas (catálogo)
-- =====================================================================
CREATE TABLE razas (
  id SERIAL PRIMARY KEY,
  especie especie_enum NOT NULL,
  nombre TEXT NOT NULL,
  tamano_tipico tamano_enum,
  peso_min_kg NUMERIC(5,2),
  peso_max_kg NUMERIC(5,2),
  UNIQUE(especie, nombre)
);

-- Seed mínimo de razas más comunes en Chile
INSERT INTO razas (especie, nombre, tamano_tipico, peso_min_kg, peso_max_kg) VALUES
('perro', 'Mestizo pequeño', 'pequeno', 4, 10),
('perro', 'Mestizo mediano', 'mediano', 10, 22),
('perro', 'Mestizo grande', 'grande', 22, 45),
('perro', 'Golden Retriever', 'grande', 25, 34),
('perro', 'Labrador', 'grande', 25, 36),
('perro', 'Pastor Alemán', 'grande', 22, 40),
('perro', 'Bulldog Francés', 'pequeno', 8, 14),
('perro', 'Beagle', 'mediano', 10, 18),
('perro', 'Border Collie', 'mediano', 14, 20),
('perro', 'Chihuahua', 'pequeno', 1.5, 3),
('perro', 'Cocker Spaniel', 'mediano', 12, 16),
('perro', 'Dálmata', 'grande', 24, 32),
('perro', 'Husky Siberiano', 'grande', 16, 27),
('perro', 'Pug', 'pequeno', 6, 9),
('perro', 'Poodle', 'pequeno', 3, 8),
('perro', 'Rottweiler', 'grande', 35, 60),
('perro', 'Schnauzer', 'mediano', 6, 18),
('perro', 'Shih Tzu', 'pequeno', 4, 7),
('perro', 'Yorkshire Terrier', 'pequeno', 2, 3),
('gato', 'Mestizo', 'pequeno', 3, 6),
('gato', 'Siamés', 'pequeno', 3, 5),
('gato', 'Persa', 'pequeno', 3, 5.5),
('gato', 'Maine Coon', 'mediano', 5, 11),
('gato', 'Bengal', 'pequeno', 4, 7),
('gato', 'British Shorthair', 'pequeno', 4, 8),
('gato', 'Ragdoll', 'mediano', 4, 9),
('gato', 'Sphynx', 'pequeno', 3, 5),
('gato', 'Common Domestic Shorthair', 'pequeno', 3, 6),
('gato', 'Common Domestic Longhair', 'pequeno', 3, 6),
('gato', 'Bombay', 'pequeno', 3, 5),
('gato', 'Sagrado de Birmania', 'pequeno', 4, 6),
('gato', 'Abisinio', 'pequeno', 3, 5),
('gato', 'American Shorthair', 'pequeno', 3.5, 7),
('gato', 'Norwegian Forest Cat', 'mediano', 4, 9),
('gato', 'Russian Blue', 'pequeno', 3, 5.5),
('gato', 'Scottish Fold', 'pequeno', 2.5, 6),
('gato', 'Oriental Shorthair', 'pequeno', 3, 5),
('gato', 'Chartreux', 'pequeno', 3, 7);

-- =====================================================================
-- TABLA: mascotas
-- =====================================================================
CREATE TABLE mascotas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  avatar_url TEXT,
  especie especie_enum NOT NULL,
  raza TEXT NOT NULL,
  tamano tamano_enum NOT NULL,
  peso_kg NUMERIC(5,2) NOT NULL CHECK (peso_kg > 0 AND peso_kg < 100),
  edad_meses INT NOT NULL CHECK (edad_meses >= 0 AND edad_meses < 360),
  actividad actividad_enum NOT NULL DEFAULT 'moderado',
  esterilizado BOOLEAN NOT NULL DEFAULT FALSE,
  condicion condicion_enum NOT NULL DEFAULT 'ninguna',
  rer_kcal NUMERIC(7,2),
  mer_kcal NUMERIC(7,2),
  gramos_diarios_actual NUMERIC(7,2),
  producto_activo_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mascotas_user ON mascotas(user_id);

-- =====================================================================
-- TABLA: productos
-- =====================================================================
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marca TEXT NOT NULL,
  linea TEXT NOT NULL,
  especie especie_enum NOT NULL,
  tamano_objetivo tamano_enum[],
  edad_min_meses INT,
  edad_max_meses INT,
  condicion_objetivo condicion_enum[],
  esterilizado_objetivo BOOLEAN,
  kcal_por_100g NUMERIC(6,2) NOT NULL,
  proteina_pct NUMERIC(4,1),
  grasa_pct NUMERIC(4,1),
  formatos JSONB NOT NULL,
  imagen_url TEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_productos_especie_activo ON productos(especie, activo);

-- FK ahora que existe productos
ALTER TABLE mascotas
  ADD CONSTRAINT fk_producto_activo
  FOREIGN KEY (producto_activo_id) REFERENCES productos(id) ON DELETE SET NULL;

-- =====================================================================
-- TABLA: compras
-- =====================================================================
CREATE TABLE compras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mascota_id UUID NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE,
  producto_id UUID NOT NULL REFERENCES productos(id),
  cantidad_kg NUMERIC(5,2) NOT NULL CHECK (cantidad_kg > 0),
  precio_pagado_clp INT,
  fecha_compra DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_estimada_agotamiento DATE NOT NULL,
  origen TEXT DEFAULT 'manual',
  click_afiliado_id UUID,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_compras_mascota_fecha ON compras(mascota_id, fecha_compra DESC);
CREATE INDEX idx_compras_agotamiento ON compras(fecha_estimada_agotamiento) WHERE fecha_estimada_agotamiento > CURRENT_DATE;

-- =====================================================================
-- TABLA: historial_peso
-- =====================================================================
CREATE TABLE historial_peso (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mascota_id UUID NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE,
  peso_kg NUMERIC(5,2) NOT NULL,
  condicion condicion_enum,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_historial_mascota_fecha ON historial_peso(mascota_id, fecha DESC);

-- =====================================================================
-- TABLA: recordatorios
-- =====================================================================
CREATE TABLE recordatorios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mascota_id UUID NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE,
  compra_id UUID REFERENCES compras(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  fecha_disparo DATE NOT NULL,
  estado recordatorio_estado DEFAULT 'pendiente',
  canal TEXT DEFAULT 'email',
  enviado_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recordatorios_pendientes ON recordatorios(fecha_disparo, estado) WHERE estado = 'pendiente';

-- =====================================================================
-- TABLA: clicks_afiliado
-- =====================================================================
CREATE TABLE clicks_afiliado (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  mascota_id UUID REFERENCES mascotas(id) ON DELETE SET NULL,
  producto_id UUID REFERENCES productos(id),
  origen TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clicks_producto_fecha ON clicks_afiliado(producto_id, created_at DESC);

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mascotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE historial_peso ENABLE ROW LEVEL SECURITY;
ALTER TABLE recordatorios ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE razas ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks_afiliado ENABLE ROW LEVEL SECURITY;

-- profiles: cada usuario solo ve/edita el suyo
CREATE POLICY "profile_self_read" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profile_self_update" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profile_self_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- mascotas: cada usuario solo ve sus mascotas
CREATE POLICY "mascotas_self_all" ON mascotas FOR ALL USING (auth.uid() = user_id);

-- compras
CREATE POLICY "compras_self_all" ON compras FOR ALL USING (auth.uid() = user_id);

-- historial_peso vía join con mascotas
CREATE POLICY "historial_self_all" ON historial_peso FOR ALL USING (
  EXISTS (SELECT 1 FROM mascotas WHERE mascotas.id = historial_peso.mascota_id AND mascotas.user_id = auth.uid())
);

-- recordatorios
CREATE POLICY "recordatorios_self_all" ON recordatorios FOR ALL USING (auth.uid() = user_id);

-- productos: lectura pública
CREATE POLICY "productos_public_read" ON productos FOR SELECT USING (TRUE);

-- razas: lectura pública
CREATE POLICY "razas_public_read" ON razas FOR SELECT USING (TRUE);

-- clicks_afiliado: insertar para cualquiera (incluso anónimo), no lectura
CREATE POLICY "clicks_public_insert" ON clicks_afiliado FOR INSERT WITH CHECK (TRUE);

-- =====================================================================
-- FUNCIÓN: updated_at automático
-- =====================================================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at_mascotas BEFORE UPDATE ON mascotas FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at_productos BEFORE UPDATE ON productos FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- =====================================================================
-- VERIFICACIÓN
-- =====================================================================
SELECT 'Schema creado. Próximo paso: ejecutar 02_seed_productos.sql' AS estado;
