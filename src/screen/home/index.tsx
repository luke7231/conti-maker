import styled from "styled-components";

const data = [
    {
        icon: "✝️",
        title: "고백",
    },
    {
        icon: "🎶",
        title: "찬양",
    },
    {
        icon: "💪",
        title: "위로",
    },

    {
        icon: "💜",
        title: "사랑",
    },
    {
        icon: "😌",
        title: "감사",
    },
    {
        icon: "🤲",
        title: "축복",
    },
    {
        icon: "🌈",
        title: "은혜",
    },
    {
        icon: "🙏",
        title: "간구",
    },
];
const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    padding-left: 24px;
    padding-top: 24px;
    color: #fff;
`;
const SubTitle = styled.div`
    font-size: 16px;
    padding: 10px 0 0 24px;
    color: gray;
`;
const GridWrap = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 12px;

    @media (min-width: 767px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    padding: 24px;
`;
const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    aspect-ratio: 1;
    border-radius: 26px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
`;
const Icon = styled.div`
    font-size: 20px;
`;
const Keyword = styled.div`
    margin-top: 12px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
`;
const Home = () => {
    return (
        <div>
            <Title>키워드를 골라주세요!</Title>
            <SubTitle>주제에 맞는 찬양들을 추천해줘요</SubTitle>
            <GridWrap>
                {data.map((menu) => {
                    return (
                        <Item>
                            <Icon>{menu.icon}</Icon>
                            <Keyword>{menu.title}</Keyword>
                        </Item>
                    );
                })}
            </GridWrap>
        </div>
    );
};

export default Home;
