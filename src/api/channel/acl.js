const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'channels/*',
                methods: ['GET', 'POST'],
                action: 'allow',
                view: ['name', 'description', 'author', 'author.name', 'author.email'],
                exact: true
            }
        ]
    },
    {
        group: 'user',
        permissions: [
            {
                resource: 'channels/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['name', 'description', 'author', 'author.name', 'author.email']
            }
        ]
    },
    {
        group: 'admin',
        permissions: [
            {
                resource: 'channels/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['name', 'description', 'author', 'author.name', 'author.email']
            }
        ]
    }
]

export default permissions
