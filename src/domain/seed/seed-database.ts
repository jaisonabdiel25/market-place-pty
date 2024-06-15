import { prisma } from "../../client";
import { initialData } from "./seed";



async function SeedMain() {
    
    const { Category } = initialData;

    await prisma.category.deleteMany();

    await prisma.category.createMany({data: Category});
}


(() => {
    SeedMain().then(() => {
        console.log('SeedMain done');
    }).catch((error) => {
        console.error('SeedMain error', error);
    });
})();