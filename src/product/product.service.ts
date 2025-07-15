import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
//import { Cache } from 'cache-manager';
 
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
 
        @Inject(CACHE_MANAGER)
        private cacheManager: any //Cache - Cambié a 'any' para evitar problemas de tipado con cache-manager,
    ) { }
 
    async findAll() {
        const cacheKey = 'products_all';
        const cached = await this.cacheManager.get(cacheKey);
        console.log('ver cache', cached);
        if (cached) {
            console.log('📦 Usando datos del caché');
            return cached;
        }
 
        console.log('💾 Consultando BD y guardando en caché');
        const products = await this.productRepo.find();
        //await this.cacheManager.set(cacheKey, products, 30); <--Este era el problema, la razon por la que no estaba funcionando correctamente el caché
        await this.cacheManager.set(cacheKey, products, { ttl: 30 });
        return products;
    }
 
    async create(data: Partial<Product>) {
        await this.cacheManager.del('products_all');
        const newProduct = this.productRepo.create(data);
        return this.productRepo.save(newProduct);
    }
}