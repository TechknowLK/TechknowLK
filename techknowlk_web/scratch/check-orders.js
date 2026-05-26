import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('--- Last 5 Orders ---');
  orders.forEach(o => {
    console.log(`ID: #TKLK-${1000 + o.id} | Method: ${o.orderMethod} | Type: ${o.orderType}`);
    console.log(`Customer: ${o.customerName} | Total: ${o.total}`);
    console.log('Items:', JSON.stringify(o.items, null, 2));
    console.log('---------------------');
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
