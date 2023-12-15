import styled from "styled-components";
import LogoImg from "./images/conti-logo.png";
const Wrapper = styled.section`
    height: 100%;
    width: 100%;
    margin: 0 auto !important;
    background-color: rgb(241 245 249);
`;
const Header = styled.div`
    width: 100%;
    background-color: rgb(248 250 252);
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    border-top-width: 1px;
    box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.05);
`;
const Left = styled.div`
    padding-left: 1rem;
`;
const Logo = styled.img`
    width: 1.75rem;
    height: 1.75rem;
`;
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Wrapper>
            <Header>
                <Left>
                    <Logo src={LogoImg} />
                </Left>
            </Header>
            {children}
        </Wrapper>
    );
};

export default Layout;
