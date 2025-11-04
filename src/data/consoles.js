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
  }
];

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
export const consolesData = [
  {
    id: 1,
    nombre: 'Nintendo NES',
    precio: 79990,
    imagen: '/assets/products/nes.jpg'
  },
  {
    id: 2,
    nombre: 'Super Nintendo (SNES)',
    precio: 99990,
    imagen: '/assets/products/snes.jpg'
  },
  {
    id: 3,
    nombre: 'Nintendo 64',
    precio: 119990,
    imagen: '/assets/products/n64.avif'
  },
  {
    id: 4,
    nombre: 'Virtual Boy',
    precio: 89990,
    imagen: '/assets/products/vb.png'
  },
  {
    id: 5,
    nombre: 'Game Boy Color',
    precio: 49990,
    imagen: '/assets/products/gmbcolor.avif'
  },
  {
    id: 6,
    nombre: 'Game Boy Advance',
    precio: 59990,
    imagen: '/assets/products/gmbadv.jpg'
  },
  {
    id: 7,
    nombre: 'Nintendo GameCube',
    precio: 89990,
    imagen: '/assets/products/gmcb.avif'
  },
  {
    id: 8,
    nombre: 'Nintendo Wii',
    precio: 49990,
    imagen: '/assets/products/wii.png'
  }
];

