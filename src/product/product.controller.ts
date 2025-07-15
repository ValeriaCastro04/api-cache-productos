import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
 
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }
 
    @Get()
    findAll() {
        return this.productService.findAll();
    }
 
    @Post()
    create(@Body() body: { name: string; price: number }) {
        return this.productService.create(body);
    }
}