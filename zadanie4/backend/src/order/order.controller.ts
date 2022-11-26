import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Request
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminRoute } from '../auth/admin-route.decorator';
import { UserStrippedPassword } from '../auth/auth.service';
import { UserRoute } from '../auth/user-route.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';
import { OrderService } from './order.service';

// TODO create custom decorator to get user from request
type RequestWithUser = Request & { user: UserStrippedPassword };

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UserRoute()
    async create(
        @Request() req: RequestWithUser,
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order> {
        return await this.orderService.create(req.user, createOrderDto);
    }

    @ApiQuery({
        name: 'status',
        required: false,
        enum: OrderStatus
    })
    @Get()
    @AdminRoute()
    async findAll(@Query('status') status?: OrderStatus): Promise<Order[]> {
        return await this.orderService.findAll(status);
    }

    @Get('/status')
    @AdminRoute()
    findStatuses(): OrderStatus[] {
        return this.orderService.getAllPossibleStatuses();
    }

    @Get(':id')
    @AdminRoute()
    async findOne(@Param('id') id: string): Promise<Order> {
        return await this.orderService.findOne(+id);
    }

    @Put(':id/approve')
    @AdminRoute()
    async approveOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.APPROVED
        );
    }

    @Put(':id/complete')
    @AdminRoute()
    async completeOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.COMPLETED
        );
    }

    @Put(':id/cancel')
    @AdminRoute()
    async cancelOrder(@Param('id') id: string): Promise<Order> {
        return await this.orderService.changeOrderStatus(
            +id,
            OrderStatus.CANCELLED
        );
    }
}
