const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'bookmarks/*',
                methods: ['GET', 'POST'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    },
    {
        group: 'user',
        permissions: [
            {
                resource: 'bookmarks/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    },
    {
        group: 'admin',
        permissions: [
            {
                resource: 'bookmarks/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    }
]

export default permissions
