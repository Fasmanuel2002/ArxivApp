const { ApiError } = require('../errors');
const { FavoritesRepository } = require('../repositories/favorites-repository');

class FavoritesService {

    constructor(){
        this.repository = new FavoritesRepository();
    }

    async getFavorites(){
        const favorites = await this.repository.findAll();
        return favorites || [];
    }

   async createFavorite(favorite){

        const cleanFavorite = this.cleanFavorite(favorite);

        try {const favoriteCreated = await this.repository.create(cleanFavorite);
            return favoriteCreated || [];
        } catch (error) {
              if(error.code === 11000){
                throw new ApiError(409,'El articulo ya esta guardado en favoritos.'
                );
            }
            throw error;
        }
    }

    async updateFavorite(articleId, favorite = {}){

        const cleanFavorite = this.cleanFavorite(
            { ...favorite, id: articleId },
            { partial: true }
        );

        const favoriteUpdated = await this.repository.updateByArticleId(
            articleId,
            cleanFavorite
        );

        if(!favoriteUpdated){
            throw new ApiError(404,'No se encontro el articulo favorito.');
        }
        return favoriteUpdated || [];
    }

    async deleteFavorite(articleId){

        const favoriteDeleted = await this.repository.deleteByArticleId(articleId);
        if(!favoriteDeleted){
            throw new ApiError(404,'No se ha encontrado el articulo favorito');
        }
        return favoriteDeleted || [];
    }

    cleanFavorite(body, { partial = false } = {}){
        const requiredFields = ['id','title','summary','authors','published','updated'];

        const optionalFields = ['pdfUrl','primaryCategory','doiUrl','journalRef','comment'];
        
        if(!body || typeof body !== 'object'){
            throw new ApiError(400,  ' debe ser un objeto ');
        }

        const missingFields = requiredFields.filter((field) => {

            if(partial && field !== 'id'){
                return false;
            }

            return (body[field] === undefined || body[field] === null ||body[field] === '');
        });

        if(missingFields.length > 0){
            throw new ApiError(400,`Faltan los  campos obligatorios: ${missingFields.join(', ')}.`
            );
        }

        const favorite = {};

        if(body.id !== null){
          favorite.id = this.cleanString(body.id, 'id');
        }
        if(body.title !== null){
            favorite.title = this.cleanString(body.title, 'title');
        }
        if(body.summary !== null){
            favorite.summary = this.cleanString(body.summary, 'summary');
        }
        if(body.published !== null){
            favorite.published = this.cleanString(body.published,'published');
        }
        if(body.updated !== null){
          favorite.updated = this.cleanString(body.updated, 'updated');
        }

        if(body.authors !== undefined){
            if(!Array.isArray(body.authors) || body.authors.length == 0){
                throw new ApiError(400,'authors debe ser un array con al menos un autor.');
            }

            favorite.authors = body.authors.map((author) => this.cleanString(author, 'authors'));
        }

        if(body.categories !== undefined){
            if(body.categories !== undefined){
              if(Array.isArray(body.categories)){
                favorite.categories = body.categories.map((category) =>
                this.cleanString(category, 'categories')
              );
            } else {
              favorite.categories = [];
            }
          }
        }
        optionalFields.forEach((field) => {
          if(field === 'comment' && body[field] !== undefined && body[field] !== null){
                favorite[field] = body[field].trim();
              } else if(body[field] !== undefined && body[field] !== null && body[field] !== ''){
                favorite[field] = this.cleanString(body[field], field);
            }
        });

        return favorite;
    }

    cleanString(value, field){
        const text = value.trim();
        if(!text){
            throw new ApiError(400,`${field} No puede estar vacio`);
        }
        return text;
    }

}

module.exports = FavoritesService;