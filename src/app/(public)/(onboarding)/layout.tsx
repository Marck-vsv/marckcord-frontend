import {Header} from "@/components/construction/header";

export default function PublicLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            {/* <Header /> */}
            {children}
        </div>
    );
}
