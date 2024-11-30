import {
  CreatePostBodySchema,
  DeleteManyPostBodySchema,
  PostParamsSchema,
  PostResponseSchema,
  PostSchema,
  PostsQuerySchema,
  UpdatePostBodySchema,
} from "@/openapi/schemas/post";
import { Prisma, PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { fromPromise } from "neverthrow";

export class PostHandler {
  async list(c: Context) {
    const validationQuery = PostsQuerySchema.parse(c.req.query());

    const { limit, page, sort } = validationQuery;

    const prisma = new PrismaClient();

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let posts;
    if (sort === "oldest") {
      posts = await prisma.post.findMany({
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: "asc" },
      });
    } else {
      posts = await prisma.post.findMany({
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: "desc" },
      });
    }

    const totalCount = await prisma.post.count();
    const totalPage = Math.ceil(totalCount / limit);

    return c.json(
      {
        posts: posts.map((post) => PostSchema.parse(post)),
        pagination: {
          currentPage: page,
          totalPage,
          totalCount,
        },
      },
      200,
    );
  }

  async get(c: Context) {
    const validationParam = PostParamsSchema.parse(c.req.param());

    const { id } = validationParam;

    const prisma = new PrismaClient();
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return c.json(PostResponseSchema.parse({ post }), 200);
  }

  async create(c: Context) {
    const validationBody = CreatePostBodySchema.parse(await c.req.json());

    const prisma = new PrismaClient();
    const res = await fromPromise(
      prisma.post.create({
        data: validationBody,
      }),
      (e) => e,
    );

    if (res.isErr()) {
      if (res.error instanceof Prisma.PrismaClientKnownRequestError && res.error.code === "P2003") {
        return c.json({ message: "profile id does not exist" }, 400);
      }
      return c.json({ message: "internal server error" }, 500);
    }

    return c.json(PostResponseSchema.parse({ post: res.value }), 200);
  }

  async update(c: Context) {
    const validationBody = UpdatePostBodySchema.parse(await c.req.json());

    const validationParam = PostParamsSchema.parse(c.req.param());

    const prisma = new PrismaClient();
    const res = await fromPromise(
      prisma.post.update({
        where: { id: validationParam.id },
        data: validationBody,
      }),
      (e) => e,
    );

    if (res.isErr()) {
      if (res.error instanceof Prisma.PrismaClientKnownRequestError && res.error.code === "P2025") {
        return c.json({ message: "record to update not found" }, 400);
      }
      return c.json({ message: "internal server error" }, 500);
    }

    return c.json(PostResponseSchema.parse({ post: res.value }), 200);
  }

  async delete(c: Context) {
    const validationParam = PostParamsSchema.parse(c.req.param());

    const prisma = new PrismaClient();
    const res = await fromPromise(
      prisma.post.delete({
        where: { id: validationParam.id },
      }),
      (e) => e,
    );

    if (res.isErr()) {
      if (res.error instanceof Prisma.PrismaClientKnownRequestError && res.error.code === "P2025") {
        return c.json({ message: "record to delete does not exist" }, 400);
      }
      return c.json({ message: "internal server error" }, 500);
    }

    return c.json({ message: "success" }, 200);
  }

  async deleteMany(c: Context) {
    const validationBody = DeleteManyPostBodySchema.parse(await c.req.json());

    const prisma = new PrismaClient();
    await prisma.post.deleteMany({
      where: {
        id: { in: validationBody.ids },
      },
    });

    return c.json({ message: "success" }, 200);
  }
}
