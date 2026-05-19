/*
 * Smoke test de la logica editorial multi-pais.
 *
 * Verifica que cada edicion (AR/MX/ES/CO/CL/PE/VE/US/CA) recibe:
 *   - Todas las noticias globales que la apuntan o no excluyen.
 *   - Solo las noticias locales de su propio pais.
 *   - Nunca noticias locales de otros paises.
 *   - Globales con `target_countries` solo si esta en la whitelist.
 *
 * Tambien verifica:
 *   - Comportamiento agregador de WORLD/AMERICA.
 *   - Que cada articulo mock tenga kicker con el scope visible (GLOBAL/LOCAL).
 *
 * Ejecucion: npm run smoke
 */

import { filterArticlesForCountry, isArticleVisibleInCountry, CountryCode } from '../src/lib/editorial';
import { MOCK_ARTICLES } from '../src/lib/mockArticles';

let failures = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('  ✗', msg);
    failures++;
  } else {
    console.log('  ✓', msg);
  }
}

function header(name: string) {
  console.log('\n' + name);
}

const ALL_LOCAL_IDS = ['l-ar', 'l-mx', 'l-es', 'l-co', 'l-cl', 'l-pe', 'l-ve', 'l-us', 'l-ca'];

const PER_COUNTRY: { code: CountryCode; localId: string }[] = [
  { code: 'AR', localId: 'l-ar' },
  { code: 'MX', localId: 'l-mx' },
  { code: 'ES', localId: 'l-es' },
  { code: 'CO', localId: 'l-co' },
  { code: 'CL', localId: 'l-cl' },
  { code: 'PE', localId: 'l-pe' },
  { code: 'VE', localId: 'l-ve' },
  { code: 'US', localId: 'l-us' },
  { code: 'CA', localId: 'l-ca' },
];

// Globales sin target_countries (visibles en todos).
const GLOBAL_UNRESTRICTED = ['g1', 'g2', 'g3', 'g4', 'g-seguridad'];

// Globales con target_countries: cada uno lista los paises en los que SI debe verse.
const GLOBAL_TARGETED: Record<string, CountryCode[]> = {
  'g-targeted': ['AR', 'MX'],
  'g-futbol': ['AR', 'CO', 'CL', 'PE'],
  'g-migracion': ['US', 'MX', 'VE'],
};

for (const { code, localId } of PER_COUNTRY) {
  header(`Edicion ${code}`);
  const filtered = filterArticlesForCountry(MOCK_ARTICLES, code);
  const ids = new Set(filtered.map(a => a.id));

  for (const gid of GLOBAL_UNRESTRICTED) {
    assert(ids.has(gid), `incluye global sin restriccion "${gid}"`);
  }

  assert(ids.has(localId), `incluye su propia noticia local "${localId}"`);

  for (const otherLocal of ALL_LOCAL_IDS.filter(id => id !== localId)) {
    assert(!ids.has(otherLocal), `NO incluye local de otro pais "${otherLocal}"`);
  }

  for (const [tid, whitelist] of Object.entries(GLOBAL_TARGETED)) {
    if (whitelist.includes(code)) {
      assert(ids.has(tid), `incluye global targeted "${tid}" (en whitelist ${whitelist.join('/')})`);
    } else {
      assert(!ids.has(tid), `NO incluye global targeted "${tid}" (fuera de whitelist ${whitelist.join('/')})`);
    }
  }
}

header('Edicion WORLD (agregadora)');
const world = filterArticlesForCountry(MOCK_ARTICLES, 'WORLD');
assert(world.length === MOCK_ARTICLES.length, 'WORLD ve todos los articulos');

header('Edicion AMERICA (agregadora)');
const america = filterArticlesForCountry(MOCK_ARTICLES, 'AMERICA');
assert(america.length === MOCK_ARTICLES.length, 'AMERICA ve todos los articulos');

header('Compatibilidad legacy (articulo sin distribution_scope)');
const legacy = { id: 'legacy-1', country: 'AR' };
assert(isArticleVisibleInCountry(legacy, 'AR'), 'legacy AR visible en edicion AR');
assert(!isArticleVisibleInCountry(legacy, 'MX'), 'legacy AR NO visible en edicion MX');
assert(isArticleVisibleInCountry(legacy, 'WORLD'), 'legacy visible en WORLD');

header('Etiquetas visibles en mocks (kicker contiene GLOBAL o LOCAL)');
for (const article of MOCK_ARTICLES) {
  const k = (article.kicker || '').toUpperCase();
  const scope = (article.distribution_scope || 'local').toUpperCase();
  assert(
    k.includes(scope),
    `mock "${article.id}" tiene kicker con scope visible (${scope}): "${article.kicker}"`,
  );
}

header('Cobertura: cada pais soportado tiene al menos un local mock');
for (const { code, localId } of PER_COUNTRY) {
  const found = MOCK_ARTICLES.find(a => a.id === localId);
  assert(!!found, `existe mock local para ${code} (id=${localId})`);
}

header('Resumen');
if (failures > 0) {
  console.error(`\n${failures} assertion(s) fallaron.`);
  process.exit(1);
}
console.log('\nTodas las aserciones pasaron.');
