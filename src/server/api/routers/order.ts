import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { FulfillmentStatus, type Prisma } from "@prisma/client";
import { type Decimal } from "@prisma/client/runtime/library";

const SortOrder = z.enum(["asc", "desc"]);
const SortField = z.enum(["createdAt", "totalAmount", "status"]);

const orderFiltersSchema = z.object({
  status: z.nativeEnum(FulfillmentStatus).optional(),
  search: z.string().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  sortBy: SortField.optional().default("createdAt"),
  sortOrder: SortOrder.optional().default("asc"),
  page: z.number().min(1).default(1),
});

const paginationSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
});

export const convertDecimal = (decimal: Decimal | null | undefined): number => {
  if (!decimal) return 0;
  return decimal.toNumber();
};

export const orderRouter = createTRPCRouter({
  getAllCustomerOrders: publicProcedure
    .input(paginationSchema.merge(orderFiltersSchema))
    .query(async ({ ctx, input }) => {
      const { limit, page, status, search, dateRange, sortBy, sortOrder } =
        input;

      let whereConditions: Prisma.OrderWhereInput = {};

      if (status) {
        whereConditions.status = status;
      }

      if (dateRange) {
        whereConditions.createdAt = {
          gte: dateRange.from,
          lte: dateRange.to,
        };
      }

      if (search) {
        whereConditions.OR = [
          {
            customer: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            id: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            customer: {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            shippingAddress: {
              country: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            shippingAddress: {
              state: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            shippingAddress: {
              city: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            shippingAddress: {
              street: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            orderItems: {
              some: {
                product: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ];
      }

      whereConditions = whereConditions;

      const totalOrders = await ctx.db.order.count({
        where: whereConditions,
      });

      const totalPages = Math.ceil(totalOrders / limit);
      const skip = (page - 1) * limit;

      const orders = await ctx.db.order.findMany({
        take: limit,
        skip,
        where: whereConditions,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          shippingAddress: true,
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  sku: true,
                },
              },
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
      });

      // Converting Decimal values to numbers before sending to client
      const serializedOrders = orders.map((order) => ({
        ...order,
        totalAmount: convertDecimal(order.totalAmount),
        orderItems: order.orderItems.map((item) => ({
          ...item,
          price: convertDecimal(item.price),
          product: {
            ...item.product,
            price: convertDecimal(item.product.price),
          },
        })),
      }));

      return {
        items: serializedOrders,
        pagination: {
          page,
          limit,
          totalItems: totalOrders,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        },
      };
    }),
});
