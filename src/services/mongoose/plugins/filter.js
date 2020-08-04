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
export default function select(schema, { rules, populateRules = {} }) {
    schema.methods.filter = function({ role = 'guest', method }) {
        const { permissions } = rules.find(p => p.group === role) ?? []
        const view = permissions.find(rule => rule.methods.includes(method)).view ?? []
        const obj = view.reduce((a, b) => ((a[b] = this[b]), a), {})

        Object.keys(obj).forEach(key => {
            if (populateRules[key]) {
                const { permissions } = populateRules[key].find(p => p.group === role) ?? []
                const view = permissions.find(rule => rule.methods.includes(method))
                    ? permissions.find(rule => rule.methods.includes(method)).view
                    : []
                obj[key] = view.reduce((a, b) => ((a[b] = this[key][b]), a), {})
            }
        })

        return obj
    }
}
