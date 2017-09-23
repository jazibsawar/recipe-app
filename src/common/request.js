import Cosmic from './Cosmic';
import config from '../config/config';
import _ from 'lodash';
import {generateRecipeObject} from './paramMapping';


function getRecipes(){
    return new Promise((resolve,reject) => {
        Cosmic.getObjectsByType(config, { type_slug: config.object_type }, (err, res) => {
            if(!err){
                resolve(res.objects.all || []);
            }
            else
            {
                reject({
                    err: err
                });
            }
        });
    });
}

function addRecipe(obj){
    return new Promise((resolve,reject) => {
        addMedia(obj.metadata.feature_image.file).then((media) => {
            obj.metadata.feature_image.url = media.url;
            obj.metadata.feature_image.imgix_url = media.imgix_url;
            obj.metadata.feature_image.value = media.name;
            obj.metadata.feature_image.id = media._id;
            const params = generateRecipeObject(obj);
            Cosmic.addObject(config, params, (err, res) => {
                if(!err){
                    resolve(res.object);
                }
                else
                {
                    reject(err);
                }
            });
        })
        .catch((e)=> {
            reject(e);
        })
    });
}

function editRecipe(obj){
    return new Promise((resolve,reject) => {
        if(obj.metadata.feature_image.file){
            const feature_image = _.find(obj.metafields,['key', 'feature_image']);
            deleteMedia(feature_image.id).then((res) => {
                if(res.status == 200 ){
                    addMedia(obj.metadata.feature_image.file).then((media) => {
                        obj.metadata.feature_image.url = media.url;
                        obj.metadata.feature_image.imgix_url = media.imgix_url;
                        obj.metadata.feature_image.value = media.name;
                        obj.metadata.feature_image.id = media._id;
                        const params = generateRecipeObject(obj,true);
                        Cosmic.editObject(config, params, (err, res) => {
                            if(!err){
                                resolve(res.object);
                            }
                            else
                            {
                                reject(err);
                            }
                        });
                    })
                    .catch((e)=> {
                        reject(e);
                    })
                }
                else{
                    reject(err);
                }
            })
            .catch((e) => {
                reject(e);
            });
        }
        else{
            const params = generateRecipeObject(obj,true);
            Cosmic.editObject(config, params, (err, res) => {
                if(!err){
                    resolve(res.object);
                }
                else
                {
                    reject(err);
                }
            });
        }
    });
}
function deleteRecipe(recipe){
    const params = {
        write_key: config.bucket.write_key,
        slug: recipe.slug
    }
    const feature_image = _.find(recipe.metafields,['key', 'feature_image']);
    return new Promise((resolve,reject) => {
        deleteMedia(feature_image.id).then((res) => {
            if(res.status == 200 ){
                Cosmic.deleteObject(config, params, (err, res) => {
                    if(!err){
                        resolve(res);
                    }
                    else
                    {
                        reject(err);
                    }
                });
            }
            else{
                reject(err);
            }
        })
        .catch((e) => {
            reject(e);
        });
    });
}
function addMedia(file){
    const params = {
        media: file,
        folder: config.image_folder
    }
    return new Promise((resolve,reject) => {
        Cosmic.addMedia(config, params, (err, res) => {
            if(!err){
                resolve(res.body.media);
            }
            else
            {
                reject(err);
            }
        })
    });
}

function deleteMedia(id){
    const params = {
        media_id: id,
        write_key: config.bucket.write_key,
    }
    return new Promise((resolve,reject) => {
        Cosmic.deleteMedia(config, params, (err, res) => {
            if(!err){
                resolve(res);
            }
            else
            {
                reject(err);
            }
        })
    });
}


export default {getRecipes,addRecipe,editRecipe,deleteRecipe};