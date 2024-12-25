import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";


const authOption = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        }),
    ],
    callbacks: {
        async signIn({user , account }){
            console.log("User", user);
            console.log("Account", account);
            if(account.provider === 'google'){
                const { name, email} = user;
                try {
                    await connectMongodb();
                    const userExist = await User.findOne({ email });

                    if(!userExist){
                    const res = await fetch('http://localhost:3000/api/user',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            
                        })
                    });

                    if(res.ok){
                        return user;
                    }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return user;
        }
    }
};


const handler = NextAuth(authOption);


export { handler as GET, handler as POST};