import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'





export default class AuthController {
    public async signup ({request,response}:HttpContextContract){
        const req = await request.validate({schema:schema.create({
            name: schema.string(),
            email: schema.string({},[
                rules.email()
            ]),
            username: schema.string({}),
            password: schema.string({}),
        }),
        messages: {
            'name.required': 'Write name to sign up ',
            'email.required': 'Write email to sign up ',
            'username.required': 'Write username to sign up ',
            'password.required': 'Write password to sign up ',
        }
        })
        
        const user = new User();
        user.name = req.name;
        user.email = req.email;
        user.username = req.username;
        user.password = req.password;
        await user?.save();

        user?.sendVerificationEmail()




        return response.redirect('/')
    }

    public async login ({ request , auth , response} : HttpContextContract){
         const req = await request.validate({
             schema: schema.create({
             email : schema.string({}, [
                 rules.email()
             ]), 
             password: schema.string({}, 
                [ rules.minLength(8)]),
            }),
             messages:{
                 "email.required":"Email field is required" ,
                 "password.required":"Password field is required" ,
                 "password.minLength":"Password must have at least 8 characters",
             },



         });
      
         const email = req.email
      const password = req.password
      const user = await auth.attempt(email, password)
      
        return response.redirect(`/${user.username}`)



}

public async logout ({auth , response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/login')
}


     
}
