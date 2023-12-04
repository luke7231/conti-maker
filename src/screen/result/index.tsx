/* eslint-disable import/no-unresolved */
import styled from "styled-components";
import Img1 from "../../images/img1.jpeg";
const data = [
    {
        ton: "C",
        title: "다시 복음 앞에",
        img: "https://mblogthumb-phinf.pstatic.net/MjAxODA4MjRfMjg1/MDAxNTM1MDczMTYyNDIw.mhrsOV8yAgTSrMrJ6Wn4UrBFgyXtE47lwX9hmWyrXIYg.vHEa1vrB40GX6sFycOfU6FZklKEQi8HhxrgtUGARpuUg.JPEG.emr31001/-%EB%8B%A4%EC%8B%9C_%EB%B3%B5%EC%9D%8C_%EC%95%9E%EC%97%90_C.jpg?type=w800",
    },
];
const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    padding-left: 24px;
    padding-top: 24px;
    color: #fff;
`;
const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    padding: 24px;
`;
const Item = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background: #fff;
    aspect-ratio: 1;
`;

const Keyword = styled.div`
    margin-top: 12px;
    font-size: 20px;
    font-weight: 600;
    color: #000;
`;
const Ton = styled.div``;
const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 26px;
    margin-top: 24px;
`;
const Result = () => {
    return (
        <div>
            <Title>콘티가 완성되었어요!</Title>
            {/* <SubTitle>주제에 맞는 찬양들을 추천해줘요</SubTitle> */}
            <Wrap>
                {data.map((menu, index) => {
                    return (
                        <Item>
                            <Keyword>
                                {index + 1}.{" " + menu.title}
                            </Keyword>
                            <Image src={menu.img} />
                        </Item>
                    );
                })}
            </Wrap>
        </div>
    );
};

export default Result;
