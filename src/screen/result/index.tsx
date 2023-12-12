/* eslint-disable import/no-unresolved */
import styled from "styled-components";
import Img1 from "../../images/img1.jpeg";
import { useEffect, useState } from "react";
import { getByKeywords } from "../../api/supabase";
import { useLocation } from "react-router-dom";
import { Conti } from "../../types/supabase";

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
    overflow-x: scroll;

    padding: 24px;
`;
const Item = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 24px;
`;

const Keyword = styled.div`
    margin-top: 12px;
    font-size: 20px;
    font-weight: 600;
    color: #000;
`;
const Image = styled.img`
    height: 420px;
    object-fit: cover;
    border-radius: 26px;
    margin-top: 24px;
    border: 1px solid #999;
`;
const NoImage = styled.div`
    height: 420px;
    width: 300px;
    background: #fff;
    border-radius: 26px;
    margin-top: 24px;
    border: 1px solid #999;
    justify-content: center;
    align-items: center;
    color: #000;
`;
const Result = () => {
    const location = useLocation();
    const keywords = location.state.keywords;
    const [data, setdata] = useState<Conti[] | null>();
    useEffect(() => {
        const getSongByKeyword = async () => {
            const { data } = await getByKeywords({ keywords });
            setdata(data);
            return data;
        };
        getSongByKeyword();
    }, []);
    return (
        <div>
            <Title>콘티가 완성되었어요!</Title>
            {keywords.map((keyword: string) => {
                return <div>{keyword}</div>;
            })}
            {/* <SubTitle>주제에 맞는 찬양들을 추천해줘요</SubTitle> */}
            <Wrap>
                {data?.map((menu, index) => {
                    return (
                        <Item>
                            <Keyword>
                                {index + 1}.{" " + menu.title}
                            </Keyword>
                            {menu.img ? (
                                <Image src={menu.img || ""} />
                            ) : (
                                <NoImage>{"죄송합니다 아직 악보가 없습니다!"}</NoImage>
                            )}
                        </Item>
                    );
                })}
            </Wrap>
        </div>
    );
};

export default Result;
