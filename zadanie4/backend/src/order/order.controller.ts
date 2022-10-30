import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createOrderDto: CreateOrderDto): Order {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll(): Order[] {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Order {
        return this.orderService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Order {
        return this.orderService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id);
    }
}
