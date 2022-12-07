import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminRoute } from '../auth/decorators/admin-route.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(+id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @AdminRoute()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Patch(':id')
    @AdminRoute()
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productService.update(+id, updateProductDto);
    }
}
