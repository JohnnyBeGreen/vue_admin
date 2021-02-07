<template>
    <section class="jg-layout jg-layout__body jg-layout__auth">
        <section name="top" class="jg-layout__top"><Header /></section>
        
        <section name="middle" class="jg-layout__middle">
            <section name="side-menu" class="jg-layout__sidemenu">
                <sidemenu>
                    <template v-slot:menu-block>
                        <sidemenu-block title="Модули">
                            <template v-slot:menu-item>
                                <SidemenuItem icon="icon-newspaper" name="Новости" link="/admin/modules/news/list"/>
                                <SidemenuItem icon="icon-file-excel" name="Документы" link="/admin/modules/documents/list"/>
                                <!-- <SidemenuItem icon="icon-file-excel" name="Реестр" link="/admin/modules/registry"/> -->
                            </template>
                        </sidemenu-block>
                    </template>
                </sidemenu>
                <sidemenu>
                    <template v-slot:menu-block>
                        <sidemenu-block title="Модули настроек">
                            <template v-slot:menu-item>
                                <SidemenuItem icon="icon-file-excel" name="Категории" link="/admin/modules/categories"/>
                            </template>
                        </sidemenu-block>
                    </template>
                </sidemenu>
            </section>
            
            <section name="view" class="jg-layout__view"><router-view /></section>
        </section>
        
        <section name="bottom" class="jg-layout__bottom"><Footer /></section>
    </section>
</template>

<script>
import Header from '@/components/shared/TheHeader'
import Footer from '@/components/shared/TheFooter'
import Sidemenu from '@/components/modules/menu/side-menu/BaseSidemenu'
import SidemenuBlock from '@/components/modules/menu/side-menu/BaseSidemenuBlock'
import SidemenuItem from '@/components/modules/menu/side-menu/SidemenuItem'

export default {
    name: 'AuthLayout',

    components: {
        Header,
        Footer,
        'sidemenu': Sidemenu,
        'sidemenu-block': SidemenuBlock,
        SidemenuItem
    }
}
</script>