import { saveString, loadString, remove } from "./storage"
const  jwtDecode = require('jwt-decode')

export const TOKEN_KEY = "GaloyToken"

// Singleton class
export class Token {
  mem_token = null

  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
        return instance;
    }

    this.constructor.instance = this;
  }

  async save({token}) {
    this.mem_token = token
    return await saveString(TOKEN_KEY, token)
  }

  async load (){
    this.mem_token = await loadString(TOKEN_KEY)
    return this.mem_token
  }

  async delete () {
    this.mem_token = null
    remove(TOKEN_KEY)
  }

  get () {
    return this.mem_token
  }

  has () {
    console.tron.log({mem_token: this.mem_token})
    return this.mem_token !== null
    // TODO check
  }

  uid () {
    try {
      console.tron.log(this.mem_token)
      const { uid } = jwtDecode(this.mem_token)
      console.tron.log({uid})
      return uid
    } catch (err) {
      console.tron.log(err.toString())
      return null
    }
  }

  network () {
    try {
      console.tron.log(this.mem_token)
      const { network } = jwtDecode(this.mem_token)
      console.tron.log({network})
      return network
    } catch (err) {
      console.tron.log(err.toString())
      return null
    }
  }
}

