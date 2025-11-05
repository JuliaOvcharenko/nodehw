import { PrismaClient } from "../src/client/prisma-client";

// 1. Создать функцию для создания продукта с созданием категории в одном запросе
// 2. Создать функцию, которая берет первые 15 сущностей продукта, каждый объект имеет ТОЛЬКО id
// 3. Создать функицю, которая выводит всю информацию о продукте с учетом ее связи с категорией
// 4. Создать функцию для обновления цены продукта по его ID
// 5. Создать функцию для получения всех продуктов из определенной категории (по названию категории)
// 6. Создать функцию для удаления продукта по его ID
// 7. Создать функцию для перемещения продукта в другую категорию
// 8. Создать функцию, которая применяет 10% скидку ко всем продуктам в указанной категории


async function createProduct() {
    try {
        const category = await PrismaClient.category.create({
            // Параметр data - отвечает за передачу данных (для создания/обновления)
            data: {
                name: "Laptops"
            }
        })
        console.log(category)        
    } catch (error) {
        console.log(error);
    }
}


async function createProduct() {
    try {
        const product = client.product.findMany({
            include: {
                category: true
            }
        })
        console.log(product)        
    } catch (error) {
        console.log(error);
    }
}

createProduct()
