"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
    const path = usePathname();
    console.log(path);
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
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => {
                    return (
                        <li key={link.href}>
                            <Link
                                className={classNames({
                                    "text-zinc-900": link.href === path,
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
