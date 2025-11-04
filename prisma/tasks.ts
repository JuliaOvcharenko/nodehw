// Создать функцию для создания продукта с созданием категории в одном запросе

// import { PrismaClient } from "../src/generated/prisma/client";


// const client = new PrismaClient()

// async function createProduct() {
//     try {
//         const category = await client.category.create({
//             // Параметр data - отвечает за передачу данных (для создания/обновления)
//             data: {
//                 name: "Laptops"
//             }
//         })
//         console.log(category)        
//     } catch (error) {
//         console.log(error);
//     }
// }

// 3. Создать функицю, которая выводит всю информацию о продукте с учетом ее связи с категорией

// async function createProduct() {
//     try {
//         const product = client.product.findMany({
//             include: {
//                 category: true
//             }
//         })
//         console.log(product)        
//     } catch (error) {
//         console.log(error);
//     }
// }

// createProduct()
