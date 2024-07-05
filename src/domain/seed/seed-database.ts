import { prisma } from "../../client";
import { initialData } from "./seed";



async function SeedMain() {
    
    const { Category } = initialData;

    await prisma.image.deleteMany();

    await prisma.category.deleteMany();

    await prisma.saleItem.deleteMany();

    await prisma.sale.deleteMany();

    await prisma.product.deleteMany();

    await prisma.category.createMany({data: Category});
}


(() => {
    SeedMain().then(() => {
        console.log('SeedMain done');
    }).catch((error) => {
        console.error('SeedMain error', error);
    });
})();