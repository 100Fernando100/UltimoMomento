/*
 * Smoke test de la logica editorial multi-pais.
 *
 * Verifica que cada edicion (AR/MX/ES/CO/CL) recibe:
 *   - Todas las noticias globales que la apuntan o no excluyen.
 *   - Solo las noticias locales de su propio pais.
 *   - Nunca noticias locales de otros paises.
 *
 * Tambien verifica el comportamiento agregador de WORLD/AMERICA.
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

const PER_COUNTRY: { code: CountryCode; localId: string; shouldNotSee: string[] }[] = [
  { code: 'AR', localId: 'l-ar', shouldNotSee: ['l-mx', 'l-es', 'l-co', 'l-cl'] },
  { code: 'MX', localId: 'l-mx', shouldNotSee: ['l-ar', 'l-es', 'l-co', 'l-cl'] },
  { code: 'ES', localId: 'l-es', shouldNotSee: ['l-ar', 'l-mx', 'l-co', 'l-cl'] },
  { code: 'CO', localId: 'l-co', shouldNotSee: ['l-ar', 'l-mx', 'l-es', 'l-cl'] },
  { code: 'CL', localId: 'l-cl', shouldNotSee: ['l-ar', 'l-mx', 'l-es', 'l-co'] },
];

const GLOBAL_UNRESTRICTED = ['g1', 'g2', 'g3'];

for (const { code, localId, shouldNotSee } of PER_COUNTRY) {
  header(`Edicion ${code}`);
  const filtered = filterArticlesForCountry(MOCK_ARTICLES, code);
  const ids = new Set(filtered.map(a => a.id));

  for (const gid of GLOBAL_UNRESTRICTED) {
    assert(ids.has(gid), `incluye global "${gid}"`);
  }

  assert(ids.has(localId), `incluye su propia noticia local "${localId}"`);

  for (const otherLocal of shouldNotSee) {
    assert(!ids.has(otherLocal), `NO incluye local de otro pais "${otherLocal}"`);
  }

  // Global con target: solo AR y MX deben verla
  if (code === 'AR' || code === 'MX') {
    assert(ids.has('g-targeted'), 'incluye global targeted (AR/MX whitelist)');
  } else {
    assert(!ids.has('g-targeted'), 'NO incluye global targeted (no esta en whitelist)');
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

header('Resumen');
if (failures > 0) {
  console.error(`\n${failures} assertion(s) fallaron.`);
  process.exit(1);
}
console.log('\nTodas las aserciones pasaron.');
