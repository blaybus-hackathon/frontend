import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();


    const isHome = location.pathname === "/";
    const isMyPage = location.pathname === "/helper/account";


    const tabs = [
        {
            icon: <HomeIcon size={20} />,
            label: "홈",
            path: "/",
            isActive: isHome
        },
        {
            icon: <ProfileIcon size={20} />,
            label: "마이",
            path: "/helper/account",
            isActive: isMyPage
        }
    ];


    return (
        <div className="pb-[3.375rem]">


            <div className="fixed bottom-0 w-full bg-white z-50">
                <footer className="  flex items-center border-t border-t-[#C8C8C8] max-w-md mx-auto h-[3.375rem]  z-50">
                    <div className="max-w-md mx-auto px-6">
                        <div className="flex justify-center items-center w-full gap-10">
                            {tabs.map(tab => (
                                <Link
                                    key={tab.path}
                                    to={tab.path}
                                    className={`flex flex-col items-center rounded-full pt-1.5 justify-center w-32 h-full relative  ${tab.isActive
                                        ? 'bg-[var(--company-primary)] text-white '
                                        : 'text-[var(--company-primary)] bg-white'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="text-xs mt-1">{tab.label}</span>

                                </Link>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    );
}

function HomeIcon({ isActive }) {
    return (
        <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.4508 0.53318C9.6128 -0.17382 8.3872 -0.17382 7.5492 0.53318L0.79916 6.22772C0.29241 6.65523 0 7.28447 0 7.94747V17.2526C0 18.2191 0.7835 19.0026 1.75 19.0026H4.75C5.7165 19.0026 6.5 18.2191 6.5 17.2526V13.25C6.5 12.5707 7.0418 12.018 7.7169 12.0004H10.2831C10.9582 12.018 11.5 12.5707 11.5 13.25V17.2526C11.5 18.2191 12.2835 19.0026 13.25 19.0026H16.25C17.2165 19.0026 18 18.2191 18 17.2526V7.94747C18 7.28447 17.7076 6.65523 17.2008 6.22772L10.4508 0.53318Z"
                fill="currentColor"
            />
        </svg>
    );
}

function ProfileIcon({ isActive }) {
    return (
        <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.7545 12.0002C14.9966 12.0002 16.0034 13.007 16.0034 14.2491V15.1675C16.0034 15.7409 15.8242 16.2999 15.4908 16.7664C13.9449 18.9296 11.4206 20.0013 8.0004 20.0013C4.5794 20.0013 2.05643 18.9292 0.514266 16.7648C0.182306 16.2989 0.00390625 15.7411 0.00390625 15.169V14.2491C0.00390625 13.007 1.01076 12.0002 2.25278 12.0002H13.7545ZM8.0004 0.00488281C10.7618 0.00488281 13.0004 2.24346 13.0004 5.00488C13.0004 7.76631 10.7618 10.0049 8.0004 10.0049C5.23894 10.0049 3.00036 7.76631 3.00036 5.00488C3.00036 2.24346 5.23894 0.00488281 8.0004 0.00488281Z"
                fill="currentColor"
            />
        </svg>
    );
}