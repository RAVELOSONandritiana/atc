import { Outlet } from "react-router";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

export default function Layout() {
    return <>
        <SiteHeader />
        <Outlet />
        <SiteFooter />
    </>
}