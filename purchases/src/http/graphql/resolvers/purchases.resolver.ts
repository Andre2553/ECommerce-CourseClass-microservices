/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(private purchasesService: PurchasesService, private productsService: ProductsService ) {}


  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }
  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }


  // @UseGuards(AuthorizationGuard)
  // @Mutation(()=>Product)
  // createPurchase(
  //   @Args('data') data: CreatePurchaseInput,
  // ){
  //   return this.purchasesService.createPurchase(data);
  // }
}