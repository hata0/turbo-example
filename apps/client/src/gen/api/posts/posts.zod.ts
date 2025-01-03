/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Tutorial API
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod'

/**
 * @summary ポスト一覧を取得
 */
export const getPostsQueryParams = zod.object({
  "sort": zod.enum(['latest', 'oldest']),
  "limit": zod.number().nullish(),
  "page": zod.number().nullish()
})

export const getPostsResponse = zod.object({
  "posts": zod.array(zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "body": zod.string(),
  "createdAt": zod.string().datetime(),
  "updatedAt": zod.string().datetime()
})),
  "pagination": zod.object({
  "currentPage": zod.number(),
  "totalPage": zod.number(),
  "totalCount": zod.number()
})
})

/**
 * @summary ポストを作成
 */
export const postPostsBody = zod.object({
  "profileId": zod.string(),
  "title": zod.string(),
  "body": zod.string()
})

export const postPostsResponse = zod.object({
  "post": zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "body": zod.string(),
  "createdAt": zod.string().datetime(),
  "updatedAt": zod.string().datetime()
})
})

/**
 * @summary ポストを複数削除
 */
export const deletePostsBody = zod.object({
  "ids": zod.array(zod.string())
})

export const deletePostsResponse = zod.object({
  "message": zod.string()
})

/**
 * @summary ポストを取得
 */
export const getPostsIdParams = zod.object({
  "id": zod.string()
})

export const getPostsIdResponse = zod.object({
  "post": zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "body": zod.string(),
  "createdAt": zod.string().datetime(),
  "updatedAt": zod.string().datetime()
})
})

/**
 * @summary ポストの更新
 */
export const putPostsIdParams = zod.object({
  "id": zod.string()
})

export const putPostsIdBody = zod.object({
  "title": zod.string().optional(),
  "body": zod.string().optional()
})

export const putPostsIdResponse = zod.object({
  "post": zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "body": zod.string(),
  "createdAt": zod.string().datetime(),
  "updatedAt": zod.string().datetime()
})
})

/**
 * @summary ポストを削除
 */
export const deletePostsIdParams = zod.object({
  "id": zod.string()
})

export const deletePostsIdResponse = zod.object({
  "message": zod.string()
})

