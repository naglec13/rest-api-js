import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate() {
            return this.form.name.trim() && this.form.value.trim()
        }
    },
    methods: {
        createContact() {
            const {...contact} = this.form
            console.log(contact);

            this.contacts.push({...contact, id: Date.now(), marked: false})

            this.form.name = this.form.value = ''
        },
        markContact(id) {
            const contact = this.contacts.find(c => c.id === id)
            contact.marked = true
        },
        deleteContact(id) {
            this.contacts = this.contacts.filter(c => c.id !== id)
        },
    },
    async mounted(){
        this.contacts = await request('http://localhost:3000/api/contacts')
    }
})

async function request(url, method = 'GET', data = null){
    try{
        const headers = {}
        let body

        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }


        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch(e){
        console.warn('Error:', e.message)
    }
}
