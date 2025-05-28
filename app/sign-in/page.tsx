"use client";

export default function SignIn() {
    
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center">
            <div className="absolute -z-10 inset-0 h-full w-full 
                bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
                bg-[size:10px_10px]
                [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_25%,transparent_80%)]" />
            <div className="w-full sm:w-md sm:border sm:shadow-lg border-gray-500 p-4 rounded-lg sm:bg-white">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600">{"Let's get signed in."}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="mt-2">Email</label>
                        <input 
                            className="p-2 px-4 rounded-lg border bg-white"
                            type="email"
                            placeholder="example@email.com"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mt-2">Password</label>
                        <input 
                            className="p-2 px-4 rounded-lg border bg-white"
                            type="password"
                            placeholder="password"
                        />
                    </div>

                    <div>
                        <div className="text-right text-sm cursor-pointer text-blue-500">Forgot password</div>
                        
                        <div className="my-2 p-[2px] rounded-[10px] bg-gradient-to-br to-85% from-indigo-300 to-indigo-800">
                            <div 
                                onClick={() => {

                                }}
                            className="cursor-pointer rounded-lg w-full text-center py-3 bg-indigo-500 text-white">
                                Sign In
                            </div>
                        </div>
                        <div className="text-center text-sm">
                            <p>P{"Don't have an account?"}
                                <span className="text-blue-500 cursor-pointer ml-2">
                                    Sign up now
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}