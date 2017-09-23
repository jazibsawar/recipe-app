import config from '../config/config'
import _ from 'lodash'
function generateRecipeObject(payload,edit=false) {
    let params =  {
        write_key: config.bucket.write_key,
        type_slug: config.object_type,
        title: payload.title,
        content: payload.content,
        metafields: [{
                required: true,
                value: payload.metadata.preparation_time,
                key: "preparation_time",
                title: "PREPARATION TIME",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                value: payload.metadata.cook_time,
                key: "cook_time",
                title: "COOK TIME",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                value: payload.metadata.servings,
                key: "servings",
                title: "SERVINGS",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                value: payload.metadata.category,
                key: "category",
                title: "Category",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                value: payload.metadata.author,
                key: "author",
                title: "Author",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                value: payload.metadata.youtube_id,
                key: "youtube_id",
                title: "YOUTUBE ID",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                repeater_fields: [{
                    title: "Ingredient",
                    key: "ingredient",
                    value: "",
                    type: "text",
                    required: true
                }],
                value: "4 Apples, I prefer Honey Crisp",
                key: "ingredients",
                title: "Ingredients",
                type: "repeater",
                children: _.map(payload.metadata.ingredients,(item) => {
                    return {
                        ingredient: item.ingredient,
                        text: false,
                        textarea: false,
                        has_length_edit: false,
                        file: false,
                        repeater: false,
                        parent: false,
                        children: false,
                        is_object: false,
                        is_objects: false
                    }
                }),
                has_length_edit: false,
                parent: false,
                object: true
            },
            {
                required: true,
                value: payload.metadata.feature_image.value,
                key: "feature_image",
                title: "FEATURE IMAGE",
                type: "file",
                children: false,
                url: payload.metadata.feature_image.url,
                imgix_url: payload.metadata.feature_image.imgix_url,
                has_length_edit: false,
                parent: false,
                id: payload.metadata.feature_image.id,
            }
        ]
    };

    if(edit){
        params.slug = payload.slug;
    }

    return params;
}

export {generateRecipeObject}