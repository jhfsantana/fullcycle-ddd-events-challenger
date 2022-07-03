import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product.repository-interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductSequelizeRepository implements ProductRepositoryInterface {
    
    async create(entity: Product): Promise<void>{   
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }
    async update(entity: Product) : Promise<void> {
        await ProductModel.update({
            id: entity.id,
            name: entity.name,
            price: entity.price
        }, {
            where: {
                id: entity.id
            }
        });
    }
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        return new Product(product.id, product.name, product.price);
    }
    
    async findAll(): Promise<Product[]> {
        return (await ProductModel.findAll())
        .map((product) => new Product(product.id, product.name, product.price));
    }
    
}