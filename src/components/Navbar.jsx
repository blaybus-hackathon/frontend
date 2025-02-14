
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
export default function Component() {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-black shadow-sm ">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-20 items-center px-6">
                    <div className="flex items-center">
                        <a href="/" className="text-3xl font-bold text-white">
                            로고
                        </a>
                    </div>
                    <nav className="hidden md:flex gap-6 flex-1 justify-center mx-8">
                        <Button
                            href="#"
                            size="lg"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            무언가 하는 페이지
                        </Button>
                        <Button
                            href="#"
                            size="lg"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            무언가 하는 페이지
                        </Button>
                        <Button
                            href="#"
                            size="lg"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            무언가 하는 페이지
                        </Button>
                        <Button
                            href="#"
                            size="lg"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            무언가 하는 페이지
                        </Button>
                    </nav>
                    <div className="flex items-center gap-4 ml-auto ">
                        <Link to="/signIn">
                            <Button size="lg" className="text-white" >
                                Sign in
                            </Button>
                        </Link>

                        <Button size="lg" className="text-white">Sign up</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
