import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequiredRole } from '../auth/required-role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../user/role.enum';
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
    @UseGuards(JwtAuthGuard, RoleGuard)
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @RequiredRole(Role.ADMIN)
    @ApiBearerAuth()
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productService.update(+id, updateProductDto);
    }
}
