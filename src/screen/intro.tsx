import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as amplitude from "@amplitude/analytics-browser";
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgb(248 250 252);
    display: grid;
    grid-template-columns: 1fr min(100ch, calc(100% - 64px)) 1fr;
    grid-column-gap: 32px;

    & > * {
        grid-column: 2;
    }
`;
const Section = styled.section`
    padding: 20px;
    padding-top: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const SubTitle = styled.div`
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #999;
    margin-bottom: 20px;
    line-height: 2.5rem;

    @media (max-width: 480px) {
        font-size: 1.5rem;
        line-height: 2rem;
    }
`;
const Title = styled.div`
    text-align: center;
    font-size: 5rem;
    font-weight: 800;
    color: #111;
    line-height: 6rem;
    @media (max-width: 480px) {
        font-size: 3rem;
        line-height: 4rem;
    }
`;

const Button = styled.button`
    width: 140px;
    height: 48px;
    border-radius: 14px;
    background-color: #ff006e;
    margin-top: 9rem;
    color: #fff;
    font-weight: 800;
    font-size: 18px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
`;
const Intro = () => {
    const navigate = useNavigate();
    const onClickButton = () => {
        amplitude.track("click button", {
            where: "intro",
        });
        navigate("/keywords");
    };
    return (
        <Container>
            <Section>
                <SubTitle>
                    말씀은 묵상했는데..
                    <br /> 어떤 찬양을 선택하지..
                </SubTitle>
                <Title style={{ wordBreak: "keep-all" }}>콘티에 넣을 찬양을 추천해드립니다!</Title>
                <Button onClick={onClickButton}>바로 시작하기!</Button>
            </Section>
            {/* <Partition />
            <SectionRow>
                <Card id="keyword">
                    <Mouse {...iconProps} color="#ff66b2" />
                    <CardTitle>몇 번의 클릭만!</CardTitle>
                </Card>
                <Card id="many_song">
                    <Database {...iconProps} />
                    <CardTitle>수백개의 찬양</CardTitle>
                </Card>
                <Card id="youtube_player">
                    <Youtube {...iconProps} color="#ff66b2" />
                    <CardTitle>Youtube 플레이어 제공</CardTitle>
                </Card>
            </SectionRow> */}
        </Container>
    );
};

export default Intro;
