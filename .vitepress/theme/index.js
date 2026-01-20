import DefaultTheme from 'vitepress/theme'
import MyLayout from './Layout.vue' // Перевір, щоб назва файлу збігалася!
import './custom.css'

export default {
    extends: DefaultTheme,
    Layout: MyLayout
}
