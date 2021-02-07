<template>
    <div ref="ListItem" v-if="item" class="jg-news-list__item">
        <section class="jg-news-list__item__main-container">
            <div class="jg-news-list__item__date">
                <span>дата публикации:&nbsp;</span>
                <span>{{dateFormat(item.date)}}</span>
            </div>
            <div v-if="item.title" class="jg-news-list__item__title">
                <p @click="$router.push('edit/' + item._id)">{{item.title}}</p>
            </div>
        </section>

        <section class="jg-news-list__item__controls">
            <JG-Button 
                class="jg-icon jg-icon_m jg-icon_monohrome jg-icon_clickable"
                icon="icon-pencil"
                @click="$router.push('edit/' + item._id)"
            />
            <JG-Button 
                class="jg-icon jg-icon_m jg-icon_monohrome jg-icon_clickable"
                icon="icon-bin"
                @click="confirmDelete()"
            />
        </section>
    </div>
</template>

<script>
import moment from 'moment'
import Modal from '@/components/ui/modals/ModalTemplate'

export default {
    name: 'BaseListItem',

    props: {
        item: {
            type: Object,
            default: () => ({}),
            required: true
        }
    },
    computed: {
        BASE_URL() {
            return process.env.VUE_APP_BASE_URL
        }
    },
    methods: {
        dateFormat(date) {
            return moment(date).format('DD.MM.YYYY')
        },
        confirmDelete() {
            this.$store.dispatch('modal/open', {
                component: Modal,
                data: {
                    title: this.$t("modals.titles.confirmAction"),
                    content: this.$t("modals.text.custom.deleteNews"),
                    icon: 'icon-notification',
                    action: () => {
                        this.deleteNews(this.item._id)
                    }
                }
            })
        },
        async deleteNews(id) {
            try {
                const {data} = await this.axios({
                    method: 'DELETE',
                    url: 'news',
                    data: {
                        news_id: id,
                        uid: this.$store.getters['auth/ID'] 
                    }
                })

                const targetNode = this.$refs['ListItem']
                targetNode.parentNode.removeChild(targetNode)

                console.log(data.message)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>