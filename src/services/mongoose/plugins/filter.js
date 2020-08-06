
/**
 * This plugin adds a filter method to your mongoose schema.
 * it filters the document properties depending on the users role and the method (GET, POST, PUT, DELETE)
 * Usage: document.filter({ role, method })
 * role is optional and defaults to 'guest'
 * method is required
 * @export mongoose select method
 * @param {*} schema, the mongoose schema
 * @param {*} { rules }, ACL rules
 */
export default function select(schema, { rules }) {
    schema.methods.filter = function({ role = 'guest', method }) {

        const { permissions } = rules.find(p => p.group === role) ?? []

        const view = permissions.find(rule => rule.methods.includes(method)).view ?? []
        /*
            view = ['content', 'author', 'author.name', 'author.email']
            should be:
            root = ['content', 'author']
            populate: {
                author: ['name', 'email']
            }
        */
        const root = view.filter(e => !e.includes('.'))
        const populateRoot = [...new Set(view.filter(e => e.includes('.')).map(e => e.split('.')[0]))]
        const populate = {}
        populateRoot.forEach((key) => {
            populate[key] = view.filter(e => e.startsWith(`${key}.`)).map(e => e.split('.')[1])
        })
        const obj = root.reduce((a,b) => (a[b] = this[b], a), {})
        console.log(populate)
        Object.keys(populate).forEach((key) => {
            obj[key] = populate[key].reduce((a, b) => (a[b] = this[key][b], a), {})
        })

        return obj
    }
}
