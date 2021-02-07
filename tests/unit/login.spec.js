import {mount, shallowMount} from '@vue/test-utils'
import Parent from '@/components/_tmp/Parent'
import Child from '@/components/_tmp/Child'

const shallowWrapper = shallowMount(Parent)
const mountWrapper = mount(Parent)

console.log(shallowWrapper.html())
console.log(mountWrapper.html())

// describe('Text in Test', () => {
//     it ('renders text "Hello"', () => {
//         const wrapper = mount(Test)
        
//         expect(wrapper.text()).toMatch("Hello World")
//     })
// })