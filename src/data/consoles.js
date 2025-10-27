const STORAGE_KEY = 'retro_consoles_v1';

const sampleConsoles = [
  { id: '1', name: 'NES', brand: 'Nintendo', price: 120, image: '/assets/consoles/nes.png' },
  { id: '2', name: 'Sega Genesis', brand: 'SEGA', price: 140, image: '/assets/consoles/sega-genesis.png' },
  { id: '3', name: 'PlayStation 1', brand: 'Sony', price: 200, image: '/assets/consoles/ps1.png' },
];

export function readAll() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleConsoles));
    return sampleConsoles;
  }
  return JSON.parse(stored);
}

export function create(consoleItem) {
  const consoles = readAll();
  consoles.push(consoleItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consoles));
  return consoleItem;
}

export function update(id, changes) {
  const consoles = readAll();
  const idx = consoles.findIndex(c => c.id === id);
  if (idx !== -1) {
    consoles[idx] = { ...consoles[idx], ...changes };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consoles));
  }
}

export function remove(id) {
  let consoles = readAll();
  consoles = consoles.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consoles));
}
