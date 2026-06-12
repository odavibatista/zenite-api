import {
    MovementType,
    PrismaClient,
  } from '@prisma/client';
  
  export const stockMovementSeeder = async (
    prisma: PrismaClient,
  ) => {
    console.log('Running stock movement seeder...');
  
    const inventories = await prisma.inventory.findMany({
      include: {
        product: true,
        warehouse: true,
      },
    });
  
    const inboundReasons = [
      'Reposição de fornecedor',
      'Compra programada',
      'Recebimento de lote',
      'Transferência entre armazéns',
      'Reposição emergencial',
    ];
  
    const outboundReasons = [
      'Venda',
      'Distribuição regional',
      'Atendimento de pedido',
      'Venda sazonal',
      'Transferência operacional',
    ];
  
    for (const inventory of inventories) {
      const movementCount =
        Math.floor(Math.random() * 8) + 5;
  
      for (let i = 0; i < movementCount; i++) {
        const movementDate = new Date();
  
        movementDate.setDate(
          movementDate.getDate() -
            Math.floor(Math.random() * 90),
        );
  
        const movementType =
          Math.random() > 0.4
            ? MovementType.OUTBOUND
            : MovementType.INBOUND;
  
        await prisma.stockMovement.create({
          data: {
            productId: inventory.productId,
  
            warehouseId: inventory.warehouseId,
  
            movementType,
  
            quantity:
              movementType === MovementType.OUTBOUND
                ? Math.floor(Math.random() * 120) + 20
                : Math.floor(Math.random() * 200) + 50,
  
            reason:
              movementType === MovementType.OUTBOUND
                ? outboundReasons[
                    Math.floor(
                      Math.random() *
                        outboundReasons.length,
                    )
                  ]
                : inboundReasons[
                    Math.floor(
                      Math.random() *
                        inboundReasons.length,
                    )
                  ],
  
            createdAt: movementDate,
          },
        });
      }
    }
  
    /**
     * Produtos com alta demanda
     * (importantes para os relatórios da IA)
     */
    const criticalProducts = [
      'Ureia Plus',
      'NPK Prime',
      'Arroz Max',
      'Bovina Prime',
      'Equina Plus',
      'Fungicida Max',
      'Potassio Gold',
    ];
  
    for (const productName of criticalProducts) {
      const inventory =
        await prisma.inventory.findFirst({
          where: {
            product: {
              name: productName,
            },
          },
        });
  
      if (!inventory) continue;
  
      for (let i = 0; i < 20; i++) {
        const movementDate = new Date();
  
        movementDate.setDate(
          movementDate.getDate() -
            Math.floor(Math.random() * 30),
        );
  
        await prisma.stockMovement.create({
          data: {
            productId: inventory.productId,
  
            warehouseId: inventory.warehouseId,
  
            movementType: MovementType.OUTBOUND,
  
            quantity:
              Math.floor(Math.random() * 80) + 40,
  
            reason: 'Alta demanda sazonal',
  
            createdAt: movementDate,
          },
        });
      }
    }
  
    /**
     * Produtos próximos ao vencimento
     * Simula baixa movimentação
     */
    const expiringProducts = [
      'BioGrow Plus',
      'Potassio Max',
      'Arroz Premium',
      'Avicola Gold',
    ];
  
    for (const productName of expiringProducts) {
      const inventory =
        await prisma.inventory.findFirst({
          where: {
            product: {
              name: productName,
            },
          },
        });
  
      if (!inventory) continue;
  
      for (let i = 0; i < 3; i++) {
        const movementDate = new Date();
  
        movementDate.setDate(
          movementDate.getDate() -
            Math.floor(Math.random() * 60),
        );
  
        await prisma.stockMovement.create({
          data: {
            productId: inventory.productId,
  
            warehouseId: inventory.warehouseId,
  
            movementType: MovementType.OUTBOUND,
  
            quantity:
              Math.floor(Math.random() * 10) + 1,
  
            reason:
              'Baixa demanda - produto próximo ao vencimento',
  
            createdAt: movementDate,
          },
        });
      }
    }
  
    /**
     * Reposição emergencial
     * Para alguns produtos críticos
     */
    const replenishmentProducts = [
      'Ureia Plus',
      'NPK Prime',
      'Arroz Max',
    ];
  
    for (const productName of replenishmentProducts) {
      const inventory =
        await prisma.inventory.findFirst({
          where: {
            product: {
              name: productName,
            },
          },
        });
  
      if (!inventory) continue;
  
      await prisma.stockMovement.create({
        data: {
          productId: inventory.productId,
  
          warehouseId: inventory.warehouseId,
  
          movementType: MovementType.INBOUND,
  
          quantity: 500,
  
          reason:
            'Reposição emergencial de estoque',
  
          createdAt: new Date(),
        },
      });
    }
  
    console.log(
      'Stock movements seeded successfully.',
    );
  };