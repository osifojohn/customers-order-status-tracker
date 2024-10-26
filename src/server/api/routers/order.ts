import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { FulfillmentStatus, type Prisma } from "@prisma/client";

const SortOrder = z.enum(["asc", "desc"]);
const SortField = z.enum(["createdAt", "totalAmount", "status"]);

const orderFiltersSchema = z.object({
  customerId: z.string(),
  status: z.nativeEnum(FulfillmentStatus).optional(),
  search: z.string().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  sortBy: SortField.optional().default("createdAt"),
  sortOrder: SortOrder.optional().default("desc"),
  page: z.number().min(1).default(1),
});

const paginationSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
});

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

      return {
        items: orders,
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
