import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Channel, { schema } from './model'

const { name, description } = schema.tree
/**
 * @swagger
 * tags:
 *   name: Channels
 *   description: Channel management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/channels/:
 *    post:
 *      summary: Create a new Channel
 *      tags: [Channels]
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
 *          description: A channel schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Channel'
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
        name,
        description
    }),
    addAuthor({ required: false, addBody: true }),
    create
)

// TODO: Pagination docs
/**
 * @swagger
 * path:
 *  api/channels/:
 *    get:
 *      summary: Get channels
 *      tags: [Channels]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A channel schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/channels/{channelId}:
 *    get:
 *      summary: Get Channel
 *      tags: [Channels]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: channelId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the channel to get
 *      responses:
 *        "200":
 *          description: A channel schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Channel not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/channels/{channelId}:
 *    put:
 *      summary: Update channel
 *      tags: [Channels]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: channelId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the channel to update
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
 *          description: Channel schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Channel not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ name, description }), update)

/**
 * @swagger
 * path:
 *  api/channels/{channelId}:
 *    delete:
 *      summary: Delete channel
 *      tags: [Channels]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: channelId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the channel to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted channel
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Channel not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
