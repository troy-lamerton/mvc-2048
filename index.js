import Router from './mvc/router'

global.platform = 'console' // set to 'browser' or 'console'

const router = new Router()

router.listen()