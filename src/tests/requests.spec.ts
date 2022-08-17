// import { httpRequest } from "src/providers/customAxios/customAxios"
import { AxiosResponse } from "axios"
import { decodeToken } from "react-jwt"
import { IGetBreed } from "../interfaces/breed"
import { IRegisterResponse } from "../interfaces/login"
import { httpRequest } from "../providers/customAxios/customAxios"

let mockedToken: string

test('Deve verificar a request de regitro', async () => {
    const requestBody = { email: 'test@mail.com' }

    try {
        const { data: authResponse } = await httpRequest.post<{ email: string }, AxiosResponse<IRegisterResponse>>('https://dogbreed-api.q9.com.br/register', requestBody)

        expect(authResponse.user.token).toBeDefined()
        mockedToken = authResponse.user.token
    } catch (error) {
        expect(error).toBe(null)
    }

})

test('Deve verificar se o token é válido', () => {
    const decodedToken: any = decodeToken(mockedToken)
    expect(decodedToken.exp * 1000).toBeGreaterThan(new Date().getTime())
})

test('Deve coletar dados de uma raça', async () => {
    let url = 'https://dogbreed-api.q9.com.br/list'

    try {
        const { data: breedResponse } = await httpRequest.get<IGetBreed>(url, { headers: { 'Authorization': mockedToken, 'Access-Control-Allow-Origin': '*' } })
        
        expect(breedResponse.breed).toBeDefined()
        expect(breedResponse.list.length).toBeGreaterThan(0)
    } catch (error) {
        expect(error).toBe(null)
    }

})