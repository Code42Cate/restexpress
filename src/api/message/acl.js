const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'messages/*',
                methods: ['GET', 'POST'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email', '_id']
            }
        ]
    },
    {
        group: 'user',
        permissions: [
            {
                resource: 'messages/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email', 'author._id']
            }
        ]
    },
    {
        group: 'admin',
        permissions: [
            {
                resource: 'messages/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email', 'author._id']
            }
        ]
    }
]

export default permissions
