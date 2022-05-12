import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'



export default class EmailVerifiesController {

    public async index({response, auth}:HttpContextContract){
        auth.user?.sendVerificationEmail()
            return response.redirect().back()
    }


    public async store({}: HttpContextContract){
        return 'working'
    }
}
