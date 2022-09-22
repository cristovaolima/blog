import { endpoints } from './Constants';

export default class Posts {

    _errorResponse(status=500, message) {
        const msg = message ? message : 'Ocorreu um erro de conexão com api.';
        return {
            error: true, 
            httpStatus: status, 
            message: msg
        }
    }

    async create(title, body, userId) {
        const url = endpoints.post.create;
        const payload = {
            'title': title,
            'body': body,
            'userId': userId               
        };
        const httpConfig = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(payload),            
        };
        try {
            const response = await fetch(url, httpConfig);
            
            if (!response.ok) {
                return this._errorResponse(
                    response.status,
                    'Ocorreu um erro ao salvar o post.'
                )
            }
            return {
                status: false,
                message: 'Post salvo com sucesso!',
            };
        } catch (error) {
            return this._errorResponse();
        }
    }

    async update(title, body, userId, id) {
        const url = `${endpoints.post.update}/${id}`;
        const payload = {
            'id': id,
            'title': title,
            'body': body,
            'userId': userId                 
        };
        const httpConfig = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(payload),            
        };
        try {
            const response = await fetch(url, httpConfig);
            
            if (!response.ok) {
                return this._errorResponse(
                    response.status,
                    'Ocorreu um erro ao atualizar o post.'
                )
            }
            return {
                status: false,
                message: 'Post atualizado com sucesso!',
            };
        } catch (error) {
            return this._errorResponse();
        }
    }

    async delete(id) {
        const url = `${endpoints.post.delete}/${id}`;
        const httpConfig = {
            method: 'DELETE'          
        };
        try{
            const response = await fetch(url, httpConfig);
            
            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    'Ocorreu um erro ao apagar o post.'
                    );
            }
            return {status: false, message: 'Post apagado com sucesso!'};
        }catch(error) {
            return this._errorResponse();
        }
    }

    async show(id){
        const url = `${endpoints.post.show}/${id}`;

        const httpConfig = {
            method: 'GET'
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    'Ocorreu um erro ao consultar o post.'
                    );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }

    async list(){
        const url = endpoints.post.list;

        const httpConfig = {
            method: 'GET'
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if (!response.ok) {
                return this._errorResponse(
                    response.status,
                    'Ocorreu um erro ao consultar os posts.'
                );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }

    async showUser(id){
        const url = `${endpoints.post.userPost}/${id}`;

        const httpConfig = {
            method: 'GET'
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    'Ocorreu um erro ao consultar o usuário post.'
                    );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }

    async listPostsUser(idUser){
        const url = `${endpoints.post.userPost}/${idUser}/posts`;

        const httpConfig = {
            method: 'GET'
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if (!response.ok) {
                return this._errorResponse(
                    response.status,
                    'Ocorreu um erro ao consultar os posts.'
                );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }
}