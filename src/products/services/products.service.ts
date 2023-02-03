import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInput , UpdateProductInput } from 'src/schema';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}
  create({name,type }: CreateProductInput) {
    return this.prisma.product.create({
      data: {name,type}
    })
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      select: {name: true, id: true, type: true}
    });
  }

  update(id: number, {name, type}: UpdateProductInput) {
    return  this.prisma.product.update({
      where :{ id},
      data: {
        name,
        type
      }
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
