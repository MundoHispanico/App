export const urlMundoHispanicoJson = "https://mundohispanico.com/";
export const apiRoute = "wp-json/wp/v2/";
export const postsRoute = "posts";
export const categoriesRoute = "categories";
export const slugRoute = "slug=";
export const usersRoute = "users";


export const urlMundoHispanicoJsonTest = "https://mundohispanico.staging.wpengine.com/";

/*
Peticiones al API
Para la custom view de somos amigos si paso un array de tags trae de todos
https://mundohispanico.com/wp-json/wp/v2/posts?tags=211926,215245,215243,215244,215241,215242,215246&per_page=100

Para una tegoria por slug
https://mundohispanico.com/wp-json/wp/v2/posts/?categorie=somos-amigos&slug=senado-muro-fronterizo

Para un articulo por slug
https://mundohispanico.com/wp-json/wp/v2/posts/?slug=senado-muro-fronterizo

Para una categoria especifica por id
https://mundohispanico.com/wp-json/wp/v2/posts?categories=24510

Un post especifico por id
https://mundohispanico.com/wp-json/wp/v2/posts/372477

Lista de Tags
https://mundohispanico.com/wp-json/wp/v2/tags

Un tag especifico
https://mundohispanico.com/wp-json/wp/v2/posts?tags=211926

Lista de usuarios
https://mundohispanico.com/wp-json/wp/v2/users
Bajar lista de autores
https://mundohispanico.com/api/get_author_index/

Lista de categorias
https://mundohispanico.com/wp-json/wp/v2/categories

*/