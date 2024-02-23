import Header from './Header'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={'mt-20'}>{children}</main>
        </>
    )
}

export default Layout
