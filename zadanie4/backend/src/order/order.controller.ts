import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';
import { OrderService } from './order.service';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.orderService.create(createOrderDto);
    }

    @ApiQuery({
        name: 'status',
        required: false,
        enum: OrderStatus
    })
    @Get()
    async findAll(@Query('status') status?: OrderStatus): Promise<Order[]> {
        return await this.orderService.findAll(status);
    }

    @Get('/status')
    findStatuses(): OrderStatus[] {
        return [
            OrderStatus.UNAPPROVED,
            OrderStatus.APPROVED,
            OrderStatus.COMPLETED,
            OrderStatus.CANCELLED
        ];
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order> {
        return await this.orderService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<Order> {
        return await this.orderService.update(+id, updateOrderDto);
    }

    @Put(':id/approve')
    @HttpCode(HttpStatus.NO_CONTENT)
    async approveOrder(@Param('id') id: string): Promise<void> {
        await this.orderService.changeOrderStatus(+id, OrderStatus.APPROVED);
    }

    @Put(':id/complete')
    @HttpCode(HttpStatus.NO_CONTENT)
    async completeOrder(@Param('id') id: string) {
        await this.orderService.changeOrderStatus(+id, OrderStatus.COMPLETED);
    }

    @Put(':id/cancel')
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancelOrder(@Param('id') id: string) {
        await this.orderService.changeOrderStatus(+id, OrderStatus.CANCELLED);
    }
}
