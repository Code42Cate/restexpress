import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Bookmark, { schema } from './model'

const { content } = schema.tree
/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Bookmark management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/bookmarks/:
 *    post:
 *      summary: Create a new Bookmark
 *      tags: [Bookmarks]
 *      security:
 *        - jwtSessionToken: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *      responses:
 *        "201":
 *          description: A bookmark schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Bookmark'
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.post(
    '/',
    body({
        content
    }),
    addAuthor({ required: false, addBody: true }),
    create
)

// TODO: Pagination docs
/**
 * @swagger
 * path:
 *  api/bookmarks/:
 *    get:
 *      summary: Get bookmarks
 *      tags: [Bookmarks]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A bookmark schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/bookmarks/{bookmarkId}:
 *    get:
 *      summary: Get Bookmark
 *      tags: [Bookmarks]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: bookmarkId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the bookmark to get
 *      responses:
 *        "200":
 *          description: A bookmark schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Bookmark not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/bookmarks/{bookmarkId}:
 *    put:
 *      summary: Update bookmark
 *      tags: [Bookmarks]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: bookmarkId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the bookmark to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Bookmark schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Bookmark not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ content }), update)

/**
 * @swagger
 * path:
 *  api/bookmarks/{bookmarkId}:
 *    delete:
 *      summary: Delete bookmark
 *      tags: [Bookmarks]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: bookmarkId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the bookmark to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted bookmark
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Bookmark not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
