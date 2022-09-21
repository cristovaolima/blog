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
        const url = endpoints.post.update + '/' + id;
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
        const url = endpoints.post.delete + '/' + id;
        const httpConfig = {
            method: 'DELETE'          
        };
        try{
            const response = await fetch(url, httpConfig);
            
            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    'Ocorreu um erro ao apagar o produto.'
                    );
            }
            return {status: false, message: 'Produto apagado com sucesso!'};
        }catch(error) {
            return this._errorResponse();
        }
    }

    async show(id, token){
        const url = endpoints.products.show + '/' + id;

        const httpConfig = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    'Ocorreu um erro ao consultar o produto.'
                    );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }

    async list(token){
        const url = endpoints.post

        const httpConfig = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if (!response.ok) {
                return this._errorResponse(
                    response.status,
                    'Ocorreu um erro ao consultar os produtos.'
                );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }

    async listCompany(id, token){
        const url = endpoints.products.listcompany + '/' + id;

        const httpConfig = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        try{
            const response = await fetch(url, httpConfig);
            const responseJson = await response.json();

            if (!response.ok) {
                return this._errorResponse(
                    response.status,
                    'Ocorreu um erro ao consultar os produtos da empresa.'
                );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }
}