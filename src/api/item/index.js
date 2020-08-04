import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Item, { schema } from './model'

const { content } = schema.tree
/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/items/:
 *    post:
 *      summary: Create a new Item
 *      tags: [Items]
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
 *          description: A item schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Item'
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
 *  api/items/:
 *    get:
 *      summary: Get items
 *      tags: [Items]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A item schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/items/{itemId}:
 *    get:
 *      summary: Get Item
 *      tags: [Items]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: itemId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the item to get
 *      responses:
 *        "200":
 *          description: A item schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Item not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/items/{itemId}:
 *    put:
 *      summary: Update item
 *      tags: [Items]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: itemId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the item to update
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
 *          description: Item schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Item not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ content }), update)

/**
 * @swagger
 * path:
 *  api/items/{itemId}:
 *    delete:
 *      summary: Delete item
 *      tags: [Items]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: itemId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the item to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted item
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Item not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
