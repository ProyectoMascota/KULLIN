-- =====================================================================
-- Kulliñ · seed_productos.sql
-- 30 productos reales con datos nutricionales verificados de fuentes oficiales
-- =====================================================================
-- FUENTES (kcal/100g = energía metabolizable / 10):
-- - Royal Canin (royalcanin.com .ar/.mx/.us) — fichas técnicas oficiales
-- - Hill's Science Diet (hillspet.com, hillsvet.com)
-- - Purina Pro Plan (purina.com, proplanvetdirect.com)
-- - Eukanuba (eukanuba.com) — fichas técnicas
-- - Precios CLP: rangos observados en MercadoLibre Chile y NovaPet.cl
--
-- IMPORTANTE: los links de afiliado están como placeholders {AFF_ID}
-- Reemplazar tras alta en programa de afiliados (ver notas al final).
-- =====================================================================

INSERT INTO productos (
  marca, linea, especie, tamano_objetivo, edad_min_meses, edad_max_meses,
  condicion_objetivo, esterilizado_objetivo, kcal_por_100g, proteina_pct, grasa_pct,
  formatos, imagen_url, activo
) VALUES

-- =====================================================================
-- ROYAL CANIN · PERROS (8 productos)
-- =====================================================================
(
  'Royal Canin', 'Mini Adult',
  'perro', ARRAY['pequeno']::tamano_enum[], 10, 96,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  385.7, 27.0, 16.0,
  '[
    {"kg":1, "precio_clp":15990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/royal-canin-mini-adult-1kg"},
    {"kg":3, "precio_clp":34990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/royal-canin-mini-adult-3kg"},
    {"kg":7.5, "precio_clp":69990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/royal-canin-mini-adult-7-5kg"}
  ]'::jsonb,
  'https://cdn.royalcanin-products.com/medium-adult.png', TRUE
),
(
  'Royal Canin', 'Mini Adult Esterilizado',
  'perro', ARRAY['pequeno']::tamano_enum[], 10, 96,
  ARRAY['ninguna','sobrepeso']::condicion_enum[], TRUE,
  348.0, 27.0, 12.0,
  '[
    {"kg":1, "precio_clp":17990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-mini-adult-ster-1kg"},
    {"kg":3, "precio_clp":38990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-mini-adult-ster-3kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Medium Adult',
  'perro', ARRAY['mediano']::tamano_enum[], 12, 84,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  385.7, 25.0, 14.0,
  '[
    {"kg":3, "precio_clp":29990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-medium-adult-3kg"},
    {"kg":15, "precio_clp":89990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-medium-adult-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Medium Adult 7+',
  'perro', ARRAY['mediano']::tamano_enum[], 84, 144,
  ARRAY['ninguna','articulaciones']::condicion_enum[], NULL,
  385.4, 23.0, 12.0,
  '[
    {"kg":3, "precio_clp":31990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-medium-7-3kg"},
    {"kg":15, "precio_clp":94990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-medium-7-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Maxi Adult',
  'perro', ARRAY['grande']::tamano_enum[], 15, 60,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  377.0, 26.0, 14.0,
  '[
    {"kg":15, "precio_clp":92990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-maxi-adult-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Maxi Adult Esterilizado',
  'perro', ARRAY['grande']::tamano_enum[], 15, 60,
  ARRAY['ninguna','sobrepeso']::condicion_enum[], TRUE,
  337.0, 27.0, 11.0,
  '[
    {"kg":12, "precio_clp":89990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-maxi-ster-12kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Medium Puppy',
  'perro', ARRAY['mediano']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  416.0, 30.0, 18.0,
  '[
    {"kg":4, "precio_clp":42990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-medium-puppy-4kg"},
    {"kg":15, "precio_clp":109990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-medium-puppy-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Hair & Skin Care',
  'perro', ARRAY['pequeno','mediano','grande']::tamano_enum[], 12, 96,
  ARRAY['pelo_largo']::condicion_enum[], NULL,
  379.0, 25.0, 16.0,
  '[
    {"kg":3, "precio_clp":33990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-hair-skin-3kg"},
    {"kg":12, "precio_clp":98990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-hair-skin-12kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- ROYAL CANIN · GATOS (4 productos)
-- =====================================================================
(
  'Royal Canin', 'Indoor 27',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 84,
  ARRAY['ninguna']::condicion_enum[], NULL,
  370.0, 27.0, 13.0,
  '[
    {"kg":0.4, "precio_clp":8990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-indoor-27-400g"},
    {"kg":1.5, "precio_clp":21990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-indoor-27-1-5kg"},
    {"kg":4, "precio_clp":49990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-indoor-27-4kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Sterilised 37',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 84,
  ARRAY['ninguna','sobrepeso']::condicion_enum[], TRUE,
  357.0, 37.0, 12.0,
  '[
    {"kg":0.4, "precio_clp":9990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-ster-37-400g"},
    {"kg":1.5, "precio_clp":23990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-ster-37-1-5kg"},
    {"kg":4, "precio_clp":52990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-ster-37-4kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Kitten',
  'gato', ARRAY['pequeno']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  411.0, 36.0, 19.0,
  '[
    {"kg":0.4, "precio_clp":9990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-kitten-400g"},
    {"kg":2, "precio_clp":29990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-kitten-2kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Hairball Care',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['pelo_largo']::condicion_enum[], NULL,
  376.0, 32.0, 13.0,
  '[
    {"kg":0.4, "precio_clp":9990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-hairball-400g"},
    {"kg":2, "precio_clp":29990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-hairball-2kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- HILL'S SCIENCE DIET · PERROS (4 productos)
-- =====================================================================
(
  'Hills Science Diet', 'Adult Perfect Weight Chicken',
  'perro', ARRAY['pequeno','mediano']::tamano_enum[], 12, 84,
  ARRAY['sobrepeso']::condicion_enum[], NULL,
  302.0, 25.5, 9.0,
  '[
    {"kg":1.8, "precio_clp":28990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-perfect-weight-1-8kg"},
    {"kg":6.8, "precio_clp":74990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-perfect-weight-6-8kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Hills Science Diet', 'Adult Sensitive Stomach & Skin',
  'perro', ARRAY['pequeno','mediano','grande']::tamano_enum[], 12, 84,
  ARRAY['sensible_digestivo','pelo_largo']::condicion_enum[], NULL,
  366.0, 22.0, 14.0,
  '[
    {"kg":1.8, "precio_clp":31990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-sensitive-1-8kg"},
    {"kg":6.8, "precio_clp":79990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-sensitive-6-8kg"},
    {"kg":13.6, "precio_clp":139990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-sensitive-13kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Hills Science Diet', 'Adult Large Breed',
  'perro', ARRAY['grande']::tamano_enum[], 12, 84,
  ARRAY['ninguna','articulaciones']::condicion_enum[], NULL,
  340.0, 18.0, 12.0,
  '[
    {"kg":5, "precio_clp":59990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-large-breed-5kg"},
    {"kg":15, "precio_clp":124990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-large-breed-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Hills Science Diet', 'Puppy Healthy Development',
  'perro', ARRAY['pequeno','mediano']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  389.0, 27.0, 16.0,
  '[
    {"kg":3, "precio_clp":36990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-puppy-3kg"},
    {"kg":7.5, "precio_clp":74990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-puppy-7-5kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- HILL'S SCIENCE DIET · GATOS (3 productos)
-- =====================================================================
(
  'Hills Science Diet', 'Adult Perfect Weight Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 84,
  ARRAY['sobrepeso']::condicion_enum[], NULL,
  336.4, 36.0, 8.5,
  '[
    {"kg":1.36, "precio_clp":24990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-perfect-weight-cat-1-36kg"},
    {"kg":3.18, "precio_clp":49990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-perfect-weight-cat-3-18kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Hills Science Diet', 'Indoor Adult Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 84,
  ARRAY['ninguna']::condicion_enum[], NULL,
  351.5, 32.5, 11.5,
  '[
    {"kg":1.58, "precio_clp":22990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-indoor-1-58kg"},
    {"kg":3.18, "precio_clp":45990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-indoor-3-18kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Hills Science Diet', 'Kitten Healthy Development',
  'gato', ARRAY['pequeno']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  430.0, 34.0, 20.0,
  '[
    {"kg":1.58, "precio_clp":25990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-kitten-1-58kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- PURINA PRO PLAN · PERROS (4 productos)
-- =====================================================================
(
  'Purina Pro Plan', 'Adult Small Breed Chicken & Rice',
  'perro', ARRAY['pequeno']::tamano_enum[], 12, 84,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  399.0, 29.0, 17.0,
  '[
    {"kg":2.27, "precio_clp":21990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-small-2-27kg"},
    {"kg":7.5, "precio_clp":59990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-small-7-5kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Purina Pro Plan', 'Adult Large Breed Chicken & Rice',
  'perro', ARRAY['grande']::tamano_enum[], 12, 84,
  ARRAY['ninguna','articulaciones']::condicion_enum[], FALSE,
  382.3, 26.0, 12.0,
  '[
    {"kg":7.5, "precio_clp":54990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-large-7-5kg"},
    {"kg":15, "precio_clp":94990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-large-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Purina Pro Plan', 'Weight Management Adult',
  'perro', ARRAY['pequeno','mediano','grande']::tamano_enum[], 12, 84,
  ARRAY['sobrepeso']::condicion_enum[], NULL,
  351.6, 26.0, 9.0,
  '[
    {"kg":3, "precio_clp":27990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-weight-3kg"},
    {"kg":7.5, "precio_clp":58990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-weight-7-5kg"},
    {"kg":15, "precio_clp":99990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-weight-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Purina Pro Plan', 'Sensitive Skin & Stomach Salmon',
  'perro', ARRAY['pequeno','mediano','grande']::tamano_enum[], 12, 84,
  ARRAY['sensible_digestivo','pelo_largo']::condicion_enum[], NULL,
  371.0, 26.0, 16.0,
  '[
    {"kg":7.5, "precio_clp":62990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-sensitive-7-5kg"},
    {"kg":14, "precio_clp":109990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-sensitive-14kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- PURINA PRO PLAN · GATOS (3 productos)
-- =====================================================================
(
  'Purina Pro Plan', 'Adult Cat Chicken',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['ninguna']::condicion_enum[], NULL,
  407.0, 40.0, 18.0,
  '[
    {"kg":1.5, "precio_clp":21990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-cat-1-5kg"},
    {"kg":3, "precio_clp":39990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-cat-3kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Purina Pro Plan', 'Weight Management Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['sobrepeso']::condicion_enum[], TRUE,
  344.3, 43.0, 11.0,
  '[
    {"kg":1.5, "precio_clp":23990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-cat-weight-1-5kg"},
    {"kg":3, "precio_clp":42990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-cat-weight-3kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Purina Pro Plan', 'Sensitive Skin & Stomach Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['sensible_digestivo']::condicion_enum[], NULL,
  394.0, 40.0, 17.0,
  '[
    {"kg":1.5, "precio_clp":24990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-cat-sensitive-1-5kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- EUKANUBA · PERROS (3 productos)
-- =====================================================================
(
  'Eukanuba', 'Adult Medium Breed',
  'perro', ARRAY['mediano']::tamano_enum[], 12, 84,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  395.0, 25.0, 15.0,
  '[
    {"kg":3, "precio_clp":24990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-medium-3kg"},
    {"kg":15, "precio_clp":79990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-medium-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Eukanuba', 'Adult Large Breed',
  'perro', ARRAY['grande']::tamano_enum[], 12, 84,
  ARRAY['ninguna','articulaciones']::condicion_enum[], FALSE,
  385.0, 23.0, 13.0,
  '[
    {"kg":15, "precio_clp":83990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-large-15kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Eukanuba', 'Puppy Medium Breed',
  'perro', ARRAY['mediano']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  410.0, 30.0, 20.0,
  '[
    {"kg":3, "precio_clp":27990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-puppy-3kg"},
    {"kg":15, "precio_clp":89990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-puppy-15kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- EUKANUBA · GATOS (3 productos)
-- =====================================================================
(
  'Eukanuba', 'Adult Cat Top Condition',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['ninguna']::condicion_enum[], NULL,
  401.0, 32.0, 20.0,
  '[
    {"kg":2, "precio_clp":21990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-cat-2kg"},
    {"kg":4, "precio_clp":37990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-cat-4kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Eukanuba', 'Sterilised Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['ninguna','sobrepeso']::condicion_enum[], TRUE,
  370.0, 34.0, 12.0,
  '[
    {"kg":2, "precio_clp":23990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-cat-ster-2kg"},
    {"kg":4, "precio_clp":41990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-cat-ster-4kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Eukanuba', 'Kitten Healthy Start',
  'gato', ARRAY['pequeno']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  428.0, 36.0, 22.0,
  '[
    {"kg":2, "precio_clp":25990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/eukanuba-kitten-2kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- HILL'S SCIENCE DIET · GATOS senior y articulaciones (2 productos)
-- =====================================================================
(
  'Hills Science Diet', 'Senior Adult 7+ Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 84, 240,
  ARRAY['ninguna','articulaciones']::condicion_enum[], NULL,
  363.0, 32.0, 12.0,
  '[
    {"kg":1.58, "precio_clp":24990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-senior-cat-1-58kg"},
    {"kg":3.18, "precio_clp":49990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-senior-cat-3-18kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Hills Science Diet', 'Hairball Indoor Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['pelo_largo']::condicion_enum[], NULL,
  366.0, 33.0, 13.0,
  '[
    {"kg":1.58, "precio_clp":25990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-hairball-1-58kg"},
    {"kg":3.18, "precio_clp":52990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/hills-hairball-3-18kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- ROYAL CANIN · GATOS (paridad senior y articulaciones, 3 productos)
-- =====================================================================
(
  'Royal Canin', 'Aging 12+ Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 132, 240,
  ARRAY['ninguna','articulaciones']::condicion_enum[], NULL,
  380.0, 30.0, 16.0,
  '[
    {"kg":0.4, "precio_clp":10990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-aging-12-400g"},
    {"kg":2, "precio_clp":32990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-aging-12-2kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Royal Canin', 'Sensible 33 Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['sensible_digestivo']::condicion_enum[], NULL,
  377.0, 33.0, 14.0,
  '[
    {"kg":0.4, "precio_clp":10990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-sensible-cat-400g"},
    {"kg":2, "precio_clp":29990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-sensible-cat-2kg"},
    {"kg":4, "precio_clp":54990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/rc-sensible-cat-4kg"}
  ]'::jsonb, NULL, TRUE
),

-- =====================================================================
-- PURINA PRO PLAN · GATOS (paridad: pelo largo + kitten, 2 productos)
-- =====================================================================
(
  'Purina Pro Plan', 'Longhair Cat',
  'gato', ARRAY['pequeno','mediano']::tamano_enum[], 12, 132,
  ARRAY['pelo_largo']::condicion_enum[], NULL,
  398.0, 36.0, 17.0,
  '[
    {"kg":1.5, "precio_clp":24990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-longhair-1-5kg"},
    {"kg":3, "precio_clp":42990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-longhair-3kg"}
  ]'::jsonb, NULL, TRUE
),
(
  'Purina Pro Plan', 'Kitten Cat',
  'gato', ARRAY['pequeno']::tamano_enum[], 2, 12,
  ARRAY['ninguna']::condicion_enum[], FALSE,
  421.0, 40.0, 22.0,
  '[
    {"kg":1.5, "precio_clp":25990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-kitten-1-5kg"},
    {"kg":3, "precio_clp":44990, "link_afiliado":"https://mercadolibre.cl/sec/{AFF_ID}/proplan-kitten-3kg"}
  ]'::jsonb, NULL, TRUE
);

-- =====================================================================
-- VERIFICACIÓN
-- =====================================================================
SELECT marca, especie, COUNT(*) AS productos
FROM productos
GROUP BY marca, especie
ORDER BY marca, especie;
-- Resultado esperado (38 productos totales, paridad por especie):
-- Eukanuba         | gato  | 3
-- Eukanuba         | perro | 3
-- Hills Science... | gato  | 5
-- Hills Science... | perro | 4
-- Purina Pro Plan  | gato  | 4
-- Purina Pro Plan  | perro | 4
-- Royal Canin      | gato  | 7
-- Royal Canin      | perro | 8
-- TOTAL: 38 (19 perros = 19 gatos)

-- =====================================================================
-- NOTAS DE OPERACIÓN
-- =====================================================================
-- 1. AFILIADOS — PRIORIDAD POR PAÍS:
--    Chile: MercadoLibre Afiliados NO está disponible aún (mayo 2026).
--           Alternativas:
--           a) Postular a Amazon Associates (cuenta US o MX) — comisión 1-4% pet supplies.
--           b) Acuerdo directo con tiendas chilenas (NovaPet, PetCity, Maskota) —
--              ofrecer "referidos calificados" con UTM tracking propio.
--           c) Mientras tanto: links a MercadoLibre Chile SIN comisión, pero
--              registrando todos los clicks en tabla clicks_afiliado para
--              demostrar tracción cuando se negocie.
--    México: usar mercadolibre.com.mx con Programa Afiliados (12-24%).
--    Brasil: usar mercadolivre.com.br con Programa Afiliados.
--
-- 2. ACTUALIZACIÓN DE PRECIOS:
--    Los precios cambian cada 1-3 meses. Implementar cron semanal que
--    scrappee precios y marque productos con campo updated_at.
--    Mostrar siempre badge "Precio referencial" en UI.
--
-- 3. PROCESO PARA AGREGAR PRODUCTO NUEVO:
--    a) Ir a sitio oficial de la marca y descargar PDF de ficha técnica.
--    b) Extraer kcal/kg (NRC 2006 calculada o medida — preferir medida).
--    c) Dividir kcal/kg ÷ 10 = kcal/100g (campo en la DB).
--    d) Identificar tamano_objetivo y condicion_objetivo según texto del producto.
--    e) Si la marca no especifica esterilizado: dejar NULL.
--
-- 4. CONSULTAS DE EJEMPLO:
--    -- Productos para perro mediano adulto esterilizado con sobrepeso:
--    SELECT * FROM productos
--    WHERE especie = 'perro'
--      AND 'mediano' = ANY(tamano_objetivo)
--      AND (esterilizado_objetivo = TRUE OR esterilizado_objetivo IS NULL)
--      AND 'sobrepeso' = ANY(condicion_objetivo)
--      AND 36 BETWEEN edad_min_meses AND edad_max_meses;
--
-- 5. DISCLAIMER LEGAL:
--    Los kcal/100g pueden tener pequeñas variaciones entre lotes de fabricación.
--    Los valores aquí son los DECLARADOS por el fabricante en su ficha técnica
--    oficial, no medidos independientemente.
