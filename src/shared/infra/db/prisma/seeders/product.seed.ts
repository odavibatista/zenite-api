import { PrismaClient } from '@prisma/client';

export const productSeeder = async (
  prisma: PrismaClient,
) => {
  console.log('Running product seeder...');

  const products = [
    // Fertilizantes
    {
      name: 'BioGrow Plus',
      category: 'Fertilizante',
      minimumStock: 136,
      expirationDate: new Date('2024-10-03'),
    },
    {
      name: 'BioGrow Prime',
      category: 'Fertilizante',
      minimumStock: 179,
      expirationDate: new Date('2026-07-16'),
    },
    {
      name: 'BioGrow Max',
      category: 'Fertilizante',
      minimumStock: 185,
      expirationDate: new Date('2026-11-19'),
    },
    {
      name: 'Potassio Max',
      category: 'Fertilizante',
      minimumStock: 207,
      expirationDate: new Date('2025-07-28'),
    },
    {
      name: 'Potassio Gold',
      category: 'Fertilizante',
      minimumStock: 180,
      expirationDate: new Date('2026-12-23'),
    },
    {
      name: 'Potassio Prime',
      category: 'Fertilizante',
      minimumStock: 132,
      expirationDate: new Date('2026-08-25'),
    },
    {
      name: 'Potassio Premium',
      category: 'Fertilizante',
      minimumStock: 117,
      expirationDate: new Date('2026-10-23'),
    },
    {
      name: 'Potassio Plus',
      category: 'Fertilizante',
      minimumStock: 211,
      expirationDate: new Date('2026-10-28'),
    },
    {
      name: 'Ureia Gold',
      category: 'Fertilizante',
      minimumStock: 214,
      expirationDate: new Date('2026-06-11'),
    },
    {
      name: 'Ureia Max',
      category: 'Fertilizante',
      minimumStock: 150,
      expirationDate: new Date('2026-10-17'),
    },
    {
      name: 'Ureia Plus',
      category: 'Fertilizante',
      minimumStock: 181,
      expirationDate: new Date('2026-10-06'),
    },
    {
      name: 'NPK Max',
      category: 'Fertilizante',
      minimumStock: 158,
      expirationDate: new Date('2026-12-21'),
    },
    {
      name: 'NPK Prime',
      category: 'Fertilizante',
      minimumStock: 145,
      expirationDate: new Date('2026-08-08'),
    },
    {
      name: 'NPK Gold',
      category: 'Fertilizante',
      minimumStock: 145,
      expirationDate: new Date('2026-07-10'),
    },
    {
      name: 'NPK Plus',
      category: 'Fertilizante',
      minimumStock: 133,
      expirationDate: new Date('2026-06-14'),
    },
    {
      name: 'NPK Premium',
      category: 'Fertilizante',
      minimumStock: 223,
      expirationDate: new Date('2026-11-21'),
    },
    {
      name: 'Fosfato Max',
      category: 'Fertilizante',
      minimumStock: 123,
      expirationDate: new Date('2026-08-04'),
    },
    {
      name: 'Fosfato Premium',
      category: 'Fertilizante',
      minimumStock: 173,
      expirationDate: new Date('2026-09-23'),
    },

    // Sementes
    {
      name: 'Feijao Prime',
      category: 'Semente',
      minimumStock: 92,
      expirationDate: new Date('2026-12-16'),
    },
    {
      name: 'Feijao Max',
      category: 'Semente',
      minimumStock: 216,
      expirationDate: new Date('2026-11-29'),
    },
    {
      name: 'Feijao Plus',
      category: 'Semente',
      minimumStock: 188,
      expirationDate: new Date('2026-10-29'),
    },
    {
      name: 'Milho Max',
      category: 'Semente',
      minimumStock: 176,
      expirationDate: new Date('2026-12-28'),
    },
    {
      name: 'Milho Premium',
      category: 'Semente',
      minimumStock: 102,
      expirationDate: new Date('2026-07-21'),
    },
    {
      name: 'Milho Prime',
      category: 'Semente',
      minimumStock: 224,
      expirationDate: new Date('2026-12-06'),
    },
    {
      name: 'Milho Gold',
      category: 'Semente',
      minimumStock: 148,
      expirationDate: new Date('2026-05-21'),
    },
    {
      name: 'Soja Max',
      category: 'Semente',
      minimumStock: 192,
      expirationDate: new Date('2026-05-23'),
    },
    {
      name: 'Soja Plus',
      category: 'Semente',
      minimumStock: 165,
      expirationDate: new Date('2026-10-05'),
    },
    {
      name: 'Soja Premium',
      category: 'Semente',
      minimumStock: 208,
      expirationDate: new Date('2026-08-25'),
    },
    {
      name: 'Soja Gold',
      category: 'Semente',
      minimumStock: 247,
      expirationDate: new Date('2026-10-07'),
    },
    {
      name: 'Soja Prime',
      category: 'Semente',
      minimumStock: 135,
      expirationDate: new Date('2026-10-26'),
    },
    {
      name: 'Arroz Gold',
      category: 'Semente',
      minimumStock: 214,
      expirationDate: new Date('2026-06-21'),
    },
    {
      name: 'Arroz Premium',
      category: 'Semente',
      minimumStock: 190,
      expirationDate: new Date('2026-06-01'),
    },
    {
      name: 'Arroz Max',
      category: 'Semente',
      minimumStock: 231,
      expirationDate: new Date('2026-08-20'),
    },
    {
      name: 'Trigo Plus',
      category: 'Semente',
      minimumStock: 104,
      expirationDate: new Date('2026-05-22'),
    },
    {
      name: 'Trigo Max',
      category: 'Semente',
      minimumStock: 223,
      expirationDate: new Date('2027-01-30'),
    },

    // Defensivos
    {
      name: 'Protect Gold',
      category: 'Defensivo',
      minimumStock: 170,
      expirationDate: new Date('2026-12-23'),
    },
    {
      name: 'Protect Prime',
      category: 'Defensivo',
      minimumStock: 89,
      expirationDate: new Date('2026-09-17'),
    },
    {
      name: 'Protect Premium',
      category: 'Defensivo',
      minimumStock: 111,
      expirationDate: new Date('2027-01-26'),
    },
    {
      name: 'Protect Plus',
      category: 'Defensivo',
      minimumStock: 116,
      expirationDate: new Date('2026-12-09'),
    },
    {
      name: 'Herbicida Max',
      category: 'Defensivo',
      minimumStock: 147,
      expirationDate: new Date('2026-08-02'),
    },
    {
      name: 'Herbicida Gold',
      category: 'Defensivo',
      minimumStock: 173,
      expirationDate: new Date('2027-01-16'),
    },
    {
      name: 'Herbicida Plus',
      category: 'Defensivo',
      minimumStock: 247,
      expirationDate: new Date('2026-12-13'),
    },
    {
      name: 'Fungicida Gold',
      category: 'Defensivo',
      minimumStock: 222,
      expirationDate: new Date('2027-01-15'),
    },
    {
      name: 'Fungicida Premium',
      category: 'Defensivo',
      minimumStock: 243,
      expirationDate: new Date('2027-01-06'),
    },
    {
      name: 'Fungicida Prime',
      category: 'Defensivo',
      minimumStock: 134,
      expirationDate: new Date('2026-09-28'),
    },
    {
      name: 'Fungicida Max',
      category: 'Defensivo',
      minimumStock: 232,
      expirationDate: new Date('2026-08-19'),
    },
    {
      name: 'Fungicida Plus',
      category: 'Defensivo',
      minimumStock: 230,
      expirationDate: new Date('2026-12-30'),
    },
    {
      name: 'Inseticida Max',
      category: 'Defensivo',
      minimumStock: 90,
      expirationDate: new Date('2027-01-02'),
    },
    {
      name: 'Inseticida Premium',
      category: 'Defensivo',
      minimumStock: 167,
      expirationDate: new Date('2026-10-15'),
    },

    // Rações
    {
      name: 'Suina Prime',
      category: 'Ração',
      minimumStock: 206,
      expirationDate: new Date('2026-09-14'),
    },
    {
      name: 'Suina Premium',
      category: 'Ração',
      minimumStock: 226,
      expirationDate: new Date('2026-12-09'),
    },
    {
      name: 'Equina Prime',
      category: 'Ração',
      minimumStock: 134,
      expirationDate: new Date('2027-02-03'),
    },
    {
      name: 'Equina Plus',
      category: 'Ração',
      minimumStock: 231,
      expirationDate: new Date('2026-10-10'),
    },
    {
      name: 'Equina Max',
      category: 'Ração',
      minimumStock: 113,
      expirationDate: new Date('2027-01-17'),
    },
    {
      name: 'Equina Premium',
      category: 'Ração',
      minimumStock: 82,
      expirationDate: new Date('2026-06-15'),
    },
    {
      name: 'Bovina Prime',
      category: 'Ração',
      minimumStock: 237,
      expirationDate: new Date('2026-10-27'),
    },
    {
      name: 'Bovina Plus',
      category: 'Ração',
      minimumStock: 120,
      expirationDate: new Date('2027-01-03'),
    },
    {
      name: 'Bovina Gold',
      category: 'Ração',
      minimumStock: 163,
      expirationDate: new Date('2026-12-04'),
    },
    {
      name: 'Bovina Premium',
      category: 'Ração',
      minimumStock: 190,
      expirationDate: new Date('2026-12-23'),
    },
    {
      name: 'Avicola Max',
      category: 'Ração',
      minimumStock: 181,
      expirationDate: new Date('2026-12-03'),
    },
    {
      name: 'Avicola Gold',
      category: 'Ração',
      minimumStock: 244,
      expirationDate: new Date('2026-06-26'),
    },
  ];

  for (const product of products) {
    const exists = await prisma.product.findFirst({
      where: {
        name: product.name,
      },
    });

    if (!exists) {
      await prisma.product.create({
        data: product,
      });
    }
  }
};