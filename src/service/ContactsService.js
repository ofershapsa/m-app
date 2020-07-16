import contactsSample from './contacts-sample.json'
import axios from 'axios'

export default class ContactsService {
    getContacts() {
       return axios.get('localhost:8080/getAll')
    }
}