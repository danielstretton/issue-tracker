"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
    Avatar,
    Box,
    Container,
    DropdownMenu,
    Flex,
    Text,
} from "@radix-ui/themes";

const NavBar = () => {
    const path = usePathname();

    return (
        <nav className="border-b mb-5 px-5 py-3 text-zinc-900">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <MenuOptions path={path} />
                    </Flex>
                    <Box>
                        <AuthStatus path={path} />
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

const MenuOptions = ({ path }: { path: string }) => {
    const links = [
        {
            href: "/",
            label: "Dashboard",
        },
        {
            href: "/issues/list",
            label: "Issues",
        },
    ];

    return (
        <ul className="flex space-x-6">
            {links.map((link) => {
                return (
                    <li key={link.href}>
                        <Link
                            className={classNames({
                                "nav-link": true,
                                "!text-zinc-900": path === link.href,
                            })}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export const AuthStatus = ({ path }: { path: string }) => {
    const { status, data: session } = useSession();

    if (status === "loading") return null;

    if (status === "unauthenticated")
        return (
            <Link
                className="nav-link"
                href={`/api/auth/signin?callbackUrl=${path}`}
            >
                Sign in
            </Link>
        );

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    className="cursor-pointer"
                    src={session!.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size="2">{session!.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout?callbackUrl=/">Sign out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default NavBar;
