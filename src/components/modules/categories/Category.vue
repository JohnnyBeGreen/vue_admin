<template>
    <section ref="CategoryNode" class="jg-category">
        <section name="category" class="jg-category__main">
            <div class="jg-category__root" :class="icon">
                <span class="icon-folder"></span>
            </div>
            
            <div 
                v-if="!editMode" 
                class="jg-category__name" 
                @click.stop="!subCategoriesOpen ? getCategoryChildren(category._id) : subCategoriesOpen = false"
            >
                <span>{{categoryNameComputed}}</span>
            </div>
            
            <div v-if="editMode" class="jg-category__input">
                <JG-TextInput  
                    :label="$t('modules.categories.addCategoryNewName')"
                    class="jg-input_m"
                    @update:value="form.category_new_name = $event"
                    :showValidation="false"
                />
            </div>
            
            <div class="jg-category__actions">
                <JG-Button 
                    v-if="editMode" 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_save" 
                    icon="icon-floppy-disk"
                    :title="$t('controls.save')"
                    :loading="loading"
                    @click="editCategory()"
                />
                <JG-Button 
                    v-if="!editMode" 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_edit" 
                    icon="icon-pencil" 
                    @click="editMode = true"
                    :title="$t('controls.edit')"
                />
                <JG-Button 
                    v-if="!editMode" 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_add" 
                    icon="icon-folder-plus" 
                    @click="addSubCategoryMode = true"
                    :title="$t('controls.add')"
                />
                <JG-Button 
                    v-if="!editMode" 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_add" 
                    icon="icon-files-empty" 
                    @click="copyToClipboard(category._id)"
                    :title="$t('controls.copyId')"
                />
                <JG-Button 
                    v-if="!editMode" 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_delete" 
                    icon="icon-bin" 
                    :loading="loadingDelete"
                    :title="$t('controls.delete')"
                    @click="deleteCategory()"
                />
                <JG-Button 
                    v-if="editMode" 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_delete" 
                    icon="icon-cross" 
                    :title="$t('controls.cansel')"
                    @click="canselEditCategory()"
                />
            </div>

            <div v-if="loadingCategory" class="jg-loader jg-loader_style-1 spin-cw jg-category__loader"></div>
        </section>

        <!-- Add Subcategory -->
        <section v-if="addSubCategoryMode" name="add-subcategory" class="jg-category__add-subcategory">
            <div class="jg-category__input">
                <JG-TextInput  
                    label="название"
                    class="jg-input_m"
                    @update:value="form.category_new_name = $event"
                    :showValidation="false"
                />
            </div>

            <div class="jg-category__actions">
                <JG-Button 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_save" 
                    icon="icon-floppy-disk"
                    :title="$t('controls.save')"
                    :loading="loading"
                    @click="addSubCategory()"
                />
                <JG-Button 
                    class="jg-icon jg-icon_clickable jg-icon_m jg-icon_default jg-category__action jg-category__action_delete" 
                    icon="icon-cross" 
                    :title="$t('controls.cansel')"
                    @click="canselAddSubCategory()"
                />
            </div>
        </section>

        <section name="children" class="jg-category__children">
            <section v-if="subCategoriesOpen">
                <Category 
                    v-for="(item, index) in categoryList" 
                    :key="index" 
                    :category="item"
                    :icon="iconStatus ? 'jg-category__root_sub-1' : 'jg-category__root_sub-2'"
                    :iconStatus="!iconStatus"
                />
            </section>
        </section>
    </section>
</template>

<script>
import Modal from '@/components/ui/modals/ModalTemplate'
import copyToClipboard from '@/mixins/utils/copy-to-clipboard'

export default {
    name: 'Category',

    mixins: [copyToClipboard],
    props: {
        category: {
            type: Object,
            default: () => ({})
        },
        icon: String,
        iconStatus: {
            type: Boolean,
            default: true
        }

    },
    emits: ['click-name', 'update:children'],
    data() {
        return {
            form: {
                category_new_name: '',
                subCategoryName: ''
            },

            categoryName: this.category.name,

            categoryList: null,
            categoryListMap: [], //Метки для отступов

            editMode: false,
            addSubCategoryMode: false,

            subCategoriesOpen: false,

            loading: false,
            loadingDelete: false,
            loadingCategory: false
        }
    },
    computed: {
        categoryNameComputed() {
            return this.categoryName
        }
    },
    methods: {
        async editCategory() {
            try {
                this.loading = true

                const result = await this.axios({
                    method: 'PATCH',
                    url: '/cat/rename',
                    data: {
                        category_id: this.category._id,
                        category_new_name: this.form.category_new_name,
                        uid: this.$store.getters['auth/ID']
                    }
                })

                this.loading = false

                this.editMode = false
                this.categoryName = this.form.category_new_name
                
                return result
            } catch(e) {
                this.loading = false
                console.error(e)
            }
        },
        canselEditCategory() {
            this.editMode = false
            this.form.category_new_name = ''
        },

        deleteCategory() {
            this.$store.dispatch('modal/open', {
                component: Modal,
                data: {
                    title: this.$t('modals.titles.confirmAction'),
                    icon: 'icon-notification',
                    content: this.$t('modals.text.custom.deleteCategory'),
                    action: async () => {                        
                        try {
                            this.loadingDelete = true

                            const {data} = await this.axios({
                                method: 'DELETE',
                                url: '/cat',
                                data: {
                                    category_id: this.category._id,
                                    uid: this.$store.getters['auth/ID']
                                }
                            })

                            this.loadingDelete = false
                            
                            const targetNode = this.$refs['CategoryNode']
                            targetNode.parentNode.removeChild(targetNode)

                            return data
                        } catch (e) {
                            this.loadingDelete = false
                            console.error(e)
                        }
                    }
                }
            })
        },

        async addSubCategory() {
            try {
                this.loading = true

                const {data} = await this.axios({
                    method: 'POST',
                    url: '/cat',
                    data: {
                        name: this.form.category_new_name,
                        parent_id: this.category._id,
                        author: this.$store.getters['auth/ID']
                    }
                })

                this.loading = false

                this.form.category_new_name = ''
                this.addSubCategoryMode = false
                
                this.getCategoryChildren(this.category._id)
                
                return data
            } catch(e) {
                console.error(e)
                this.loading = false
            }
        },
        canselAddSubCategory() {
            this.addSubCategoryMode = false
            this.form.subCategoryName = ''
        },

        async getCategoryChildren(id) {
            try {
                this.loadingCategory = true

                const {data} = await this.axios({
                    method: 'GET',
                    url: 'cat/children/' + id
                })

                this.loadingCategory = false
                
                this.$emit('update:children', data.data)
                this.categoryList = data.data
                this.subCategoriesOpen = true

                return data
            } catch(e) {
                console.error(e)
            }
        },

        // async getCategoryDescendants(id) {
        //     try {
        //         this.loadingCategory = true

        //         const {data} = await this.axios({
        //             method: 'GET',
        //             url: 'cat/descendants/',
        //             params: {
        //                 id: id
        //             }
        //         })

        //         this.loadingCategory = false
        //         this.buildDescendantsTree(id, data.data.descendants, 0)
        //     } catch(e) {
        //         this.loadingCategory = false
        //         console.error(e)
        //     }
        // },
        // buildDescendantsTree(root_id, tree, counter) {
        //     tree.forEach((item) => {
        //         let j = counter

        //         if (item.parent === root_id) {
        //             j++     
        //             this.categoryList.push(item)         
        //             this.categoryListMap.push(j)      
        //             this.buildDescendantsTree(item._id, tree, j)
        //         }   
        //     })
        // },
    }
}
</script>