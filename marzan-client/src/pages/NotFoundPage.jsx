import React from 'react'
import Button from "../components/Button"; 
function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 px-6 py-12">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_25px_80px_-40px_rgba(24,24,27,0.4)]">
                <div className="absolute -right-20 top-8 h-40 w-40 rounded-full bg-zinc-900 opacity-10 blur-3xl"></div>
                <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-amber-300 opacity-20 blur-3xl"></div>

                <div className="relative grid gap-10 px-8 py-12 md:grid-cols-[1.3fr_1fr] md:items-center md:px-16 md:py-16">
                    <div className="space-y-8 text-left">
                        <div className="inline-flex items-center gap-3 rounded-full bg-zinc-100 px-4 py-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                            Page not found
                        </div>

                        <div>
                            <h1 className="text-6xl font-black tracking-tight text-zinc-900 sm:text-7xl">
                                404
                            </h1>
                            <p className="mt-4 max-w-lg text-lg leading-8 text-zinc-600">
                                Oops! The page you're looking for has wandered off into the adoption shelter. Let’s get you back to the place where pets find their forever homes.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Button to="/" variant="primary" className="w-full sm:w-auto">
                                Back to Home
                            </Button>
                            <Button to="/articles" className="w-full sm:w-auto" variant="secondary">
                                Browse Articles
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-[0_20px_60px_-40px_rgba(24,24,27,0.4)]">
                            <div className="mb-4 rounded-[1.5rem] bg-white p-6 shadow-sm">
                                <img
                                    src="https://media.tenor.com/qlRv_xKX2vUAAAAM/beomkyuta-cachorro-rindo.gif"
                                    alt="Cute pet illustration"
                                    className="h-72 w-full rounded-[1.5rem] object-cover"
                                />
                            </div>
                            <div className="rounded-[1.5rem] bg-zinc-900 px-5 py-4 text-white">
                                <p className="text-sm uppercase tracking-[0.3em] text-zinc-300">Need help?</p>
                                <p className="mt-3 text-base leading-7">
                                    Visit the homepage or explore our articles to discover pets, adoption tips, and rescue stories.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;