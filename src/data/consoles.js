const STORAGE_KEY = 'retro_consoles_v1';

const sampleConsoles = [
  {
    id: '1',
    name: 'Nintendo NES',
    brand: 'Nintendo',
    price: 79990,
    image: '/assets/products/nes.jpg'
  },
  {
    id: '2',
    name: 'Super Nintendo (SNES)',
    brand: 'Nintendo',
    price: 99990,
    image: '/assets/products/snes.jpg'
  },
  {
    id: '3',
    name: 'Nintendo 64',
    brand: 'Nintendo',
    price: 119990,
    image: '/assets/products/n64.avif'
  },
  {
    id: '4',
    name: 'Virtual Boy',
    brand: 'Nintendo',
    price: 89990,
    image: '/assets/products/vb.png'
  },
  {
    id: '5',
    name: 'Game Boy Color',
    brand: 'Nintendo',
    price: 49990,
    image: '/assets/products/gmbcolor.avif'
  },
  {
    id: '6',
    name: 'Game Boy Advance',
    brand: 'Nintendo',
    price: 59990,
    image: '/assets/products/gmbadv.jpg'
  },
  {
    id: '7',
    name: 'Nintendo GameCube',
    brand: 'Nintendo',
    price: 89990,
    image: '/assets/products/gmcb.avif'
  },
  {
    id: '8',
    name: 'Nintendo Wii',
    brand: 'Nintendo',
    price: 49990,
    image: '/assets/products/wii.png'
  }
];
// 🔹 Forzar recarga de datos solo si hay menos de 8 consolas guardadas
const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
if (storedData.length < 8) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleConsoles));
}

export function readAll() {
  const stored = localStorage.getItem(STORAGE_KEY);
  try {
    const parsed = stored ? JSON.parse(stored) : null;

    if (!parsed || !parsed[0]?.image?.includes('/assets/products/')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleConsoles));
      return sampleConsoles;
    }

    return parsed;
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleConsoles));
    return sampleConsoles;
  }
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


