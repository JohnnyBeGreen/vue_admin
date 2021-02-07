import { createI18n } from 'vue-i18n'

const messages = {
    ru: {
        validation: {
            requiredField: 'обязательное поле',
            emailFormat: 'некорректный формат email'
        },
        errors: {
            serverError: 'Ошибка. Попробуйте еще раз.'
        },
        forms: {
            fileLabel: 'Выберите файл',
            filesLabel: 'Выберите файлы',
            textInputPlaceholderPrefix: 'Введите',
            selectInputPlaceholderPrefix: 'Выберите'
        },
        notifications: {
            categories: {
                categoryCreated: 'Раздел создан'
            }
        },
        filters: {
            categoryFilter: 'Фильтр по разделам'
        },
        modals: {
            titles: {
                confirmAction: 'Подтвердите действие'
            },
            actions: {
                yes: 'да',
                no: 'нет'
            },
            text: {
                custom: {
                    deleteCategory: 'Вы уверенны, что хотите удалить раздел? Вместе с этим разделом будут удалены все его подразделы.',
                    deleteNews: 'Вы уверенны, что хотите удалить эту новость?',
                }
            }
        },
        controls: {
            edit: 'редактировать',    
            save: 'сохранить',    
            saveChanges: 'сохранить изменения',    
            cansel: 'отмена',    
            delete: 'удалить',    
            add: 'добавить',
            publish: 'опубликовать',
            addSettings: 'создать настройки',   
            copyId: 'скопировать id в буфер'   
        },
        tabs: {
            list: 'список',
            add: 'добавить',
            edit: 'редактировать',
            addForm: 'Форма добавления',
            gallery: 'Галерея',
            settings: 'Настройки',
        },
        modules: {
            auth: {
                login: {
                    errors: {
                        authError: 'Ошибка авторизации'
                    }
                }
            },
            categories: {
                addRootCategoryButton: 'создать корневую директорию',
                addRootCategoryLabel: 'введите название корневой директории',
                addCategoryNewName: 'название директории',
            },
            news: {
                list: {
                    addNewsButton: 'Добавить новость'
                },
                add: {
                    date: 'дата публикации новости',
                    title: 'название новости',
                    mainImageTitle: 'Основное изображение',
                    imageGalleryTitle: 'Галлерея изображений'
                }
            },
            documents: {
                list: {
                    addDocumentButton: 'Добавить документ',
                    noDocumentsFound: 'Документы не найдены'
                },
                settings: {
                    rootDirectoryTitle: 'Корневая директория',
                    rootDirectoryLabel: 'Укажите название корневой директории'
                },
                add: {
                    documentCategory: 'раздел',
                    documentName: 'название документа'
                }
            },
            modules: {
                moduleNameLabel: 'имя модуля',
                errors: {
                    moduleNotFound: 'Модуль с таким именем не найден. Создайте модуль нажав на кнопку "сохранить"',
                    nameNotFound: 'Название модуля не найдено в настройках пути. Создание модуля невозможно.'
                }
            },
            settings: {
                errors: {
                    errorCreatingSettings: 'Ошибка создания настроек. Попробуйте еще раз.',
                    errorEditSettingsRootCategoryValidation: 'Ошибка валидации. Проверьте правильность введенных данных.',
                    errorEditSettingsRootCategoryNotExists: 'Раздел не найден. Возможно он был удален.'
                }
            }
        },
        views: {
            auth: {
                news: 'Новости',
                documents: 'Документы',
                categories: 'Категории'
            }
        }
    },
    en: {
        validation: {
            requiredField: 'required field',
            emailFormat: 'wrong email format'
        }
    }
}

export const i18n = createI18n({
    locale: 'ru',
    messages,
})