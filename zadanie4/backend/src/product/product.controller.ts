import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    findAll(): Product[] {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Product {
        return this.productService.findOne(+id);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto): Product {
        return this.productService.create(createProductDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Product {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): void {
        return this.productService.remove(+id);
    }
}
