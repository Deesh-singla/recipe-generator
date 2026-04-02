import Link from "next/link";

const HomePage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,_#f7fbf8_0%,_#eef5f2_100%)] px-4">
            <div className="w-full max-w-2xl rounded-[2rem] border border-emerald-100 bg-white px-8 py-12 text-center shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                    AI Recipe Generator
                </p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
                    Cook smarter with recipes built around your kitchen.
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-500">
                    Generate personalized meals, manage your pantry, and keep your saved
                    recipes organized in one place.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/signin"
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
