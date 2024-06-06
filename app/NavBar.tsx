"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const path = usePathname();
    const links = [
        {
            href: "/",
            label: "Dashboard",
        },
        {
            href: "/issues",
            label: "Issues",
        },
    ];

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center text-zinc-900">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => {
                    return (
                        <li key={link.href}>
                            <Link
                                className={classNames({
                                    "text-zinc-500": link.href !== path,
                                    "hover:text-zinc-800 transition-colors":
                                        true,
                                })}
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavBar;
